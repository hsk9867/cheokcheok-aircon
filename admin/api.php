<?php
/* 척척박사시스템에어컨 관리자 저장 API (PHP 7.0 이상, 카페24 등 PHP 웹호스팅)
   - admin.html 이 호출합니다. 설정은 data/config.json 과 data/config.js 에 저장됩니다.
   - 비밀번호 해시는 admin/auth.php 에 저장됩니다. 파일이 없으면 관리자 페이지에서 처음 한 번 설정합니다.
     비밀번호를 잊으면 FTP에서 admin/auth.php 를 지우고 다시 설정합니다.
   - 시공사례 사진은 images/uploads/ 에 저장됩니다. */
declare(strict_types=1);

$secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
if (PHP_VERSION_ID >= 70300) {
    session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'httponly' => true, 'secure' => $secure, 'samesite' => 'Lax']);
} else {
    session_set_cookie_params(0, '/; samesite=Lax', '', $secure, true);
}
session_name('CBADMIN');
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$root      = dirname(__DIR__);
$authFile  = __DIR__ . '/auth.php';
$lockFile  = __DIR__ . '/.lock.json';
$jsonFile  = $root . '/data/config.json';
$jsFile    = $root . '/data/config.js';
$uploadDir = $root . '/images/uploads';

function out(array $a): void { echo json_encode($a, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); exit; }
function fail(string $err, string $msg = ''): void { out(['ok' => false, 'error' => $err, 'message' => $msg]); }
function body(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 12 * 1024 * 1024) fail('too_large', '요청이 너무 큽니다.');
    $j = json_decode($raw, true);
    return is_array($j) ? $j : [];
}
function writeAtomic(string $path, string $content): bool {
    $dir = dirname($path);
    if (!is_dir($dir) && !@mkdir($dir, 0755, true)) return false;
    $tmp = $path . '.tmp' . bin2hex(random_bytes(4));
    if (@file_put_contents($tmp, $content, LOCK_EX) === false) return false;
    if (!@rename($tmp, $path)) { @unlink($tmp); return false; }
    return true;
}
function authData(string $file): ?array {
    if (!is_file($file)) return null;
    $d = include $file;
    return is_array($d) ? $d : null;
}
function verifyPw(array $auth, string $pw): bool {
    if (isset($auth['sha256'], $auth['hash'])) return hash_equals((string)$auth['hash'], hash('sha256', $auth['sha256'] . $pw));
    if (isset($auth['hash'])) return password_verify($pw, (string)$auth['hash']);
    return false;
}
function saveAuth(string $file, string $pw): bool {
    $hash = password_hash($pw, PASSWORD_DEFAULT);
    return writeAtomic($file, "<?php\n// 관리자 비밀번호 해시. 직접 수정하지 마세요. 잊었으면 이 파일을 지우고 관리자 페이지에서 다시 설정합니다.\nreturn ['hash' => " . var_export($hash, true) . "];\n");
}
function lockState(string $file): array {
    $d = is_file($file) ? json_decode((string)@file_get_contents($file), true) : null;
    return is_array($d) ? $d + ['fails' => 0, 'until' => 0] : ['fails' => 0, 'until' => 0];
}

$action = isset($_GET['action']) ? (string)$_GET['action'] : '';
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST' && (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') !== 'CB')) fail('bad_request');
if ($method !== 'GET' && $method !== 'POST') fail('bad_request');

$hasPw  = is_file($authFile);
$logged = !empty($_SESSION['cb_admin']);
$writable = (is_dir(dirname($jsFile)) ? is_writable(dirname($jsFile)) : is_writable($root)) && (!is_file($jsFile) || is_writable($jsFile)) && (!is_file($jsonFile) || is_writable($jsonFile));

