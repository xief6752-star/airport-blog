/**
 * 勇哥博客 · 访问统计与点击追踪模块
 * =====================================
 * 功能：
 *   1. 记录每个页面的 PV（浏览量）
 *   2. 追踪机场推广链接的点击次数
 *   3. 记录来源（referrer）和访客设备信息
 *   4. 数据存储在 localStorage（本地）+ 可选接入 GA4
 *
 * 使用说明：
 *   - 在 <head> 内加入 GA4 代码片段（见下方）并替换 G-XXXXXXXXXX
 *   - 本文件在所有页面通过 <script src="analytics.js"></script> 引入
 */

(function () {
  'use strict';

  // ─── 配置区 ──────────────────────────────────────────────────
  const STORAGE_KEY = 'yg_analytics';
  const SESSION_KEY = 'yg_session';
  const MAX_RECORDS = 500; // 本地最多存储的点击记录数

  // 需要追踪点击的选择器（匹配机场推广按钮 / 外链）
  const TRACK_SELECTORS = [
    'a[href*="register"]',
    'a[href*="invite"]',
    'a[href*="aff"]',
    'a[href*="ref="]',
    '.card-btn',
    '.deal-btn',
    '[data-track]',
    'a[target="_blank"]',
  ];

  // ─── 工具函数 ─────────────────────────────────────────────────

  function getStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { pv: {}, clicks: [], uv: 0, lastReset: Date.now() };
    } catch {
      return { pv: {}, clicks: [], uv: 0, lastReset: Date.now() };
    }
  }

  function setStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('[Analytics] 存储失败：', e);
    }
  }

  function getSession() {
    try {
      const s = sessionStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }

  function setSession(data) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } catch {}
  }

  function getPageKey() {
    return location.pathname.replace(/\/$/, '') || '/';
  }

  function getDevice() {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad/i.test(ua)) return 'mobile';
    if (/Tablet|iPad/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  function getPageTitle() {
    return document.title || getPageKey();
  }

  // ─── 核心：记录 PV ────────────────────────────────────────────

  function trackPageView() {
    const data = getStorage();
    const key = getPageKey();

    // 累加 PV
    data.pv[key] = (data.pv[key] || 0) + 1;

    // 判断是否新访客（UV）：本 session 内算一个 UV
    const session = getSession();
    if (!session || !session.counted) {
      data.uv = (data.uv || 0) + 1;
      setSession({ counted: true, start: Date.now() });
    }

    setStorage(data);

    // 发送到 GA4（如果已配置）
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_title: getPageTitle(),
        page_location: location.href,
        page_path: getPageKey(),
      });
    }

    // 向 stats 页广播（如果已打开）
    try {
      window.dispatchEvent(new CustomEvent('yg_pv', { detail: { key, total: data.pv[key] } }));
    } catch {}
  }

  // ─── 核心：记录点击 ───────────────────────────────────────────

  function trackClick(el, event) {
    const href = el.getAttribute('href') || '';
    const label =
      el.getAttribute('data-track') ||
      el.getAttribute('data-name') ||
      el.textContent.trim().slice(0, 30) ||
      href.slice(0, 50);

    const record = {
      t: Date.now(),
      page: getPageKey(),
      label,
      href: href.slice(0, 200),
      device: getDevice(),
    };

    const data = getStorage();
    data.clicks = data.clicks || [];
    data.clicks.unshift(record);

    // 控制最大条数
    if (data.clicks.length > MAX_RECORDS) {
      data.clicks = data.clicks.slice(0, MAX_RECORDS);
    }

    setStorage(data);

    // 发送到 GA4
    if (typeof gtag === 'function') {
      gtag('event', 'click', {
        event_category: 'outbound',
        event_label: label,
        link_url: href,
        page_path: getPageKey(),
      });
    }
  }

  // ─── 绑定点击监听 ─────────────────────────────────────────────

  function bindClickTracking() {
    document.addEventListener('click', function (e) {
      const el = e.target.closest(TRACK_SELECTORS.join(','));
      if (el) trackClick(el, e);
    }, true);
  }

  // ─── 公开 API（供 stats.html 使用）──────────────────────────

  window.YGAnalytics = {
    getData: getStorage,
    clearData: function () {
      localStorage.removeItem(STORAGE_KEY);
    },
    getTopPages: function (n) {
      const data = getStorage();
      return Object.entries(data.pv || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, n || 10)
        .map(([page, views]) => ({ page, views }));
    },
    getTopClicks: function (n) {
      const data = getStorage();
      const counts = {};
      (data.clicks || []).forEach(c => {
        const key = c.label || c.href;
        counts[key] = (counts[key] || { label: c.label, href: c.href, count: 0 });
        counts[key].count++;
      });
      return Object.values(counts)
        .sort((a, b) => b.count - a.count)
        .slice(0, n || 10);
    },
    getRecentClicks: function (n) {
      const data = getStorage();
      return (data.clicks || []).slice(0, n || 20);
    },
    getTotalPV: function () {
      const data = getStorage();
      return Object.values(data.pv || {}).reduce((s, v) => s + v, 0);
    },
    getTotalUV: function () {
      return getStorage().uv || 0;
    },
    getTotalClicks: function () {
      return (getStorage().clicks || []).length;
    },
  };

  // ─── 初始化 ───────────────────────────────────────────────────

  function init() {
    trackPageView();
    bindClickTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
