/* 척척박사시스템에어컨 홈페이지 공통 스크립트
   - 기본 문구·시공사례·가격은 아래 DEFAULTS 에 있고, 관리자 페이지가 저장한 data/config.js (window.CB_CONFIG) 가 있으면 그 값이 우선합니다.
   - index.html 은 이 파일의 render() 로 화면을 채웁니다. admin.html 은 DEFAULTS 와 유틸만 씁니다. */
(function(){
'use strict';

const DEFAULTS = {
  brand: { name:'척척박사시스템에어컨', short:'척척박사', sub:'시스템에어컨', tagline:'LG · 삼성 · 캐리어 에어컨 설치 전문' },
  contact: {
    tel:'044-864-5728', mobile:'010-7723-5728', smartcall:'0507-1347-5728', email:'zzzang9085@hanmail.net',
    hours:'매일 09:00 ~ 22:00', address:'세종특별자치시 조치원읍 행복13길 5, 1층',
    blog:'https://blog.naver.com/zzzang9085', place:'https://map.naver.com/p/entry/place/1628924659', kakao:''
  },
  company: { ceo:'장현석', bizNo:'', areas:'세종 · 대전 · 청주 · 천안 · 오송 · 전국 출장 설치' },
  hero: { slides: [
    { image:'images/place_02.jpg', label:'시스템에어컨 설치 전문기업 <strong>척척박사시스템에어컨</strong>', title:'에어컨 설치 서비스',
      text:'고객의 공간에 딱 맞는 에어컨 설치 솔루션을 제공합니다.\n합리적인 견적, 꼼꼼하고 깔끔한 시공을 약속드립니다.', btn:'회사소개 바로가기', link:'#about' },
    { image:'images/place_03.jpg', label:'LG 전문 코드 시공자가 이름을 걸고 시공하는 <strong>설치 실명제</strong>', title:'가정 · 사업장 · 기업<br>어디든 척척',
      text:'관공서, 대학교, 빌딩 등 대형 현장 시공 경험이 풍부합니다.\n세종을 중심으로 전국 어디든 출장 설치해 드립니다.', btn:'시공사례 보기', link:'#cases' }
  ]},
  about: {
    en:'ABOUT US', title:'회사소개', subject:'합리적이고 정직한 견적, 고객님께 진심으로 응대합니다.',
    text:'척척박사시스템에어컨은 에어컨 설치 및 판매를 전문으로 하는 설치 전문 기업입니다. 설치 하자로 인한 A/S, 이전 설치도 가능하며 복잡하고 까다로운 시공도 가능합니다. 믿고 맡겨주시면 합리적인 견적으로 꼼꼼하고 깔끔하게 설치해 드리겠습니다.',
    image:'images/place_05.jpg',
    points: [
      { title:'설치 실명제 운영', text:'LG 전자 전문 코드 시공자가 이름을 걸고 안전하고 확실하게 시공합니다.' },
      { title:'합리적인 견적', text:'정직한 견적으로 고객님께 진심으로 응대합니다. 현장 확인 후 정확한 금액을 안내합니다.' },
      { title:'대형 현장 시공 경험', text:'관공서, 대학교, 빌딩, 공장 등 건설 현장 대형 시공 경험이 많습니다.' },
      { title:'전국 출장 설치', text:'세종·대전·청주·천안·오송은 물론 전국 어디든 출장 설치가 가능합니다.' }
    ]
  },
  casesSec: { en:'CONSTRUCTION EXAMPLE', title:'시공사례', subject:'척척박사시스템에어컨의 다양한 시공사례', moreBtn:'더 많은 시공사례 보기', cardBand:'세종 · 대전 · 청주 · 천안 · 오송' },
  categories: [
    { key:'home', name:'가정용', en:'Home', text:'아파트·주택에 딱 맞는 쾌적함!\n공간에 어울리는 최적의 냉난방 솔루션을 제공합니다.', image:'images/case_home_05.jpg' },
    { key:'biz',  name:'사업장', en:'Business', text:'카페·식당·헬스장·당구장 등 상가와 사무공간!\n업종별 요구를 고려한 맞춤 설치', image:'images/place_02.jpg' },
    { key:'corp', name:'기업', en:'Enterprise', text:'공장·연구소·관공서·학교 등 대형 건물!\n대규모 멀티 시스템에어컨 설계부터 시공까지', image:'images/place_08.jpg' }
  ],
  cases: [
    { id:'c01', cat:'home', area:'세종 조치원', title:'조치원 자이 아파트 시스템에어컨', sub:'LG 시스템에어컨 설치 · 단내림 인테리어', brand:'LG', units:'4대', date:'2026-09', image:'images/case_home_01.jpg', link:'https://blog.naver.com/zzzang9085/224418919119' },
    { id:'c02', cat:'home', area:'수원', title:'한화 꿈에그린 아파트 시스템에어컨', sub:'천장 구조 확인 후 실내기 위치·배관 동선 시공', brand:'LG', units:'4대', date:'2026-09', image:'images/case_home_02.jpg', link:'https://blog.naver.com/zzzang9085/224417937584' },
    { id:'c03', cat:'home', area:'세종 새나루마을', title:'어울림파밀리에센트럴 9단지', sub:'LG 시스템에어컨 4대 시공 완료', brand:'LG', units:'4대', date:'2022-01', image:'images/case_home_03.jpg', link:'https://blog.naver.com/zzzang9085/222634299033' },
    { id:'c04', cat:'home', area:'세종 도램마을', title:'목조주택 LG 시스템에어컨', sub:'신축 목조주택 선배관 + 실내기·실외기 설치', brand:'LG', units:'', date:'2022-01', image:'images/case_home_04.jpg', link:'https://blog.naver.com/zzzang9085/222615668573' },
    { id:'c05', cat:'home', area:'세종 가온마을', title:'가온마을 11단지 복층 삼성 시스템에어컨', sub:'복층 세대 삼성 시스템에어컨 설치', brand:'삼성', units:'', date:'2021-12', image:'images/case_home_05.jpg', link:'https://blog.naver.com/zzzang9085/222602921274' },
    { id:'c06', cat:'home', area:'청주 모충', title:'LH 트릴로채 삼성 시스템에어컨', sub:'시스템에어컨 3대 + 벽걸이 1대 시공', brand:'삼성', units:'4대', date:'2022-02', image:'images/case_home_06.jpg', link:'https://blog.naver.com/zzzang9085/222641373182' },
    { id:'c07', cat:'biz', area:'진천', title:'헬스장 시스템에어컨 설치', sub:'대형 운동 공간 천장형 시스템에어컨 시공', brand:'LG', units:'', date:'2022-03', image:'images/case_biz_01.jpg', link:'https://blog.naver.com/zzzang9085/222682834772' },
    { id:'c08', cat:'biz', area:'세종 고복', title:'카페 LG 원형 시스템에어컨', sub:'인테리어와 어울리는 원형 천장형 설치', brand:'LG', units:'', date:'2021-12', image:'images/case_biz_02.jpg', link:'https://blog.naver.com/zzzang9085/222584186550' },
    { id:'c09', cat:'biz', area:'세종 조치원', title:'당구장 천장형 40평 냉난방기', sub:'LG 40평형 냉난방기 시공', brand:'LG', units:'', date:'2022-01', image:'images/case_biz_03.jpg', link:'https://blog.naver.com/zzzang9085/222631218729' },
    { id:'c10', cat:'biz', area:'세종 조치원', title:'숯불갈비 식당 시스템 + 스탠드 냉난방기', sub:'매장 이전에 따른 시스템에어컨·스탠드 냉난방기 설치', brand:'LG', units:'', date:'2021-12', image:'images/case_biz_04.jpg', link:'https://blog.naver.com/zzzang9085/222602927859' },
    { id:'c11', cat:'biz', area:'세종 조치원', title:'미용실 · 2층 주택 시스템에어컨', sub:'상가 미용실과 주택 동시 시공', brand:'LG', units:'', date:'2022-01', image:'images/case_biz_05.jpg', link:'https://blog.naver.com/zzzang9085/222633000915' },
    { id:'c12', cat:'biz', area:'세종 조치원', title:'당구클럽 LG 40평 냉난방기 3대', sub:'실내기 3대 설치 완료', brand:'LG', units:'3대', date:'2021-08', image:'images/case_biz_06.jpg', link:'https://blog.naver.com/zzzang9085/222459723285' },
    { id:'c13', cat:'corp', area:'대구', title:'KMI 의료연구소 시스템에어컨 148대', sub:'대형 연구소 시스템에어컨 148대 시공', brand:'LG', units:'148대', date:'2023-03', image:'images/case_corp_01.jpg', link:'https://blog.naver.com/zzzang9085/223059016252' },
    { id:'c14', cat:'corp', area:'오송', title:'초콜릿 공장 냉난방기', sub:'10마력 2대 + 5마력 1대 시공', brand:'캐리어', units:'3대', date:'2021-11', image:'images/case_corp_02.jpg', link:'https://blog.naver.com/zzzang9085/222557299571' },
    { id:'c15', cat:'corp', area:'세종 수산리', title:'마을회관 · 새뜸마을 에어컨 설치', sub:'공공시설 스탠드 냉난방기 설치', brand:'LG', units:'', date:'2022-10', image:'images/case_corp_03.jpg', link:'https://blog.naver.com/zzzang9085/222889930550' },
    { id:'c16', cat:'corp', area:'천안·아산', title:'12마력 시스템에어컨 시공', sub:'사무동 천장형 시스템에어컨 멀티 시공', brand:'삼성', units:'', date:'2021-12', image:'images/case_corp_04.jpg', link:'https://blog.naver.com/zzzang9085/222585976499' },
    { id:'c17', cat:'corp', area:'세종', title:'10마력 80평 냉난방기 설치', sub:'대형 공간 스탠드 냉난방기 설치', brand:'캐리어', units:'', date:'2021-12', image:'images/case_corp_05.jpg', link:'https://blog.naver.com/zzzang9085/222594493767' },
    { id:'c18', cat:'corp', area:'세종 호려울', title:'단지 내 어린이집 에어컨 세척', sub:'천장형 시스템에어컨 분해 세척 완료', brand:'', units:'', date:'2021-03', image:'images/case_corp_06.jpg', link:'https://blog.naver.com/zzzang9085/222274160332' }
  ],
  prices: {
    en:'PRICE', title:'설치비용 안내', subject:'기본 설치비 기준이며, 현장 상황(배관 길이·타공·앵글 등)에 따라 견적이 달라질 수 있습니다.',
    note:'※ 현장 상황에 따라 견적이 변동될 수 있습니다. 정확한 금액은 전화 상담 후 안내해 드립니다.', image:'images/place_06.jpg', btn:'견적 문의하기',
    items: [
      { name:'벽걸이 에어컨', price:'149,000원~', desc:'기본 설치' },
      { name:'스탠드 에어컨', price:'199,000원~', desc:'기본 설치' },
      { name:'2in1 에어컨', price:'299,000원~', desc:'스탠드 + 벽걸이' },
      { name:'홈멀티 (천장형) 1대', price:'429,000원~', desc:'가정용 시스템' },
      { name:'천장형 (싱글)', price:'599,000원~', desc:'실내기 1대 + 실외기 1대' },
      { name:'상업용 (멀티) 1대', price:'799,000원~', desc:'실내기 1대당' }
    ]
  },
  contactSec: {
    en:'Contact Us', title:'견적 및 문의', image:'images/place_05.jpg',
    imgText1:'척척박사시스템에어컨과 함께라면 간편하고 완벽합니다.', imgText2:'내 공간에 딱 맞는 쾌적함,\n지금 시작하세요!',
    boxTitle:'전화 · 문자 상담',
    guide:'척척박사시스템에어컨의 상담은 고객님이 원하시는 설치 방식과 예산에 맞춘 최적의 솔루션을 제공합니다.\n설치 장소와 대수, 희망 일정을 알려주시면 빠르게 견적을 안내해 드립니다.',
    points: ['전화 상담 매일 09:00 ~ 22:00', '전문가의 맞춤형 설치 솔루션 제공', '무료 현장 방문 및 견적 안내'],
    btn1:'전화 상담하기', btn2:'문자로 문의하기'
  },
  support: {
    en:'CUSTOMER SUPPORT', title:'고객센터', subject:'척척박사시스템에어컨은 언제나 고객의 목소리에 귀 기울이겠습니다.', image:'images/place_10.jpg',
    box1:{ title:'검증된 품질, 믿을 수 있는 선택!', text:'고객님의 편의를 최우선으로 생각합니다. 전화 상담을 통해 전문가와 연결되어 정확한 정보와 견적을 받아보세요.', btn:'견적문의 바로가기' },
    box2:{ title:'새로운 소식', text:'최근 시공 현장과 소식을 네이버 블로그에서 전합니다.', btn:'블로그 바로가기' },
    box3:{ title:'자주하는 질문', text:'고객님들의 궁금증을 정리하여 안내합니다.', btn:'자주하는 질문 보기' },
    faq: [
      { q:'견적은 어떻게 받나요?', a:'전화(010-7723-5728) 또는 문자로 설치 장소, 평수, 대수, 희망 일정을 알려주시면 기본 견적을 바로 안내해 드립니다. 현장 확인이 필요한 경우 무료로 방문해 정확한 금액을 안내합니다.' },
      { q:'어떤 브랜드를 설치할 수 있나요?', a:'LG, 삼성, 캐리어 등 냉난방 모든 제품 설치가 가능합니다. LG 전자 전문 코드 시공자가 직접 시공합니다.' },
      { q:'세종 외 지역도 설치가 가능한가요?', a:'네. 세종·대전·청주·천안·오송을 중심으로 전국 출장 설치가 가능합니다. 지역에 따라 출장비가 추가될 수 있습니다.' },
      { q:'이전 설치나 A/S도 해주시나요?', a:'네. 이사에 따른 이전 설치, 타 업체 설치 하자로 인한 A/S, 분해 세척까지 가능합니다.' },
      { q:'설치비 외에 추가 비용이 있나요?', a:'기본 설치비에는 기본 배관 길이가 포함되며, 배관 연장·타공·앵글·전기 공사 등 현장 상황에 따라 추가 비용이 발생할 수 있습니다. 견적 시 미리 안내해 드립니다.' }
    ]
  },
  footer: { copyright:'Copyright © 척척박사시스템에어컨. All rights reserved.' }
};

/* ---------- 유틸 ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nl = s => esc(s).replace(/\n/g, '<br>');
/* 관리자 문구에는 <strong>, <br>, <em> 만 허용 */
const rich = s => esc(s).replace(/&lt;(\/?)(strong|br|em|b)&gt;/g, '<$1$2>').replace(/\n/g, '<br>');
const isObj = v => !!v && typeof v === 'object' && !Array.isArray(v);
const clone = o => JSON.parse(JSON.stringify(o));
function deepMerge(base, over){
  const out = clone(base);
  if(!isObj(over)) return out;
  for(const k of Object.keys(over)){
    const v = over[k];
    if(isObj(v) && isObj(out[k])) out[k] = deepMerge(out[k], v);
    else if(v !== undefined) out[k] = clone(v);
  }
  return out;
}
function mergeConfig(cfg){
  const site = isObj(cfg) && isObj(cfg.site) ? cfg.site : (isObj(cfg) ? cfg : {});
  const m = deepMerge(DEFAULTS, site);
  /* 목록은 통째로 바꿈 (관리자가 지운 항목이 되살아나지 않게) */
  if(Array.isArray(site.cases)) m.cases = clone(site.cases);
  if(Array.isArray(site.categories) && site.categories.length) m.categories = clone(site.categories);
  if(site.hero && Array.isArray(site.hero.slides) && site.hero.slides.length) m.hero.slides = clone(site.hero.slides);
  if(site.about && Array.isArray(site.about.points)) m.about.points = clone(site.about.points);
  if(site.prices && Array.isArray(site.prices.items)) m.prices.items = clone(site.prices.items);
  if(site.contactSec && Array.isArray(site.contactSec.points)) m.contactSec.points = clone(site.contactSec.points);
  if(site.support && Array.isArray(site.support.faq)) m.support.faq = clone(site.support.faq);
  return m;
}
const telHref = t => 'tel:' + String(t || '').replace(/[^\d+]/g, '');
const smsHref = (t, body) => 'sms:' + String(t || '').replace(/[^\d+]/g, '') + (body ? ('?body=' + encodeURIComponent(body)) : '');

/* ---------- 설정 읽기 (미리보기 지원) ---------- */
let PREVIEW = false;
try {
  const q = new URLSearchParams(location.search).get('preview');
  if(q === '1') sessionStorage.setItem('cb_preview', '1');
  if(q === '0') sessionStorage.removeItem('cb_preview');
  PREVIEW = sessionStorage.getItem('cb_preview') === '1';
} catch(e){}
let RAW = isObj(window.CB_CONFIG) ? window.CB_CONFIG : {};
if(PREVIEW){ try { const d = JSON.parse(localStorage.getItem('cb_preview_cfg') || 'null'); if(isObj(d)) RAW = d; } catch(e){} }
const SITE = mergeConfig(RAW);

window.CB = { DEFAULTS, SITE, RAW, PREVIEW, $, esc, nl, rich, isObj, clone, deepMerge, mergeConfig, telHref, smsHref };

/* ---------- 화면 구성 (index.html) ---------- */
function catName(key){ const c = SITE.categories.find(c => c.key === key); return c ? c.name : key; }

function caseCard(c){
  return `<article class="caseCard" data-id="${esc(c.id)}" tabindex="0" role="button" aria-label="${esc(c.title)} 자세히 보기">
    <div class="pic" style="background-image:url('${esc(c.image)}')">
      <div class="capTop"><span class="t1">${esc(c.area || '')} 시스템에어컨</span><span class="t2">${esc(c.title)}</span></div>
      <div class="capBand"><strong>${esc(SITE.brand.name)}</strong><span>${esc(SITE.casesSec.cardBand)}</span></div>
    </div>
    <div class="info">
      <p class="type">${esc(catName(c.cat))}</p>
      <p class="title">${esc(c.title)}</p>
      <p class="sub">${esc(c.sub || '')}</p>
      <dl><dd>브랜드 : ${esc(c.brand || '-')}</dd><dd>시공 : ${esc(c.units || '-')}${c.date ? ' · ' + esc(c.date) : ''}</dd></dl>
    </div>
  </article>`;
}

function render(){
  const S = SITE;
  document.title = S.brand.name + ' | 세종 시스템에어컨 설치 전문';
  const desc = document.querySelector('meta[name="description"]'); if(desc) desc.content = `${S.brand.name} - ${S.brand.tagline}. 가정용·사업장·기업 시스템에어컨 설치, 합리적인 견적, 전국 출장 설치. ${S.contact.mobile}`;

  /* 로고·공통 연락처 */
  document.querySelectorAll('[data-brand]').forEach(el => { el.textContent = S.brand[el.dataset.brand] || ''; });
  document.querySelectorAll('[data-tel]').forEach(el => { const v = S.contact[el.dataset.tel]; if(el.tagName === 'A') el.href = telHref(v); if(!el.dataset.keep) el.textContent = v || ''; });
  document.querySelectorAll('[data-href]').forEach(el => {
    const k = el.dataset.href; let v = '';
    if(k === 'sms') v = smsHref(S.contact.mobile, '[에어컨 견적 문의] 설치 장소: \n평수/대수: \n희망 일정: ');
    else if(k === 'mail') v = 'mailto:' + S.contact.email;
    else v = S.contact[k] || '';
    if(!v){ el.hidden = true; return; } el.href = v;
  });
  document.querySelectorAll('[data-contact]').forEach(el => { el.textContent = S.contact[el.dataset.contact] || ''; });
  document.querySelectorAll('[data-company]').forEach(el => { const v = S.company[el.dataset.company]; el.textContent = v || ''; if(!v && el.closest('[data-hide-empty]')) el.closest('[data-hide-empty]').hidden = true; });

  /* 메인 비주얼 */
  const slides = S.hero.slides;
  $('heroSlides').innerHTML = slides.map((s, i) => `<li class="slide${i===0?' on':''}" style="background-image:url('${esc(s.image)}')"></li>`).join('');
  $('heroDots').innerHTML = slides.map((s, i) => `<button type="button" class="${i===0?'on':''}" aria-label="${i+1}번 슬라이드"></button>`).join('');
  const showSlideText = i => { const s = slides[i];
    $('heroLabel').innerHTML = rich(s.label); $('heroTitle').innerHTML = rich(s.title); $('heroText').innerHTML = nl(s.text);
    const b = $('heroBtn'); b.textContent = s.btn || ''; b.href = s.link || '#about'; b.hidden = !s.btn; };
  showSlideText(0);
  let cur = 0, timer;
  const go = i => { cur = (i + slides.length) % slides.length;
    document.querySelectorAll('#heroSlides .slide').forEach((el, k) => el.classList.toggle('on', k === cur));
    document.querySelectorAll('#heroDots button').forEach((el, k) => el.classList.toggle('on', k === cur));
    const box = $('heroBox'); box.classList.remove('anim'); void box.offsetWidth; showSlideText(cur); box.classList.add('anim'); };
  const auto = () => { clearInterval(timer); if(slides.length > 1) timer = setInterval(() => go(cur + 1), 6000); };
  $('heroDots').addEventListener('click', e => { const b = e.target.closest('button'); if(!b) return; go([...$('heroDots').children].indexOf(b)); auto(); });
  auto();

  /* 회사소개 */
  $('aboutEn').textContent = S.about.en; $('aboutTitle').textContent = S.about.title; $('aboutSubject').textContent = S.about.subject;
  $('aboutText').innerHTML = nl(S.about.text); $('aboutImg').style.backgroundImage = `url('${esc(S.about.image)}')`;
  $('aboutPoints').innerHTML = S.about.points.map((p, i) => `<li><span class="num">0${i+1}</span><h4>${esc(p.title)}</h4><p>${nl(p.text)}</p></li>`).join('');

  /* 시공사례 */
  $('casesEn').innerHTML = esc(S.casesSec.en).replace(/ (\S+)$/, ' <strong>$1</strong>');
  $('casesSubject').textContent = S.casesSec.subject;
  $('catGrid').innerHTML = S.categories.map(c => `<li class="cat-${esc(c.key)}"><div class="articleBox" style="background-image:url('${esc(c.image)}')"><div class="filterLayer"></div>
    <div class="infoArea"><h3>${esc(c.name)}</h3><p>${nl(c.text)}</p><a href="#cases" data-filter="${esc(c.key)}">${esc(c.name)} 바로가기</a></div></div></li>`).join('');
  $('caseTabs').innerHTML = `<button type="button" class="on" data-filter="all">전체</button>` + S.categories.map(c => `<button type="button" data-filter="${esc(c.key)}">${esc(c.name)}</button>`).join('');
  $('moreCases').textContent = S.casesSec.moreBtn;
  let filter = 'all', expanded = false;
  const list = () => S.cases.filter(c => filter === 'all' || c.cat === filter);
  const drawCases = () => {
    const l = list();
    $('caseTrack').innerHTML = l.length ? l.map(caseCard).join('') : '<p class="empty">등록된 시공사례가 없습니다.</p>';
    $('caseGrid').innerHTML = l.map(caseCard).join('');
    $('caseGrid').hidden = !expanded; $('caseCarousel').hidden = expanded;
    $('moreCases').textContent = expanded ? '접기' : S.casesSec.moreBtn;
    $('caseTrack').scrollLeft = 0; updateDots();
  };
  const updateDots = () => {
    const tr = $('caseTrack'); if(!tr.clientWidth){ $('caseDots').innerHTML = ''; return; }
    const n = Math.max(1, Math.ceil(tr.scrollWidth / tr.clientWidth)); const i = Math.min(n - 1, Math.round(tr.scrollLeft / tr.clientWidth));
    $('caseDots').innerHTML = Array.from({length:n}, (_, k) => `<span class="${k===i?'on':''}"></span>`).join('');
  };
  $('caseTrack').addEventListener('scroll', updateDots, {passive:true}); window.addEventListener('resize', updateDots);
  $('casePrev').addEventListener('click', () => { const tr = $('caseTrack'); tr.scrollBy({left:-tr.clientWidth, behavior:'smooth'}); });
  $('caseNext').addEventListener('click', () => { const tr = $('caseTrack'); tr.scrollBy({left:tr.clientWidth, behavior:'smooth'}); });
  document.addEventListener('click', e => {
    const f = e.target.closest('[data-filter]'); if(!f) return;
    filter = f.dataset.filter; document.querySelectorAll('#caseTabs button').forEach(b => b.classList.toggle('on', b.dataset.filter === filter)); drawCases();
  });
  $('moreCases').addEventListener('click', () => { expanded = !expanded; drawCases(); if(!expanded) $('cases').scrollIntoView({behavior:'smooth'}); });
  drawCases();

  /* 사례 상세 */
  const openCase = id => { const c = S.cases.find(x => x.id === id); if(!c) return;
    $('caseModalBody').innerHTML = `<div class="mPic"><img src="${esc(c.image)}" alt="${esc(c.title)}"></div>
      <div class="mInfo"><p class="type">${esc(catName(c.cat))} · ${esc(c.area || '')}</p><h3>${esc(c.title)}</h3><p class="sub">${nl(c.sub || '')}</p>
      <dl>${c.brand ? `<div><dt>브랜드</dt><dd>${esc(c.brand)}</dd></div>` : ''}${c.units ? `<div><dt>시공 규모</dt><dd>${esc(c.units)}</dd></div>` : ''}${c.date ? `<div><dt>시공 시기</dt><dd>${esc(c.date)}</dd></div>` : ''}</dl>
      <div class="mBtns">${c.link ? `<a class="btnDark" href="${esc(c.link)}" target="_blank" rel="noopener">현장 블로그 보기</a>` : ''}<a class="btnLine" href="${telHref(S.contact.mobile)}">같은 설치 문의하기</a></div></div>`;
    $('caseModal').showModal(); };
  document.addEventListener('click', e => { const card = e.target.closest('.caseCard'); if(card) openCase(card.dataset.id); });
  document.addEventListener('keydown', e => { if(e.key === 'Enter' && e.target.classList && e.target.classList.contains('caseCard')) openCase(e.target.dataset.id); });
  $('caseModal').addEventListener('click', e => { if(e.target === $('caseModal') || e.target.closest('.mClose')) $('caseModal').close(); });

  /* 설치비용 */
  $('priceEn').textContent = S.prices.en; $('priceTitle').textContent = S.prices.title; $('priceSubject').innerHTML = nl(S.prices.subject);
  $('priceNote').textContent = S.prices.note; $('priceBox').style.backgroundImage = `url('${esc(S.prices.image)}')`; $('priceBtn').textContent = S.prices.btn;
  $('priceList').innerHTML = S.prices.items.map(p => `<li><span class="n">${esc(p.name)}${p.desc ? `<small>${esc(p.desc)}</small>` : ''}</span><strong>${esc(p.price)}</strong></li>`).join('');

  /* 견적 및 문의 */
  const C = S.contactSec;
  $('contactEn').textContent = C.en; $('contactTitle').textContent = C.title; $('contactImg').style.backgroundImage = `url('${esc(C.image)}')`;
  $('contactT1').textContent = C.imgText1; $('contactT2').innerHTML = nl(C.imgText2); $('contactBoxTitle').textContent = C.boxTitle;
  $('contactGuide').innerHTML = nl(C.guide); $('contactPoints').innerHTML = C.points.map(p => `<li>${esc(p)}</li>`).join('');
  $('contactBtn1').textContent = C.btn1; $('contactBtn2').textContent = C.btn2;

  /* 고객센터 */
  const U = S.support;
  $('supportEn').textContent = U.en; $('supportTitle').textContent = U.title; $('supportSubject').textContent = U.subject; $('support').style.backgroundImage = `url('${esc(U.image)}')`;
  $('sb1t').textContent = U.box1.title; $('sb1p').textContent = U.box1.text; $('sb1a').textContent = U.box1.btn;
  $('sb2t').textContent = U.box2.title; $('sb2p').textContent = U.box2.text; $('sb2a').textContent = U.box2.btn;
  $('sb3t').textContent = U.box3.title; $('sb3p').textContent = U.box3.text; $('sb3a').textContent = U.box3.btn;
  $('faqList').innerHTML = U.faq.map(f => `<details><summary>${esc(f.q)}</summary><p>${nl(f.a)}</p></details>`).join('');

  $('copyright').textContent = S.footer.copyright;

  /* 헤더: 스크롤 시 흰 배경 */
  const header = $('header');
  const onScroll = () => { header.classList.toggle('fixed', window.scrollY > 60); $('goTop').classList.toggle('show', window.scrollY > 400); };
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  $('goTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  $('naviToggle').addEventListener('click', () => { const open = document.body.classList.toggle('naviOpen'); $('naviToggle').setAttribute('aria-expanded', open); });
  document.querySelectorAll('#gnb a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('naviOpen')));

  /* 스크롤 등장 애니메이션 */
  const io = new IntersectionObserver(es => es.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }), {threshold:.12});
  document.querySelectorAll('.slideanim').forEach(el => io.observe(el));

  if(PREVIEW){ const b = document.createElement('div'); b.className = 'previewBar'; b.innerHTML = '<span>관리자 미리보기 · 저장 전 초안이 이 탭에만 보입니다</span><a href="admin.html?preview=0">관리자로</a><a href="index.html?preview=0">종료</a>'; document.body.appendChild(b); }
}

if(document.getElementById('heroSlides')){
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
}
})();