switch ($action) {
    case 'status':
        out(['ok' => true, 'server' => true, 'hasPassword' => $hasPw, 'loggedIn' => $logged, 'hasConfig' => is_file($jsonFile), 'writable' => $writable, 'php' => PHP_VERSION]);

    case 'setup':
        if ($method !== 'POST') fail('bad_request');
        if ($hasPw) fail('already_set');
        $pw = (string)(body()['password'] ?? '');
        if (strlen($pw) < 8) fail('short', '8자 이상이어야 합니다.');
        if (!saveAuth($authFile, $pw)) fail('write', 'admin 폴더에 쓸 수 없습니다. FTP에서 admin 폴더 권한을 707로 바꿔 주세요.');
        session_regenerate_id(true); $_SESSION['cb_admin'] = true;
        out(['ok' => true]);

    case 'login':
        if ($method !== 'POST') fail('bad_request');
        if (!$hasPw) fail('no_password');
        $lock = lockState($lockFile);
        if ($lock['until'] > time()) fail('locked');
        $auth = authData($authFile);
        $pw = (string)(body()['password'] ?? '');
        if ($auth && verifyPw($auth, $pw)) {
            @unlink($lockFile);
            session_regenerate_id(true); $_SESSION['cb_admin'] = true;
            out(['ok' => true]);
        }
        $lock['fails']++;
        if ($lock['fails'] >= 8) { $lock['fails'] = 0; $lock['until'] = time() + 15 * 60; }
        @file_put_contents($lockFile, json_encode($lock), LOCK_EX);
        sleep(1);
        fail('wrong');

    case 'logout':
        $_SESSION = []; session_destroy();
        out(['ok' => true]);

    case 'password':
        if ($method !== 'POST') fail('bad_request');
        if (!$logged) fail('auth');
        $b = body(); $auth = authData($authFile);
        if (!$auth || !verifyPw($auth, (string)($b['current'] ?? ''))) fail('wrong', '현재 비밀번호가 틀렸습니다.');
        $nw = (string)($b['password'] ?? '');
        if (strlen($nw) < 8) fail('short', '8자 이상이어야 합니다.');
        if (!saveAuth($authFile, $nw)) fail('write');
        out(['ok' => true]);

    case 'load':
        if (!$logged) fail('auth');
        $cfg = is_file($jsonFile) ? json_decode((string)file_get_contents($jsonFile), true) : [];
        out(['ok' => true, 'config' => is_array($cfg) ? $cfg : [], 'writable' => $writable]);

    case 'save':
        if ($method !== 'POST') fail('bad_request');
        if (!$logged) fail('auth');
        $cfg = body()['config'] ?? null;
        if (!is_array($cfg) || !is_array($cfg['site'] ?? null)) fail('bad_config', '설정 형식이 올바르지 않습니다.');
        $cfg = ['site' => $cfg['site'], 'savedAt' => gmdate('c')];
        $json = json_encode($cfg, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_PRETTY_PRINT);
        if ($json === false) fail('encode', json_last_error_msg());
        if (!writeAtomic($jsonFile, $json . "\n") || !writeAtomic($jsFile, "window.CB_CONFIG = " . $json . ";\n")) {
            fail('write', 'data 폴더에 쓸 수 없습니다. FTP에서 data 폴더와 config.js 권한을 707/666으로 바꿔 주세요.');
        }
        out(['ok' => true, 'savedAt' => $cfg['savedAt']]);

    /* ---------- 사진 업로드 (관리자 페이지에서 이미 1400px 이하 JPEG 로 줄여서 보냄) ---------- */
    case 'upload':
        if ($method !== 'POST') fail('bad_request');
        if (!$logged) fail('auth');
        if (empty($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) fail('no_file', '파일이 없습니다.');
        $f = $_FILES['file'];
        if ($f['size'] > 6 * 1024 * 1024) fail('too_large', '사진이 너무 큽니다 (6MB 이하).');
        $info = @getimagesize($f['tmp_name']);
        if (!$info) fail('bad_image', '이미지 파일이 아닙니다.');
        $ext = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'][$info['mime']] ?? null;
        if (!$ext) fail('bad_image', 'JPG, PNG, WEBP, GIF 만 올릴 수 있습니다.');
        if (!is_dir($uploadDir) && !@mkdir($uploadDir, 0755, true)) fail('write', 'images/uploads 폴더를 만들 수 없습니다. FTP에서 images 폴더 권한을 707로 바꿔 주세요.');
        $name = date('Ymd_His') . '_' . bin2hex(random_bytes(3)) . '.' . $ext;
        if (!@move_uploaded_file($f['tmp_name'], $uploadDir . '/' . $name)) fail('write', '사진을 저장할 수 없습니다. images/uploads 폴더 권한을 확인해 주세요.');
        @chmod($uploadDir . '/' . $name, 0644);
        out(['ok' => true, 'path' => 'images/uploads/' . $name]);

    default:
        fail('unknown_action');
}
