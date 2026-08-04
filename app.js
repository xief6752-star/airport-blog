// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
});

// ── Mobile menu ──
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuToggle.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.textContent = '☰';
  });
});

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// ── Filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.airport-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.includes(filter);
      card.style.display = show ? '' : 'none';
      if (show) {
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'fadeInUp 0.4s ease';
      }
    });
  });
});

// ── AFF links (替换为你注册的真实推广链接) ──
const affLinks = {
  nexitally: 'https://ccc.jichang.best/#/register?code=za8UKIYz',   // 奶昔机场默认重定向至推荐机场
  dageyun:   'https://aff02.dgy02.com/#/register?code=PQdpFA0R',
  huanyuyun: 'https://hyy.52kok.cn/#/register?code=CPBmzXgk',
  '69yun':   'https://jiajijiwjiqj21.337979.xyz/uuid/auth/register?code=gqTxn7',
  shunyun:   'https://ccc.jichang.best/#/register?code=za8UKIYz',
  jisuyun:   'https://ygbk.jsjc456789.com',
  shanhai:   'https://ccc.jichang.best/#/register?code=za8UKIYz',   // 山海机场重定向至瞬云以防空白弹窗
  jilianyun: 'https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13',
  jindouyun: 'https://jdy.52kok.cn/#/register?code=wUKiwosG'
};
function goAff(name) {
  const url = affLinks[name] || '#';
  if (url === '#') { alert('AFF 链接待填入，请在 app.js 中更新 affLinks 对象。'); return; }
  window.open(url, '_blank', 'noopener');
}

// ── Detail modal ──
function showDetail(name) {
  const details = {
    nexitally: { name: '奶昔机场 (Nexitally)', desc: '奶昔机场是国内知名的高端机场，采用唯云等顶级专线线路，晚高峰实测可达 1000Mbps+，延迟极低。全面支持 Netflix 4K、Disney+、ChatGPT、Claude 等服务解锁。价格较高，适合对速度和稳定性要求极高的用户。\n\n✅ 优点：线路顶级、带宽充裕、解锁全面、运营时间长\n⚠️ 缺点：月费较贵（¥88 起），知名度高也是DDoS攻击目标' },
    dageyun: { name: '大哥云', desc: '大哥云是老牌高性价比机场，运营多年，口碑稳定。采用专线中转线路，晚高峰实测 500Mbps+，支持 Netflix、ChatGPT 解锁，提供免费试用，适合新手入门。\n\n✅ 优点：价格实惠（¥19 起）、免费试用、新手友好、运营稳定\n⚠️ 缺点：高峰期偶有波动，不是最顶级的专线' },
    huanyuyun: { name: '寰宇云', desc: '寰宇云是新晋优质机场，采用 IPLC 专线，不限时套餐设计灵活，三网优化效果好。晚高峰实测 700Mbps+，适合需要按需购买流量的用户。\n\n✅ 优点：IPLC 专线稳定、不限时套餐灵活、性价比高\n⚠️ 缺点：成立时间相对较短，建议月付观察' },
    '69yun': { name: '69云', desc: '69云以"每日签到送流量"闻名，性价比极高，同时附带 Emby 影视库服务。中转优化线路晚高峰实测 400Mbps+，适合作为主力或备用机场。\n\n✅ 优点：签到送流量、有 Emby 影视库、价格亲民（¥15 起）\n⚠️ 缺点：非专线，高峰期速度不及专线机场' },
    shunyun: { name: '瞬云', desc: '瞬云节点覆盖丰富，套餐灵活，年付价格实惠，适合使用频率固定的用户。中转+专线混合线路，晚高峰实测 700Mbps+。新用户可使用优惠码 20off 享专属折扣。\n\n✅ 优点：节点多、套餐灵活、年付价格低、有新客优惠码\n⚠️ 缺点：非纯专线，高峰期偶有波动' },
    jisuyun: { name: '极速Cloud', desc: 'CN2GIA三网精品优化线路，VLess协议，晚高峰无视拥堵。28+国家节点，原生IP完美解锁TikTok、AP平台、Netflix、ChatGPT，跨境电商与TikTok运营首选。\n\n✅ 优点：CN2GIA+AS9929+CMIN2三网精品、VLess高抗封锁、TikTok/AP原生解锁\n⚠️ 缺点：价格略高于普通机场' },
    shanhai: { name: '山海机场', desc: '山海机场支持按量付费和不限时套餐，多协议支持（SS/V2Ray/Trojan），适合使用频率不规律的用户。入门价格最低，是备用机场的好选择。\n\n✅ 优点：按量付费灵活、入门价格低（¥10 起）、多协议支持\n⚠️ 缺点：速度表现一般，适合作为备用而非主力' },
    jilianyun: { name: '极连云', desc: '极连云是一款全 IPLC 专线的优质机场，提供最高 2.5Gbps 带宽且晚高峰不限速，稳定性极佳。原生 IP 完美解锁 Netflix、ChatGPT、TikTok 等主流流媒体及 AI 服务。\n\n✅ 优点：全 IPLC 专线（最大 2.5Gbps）、流媒体与 AI 解锁极其稳定、性价比高（限时年付合 ¥8/月）、不限客户端数\n⚠️ 缺点：不接受退款，福建与新疆地区用户请谨慎下单' },
    jindouyun: { name: '筋斗云', desc: '筋斗云是一家专注 IEPL/IPLC 专线的老牌优质机场，采用三网优化线路，晚高峰实测稳定 600Mbps+。全节点原生 IP 解锁 Netflix、ChatGPT、TikTok、Disney+，套餐灵活，年付性价比出色。\n\n✅ 优点：IEPL/IPLC 专线、三网优化、原生 IP 解锁全、套餐档位丰富、7×24 客服在线\n⚠️ 缺点：欧美节点数量略少，年付需先月付试用后再锁定' }
  };
  const d = details[name];
  if (!d) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;';
  overlay.innerHTML = `
    <div style="background:#141929;border:1px solid rgba(99,120,255,.3);border-radius:20px;max-width:480px;width:100%;padding:32px;position:relative;animation:fadeInUp .3s ease;">
      <button onclick="this.closest('[style]').remove()" style="position:absolute;top:16px;right:16px;background:none;border:none;color:#8b9cc8;font-size:1.4rem;cursor:pointer;">✕</button>
      <h3 style="font-size:1.3rem;font-weight:800;margin-bottom:16px;">${d.name} · 测评详情</h3>
      <p style="color:#8b9cc8;line-height:1.8;white-space:pre-line;">${d.desc}</p>
      <button onclick="goAff('${name}');this.closest('[style]').remove()" style="margin-top:24px;width:100%;padding:12px;border-radius:999px;background:linear-gradient(135deg,#6378ff,#a78bfa);color:white;font-weight:700;border:none;cursor:pointer;font-size:.95rem;font-family:inherit;">
        查看套餐详情 →
      </button>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ── Smooth anchor scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
