/**
 * 机场排行榜自动轮换系统
 * 每周一自动变化排名（基于 ISO 周数）
 *
 * 轮换规则：
 * - 前6名：云图、鲲鹏、瞬云、极速Cloud、九云、寰宇云（循环轮换）
 * - 后10名：速界、宝云、筋斗云、秒秒云、山水云、Andy Cloud、杏花云、熊猫cloud、锦云、极连云（循环轮换）
 */

(function(window) {
  'use strict';

  // 前6名机场池
  const TOP_6_POOL = [
    { name: '云图', nameEn: 'yuntu', price: '¥20/月', score: 9.2, desc: '金融级专线·全能王者', badges: ['IPLC专线', 'ChatGPT'] },
    { name: '鲲鹏加速', nameEn: 'kunpeng', price: '¥1起', score: 9.1, desc: '1元试用·性价比之王', badges: ['超低价', '试用友好'] },
    { name: '瞬云', nameEn: 'shunyun', price: '¥16/月', score: 9.0, desc: 'BGP中转·稳定流畅', badges: ['BGP中转', 'Netflix'] },
    { name: '极速Cloud', nameEn: 'jisuyun', price: '¥30/月', score: 8.9, desc: 'IPLC专线·企业首选', badges: ['IPLC专线', '企业级'] },
    { name: '九云', nameEn: 'jiuyun', price: '¥6/月', score: 8.8, desc: 'VLESS协议·抗封王者', badges: ['VLESS', '高性价比'] },
    { name: '寰宇云', nameEn: 'huanyuyun', price: '¥28/月', score: 8.7, desc: 'IEPL专线·高端稳定', badges: ['IEPL专线', '稳定'] }
  ];

  // 后10名机场池
  const BOTTOM_10_POOL = [
    { name: '速界', nameEn: 'speedworld', price: '¥15/月', score: 8.5, desc: '原生IP·流媒体解锁', badges: ['原生IP', 'Netflix'] },
    { name: '宝云', nameEn: 'baoyun', price: '¥4/月', score: 8.4, desc: '超低价·按需计费', badges: ['超低价', '按需计费'] },
    { name: '筋斗云', nameEn: 'jindouyun', price: '¥12/月', score: 8.3, desc: '稳定中转·性价比高', badges: ['中转', '性价比'] },
    { name: '秒秒云', nameEn: 'miaomiaoyun', price: '¥25/月', score: 8.2, desc: '高速专线·企业级', badges: ['专线', '企业级'] },
    { name: '山水云', nameEn: 'shanshuiyun', price: '¥10/月', score: 8.0, desc: '中转线路·稳定可靠', badges: ['中转', '稳定'] },
    { name: 'Andy Cloud', nameEn: 'andycloud', price: '¥8/月', score: 7.9, desc: '海外中转·流媒体友好', badges: ['中转', 'Netflix'] },
    { name: '杏花云', nameEn: 'xinghuayun', price: '¥12/月', score: 7.8, desc: 'BGP线路·稳定在线', badges: ['BGP', '稳定'] },
    { name: '熊猫cloud', nameEn: 'pandacloud', price: '¥7/月', score: 7.5, desc: '按需计费·灵活便捷', badges: ['按需计费', '灵活'] },
    { name: '锦云', nameEn: 'jinyun', price: '¥9/月', score: 7.3, desc: '海外中转·价格实惠', badges: ['中转', '实惠'] },
    { name: '极连云', nameEn: 'jilianyun', price: '¥5/月', score: 7.1, desc: '入门首选·超低门槛', badges: ['超低价', '入门'] }
  ];

  /**
   * 获取 ISO 周数（一年中的第几周）
   * ISO 8601 标准：每周从周一开始，第一周包含该年第一个周四
   */
  function getISOWeek(date) {
    date = date || new Date();
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7; // 周一=0, 周日=6
    target.setDate(target.getDate() - dayNr + 3); // 移到本周四
    const jan4 = new Date(target.getFullYear(), 0, 4);
    const dayDiff = (target - jan4) / 86400000; // 相差天数
    return 1 + Math.ceil(dayDiff / 7);
  }

  /**
   * 轮换数组（基于周数的偏移量）
   */
  function rotateArray(arr, weekNumber) {
    const offset = weekNumber % arr.length;
    return [...arr.slice(offset), ...arr.slice(0, offset)];
  }

  /**
   * 获取当前周的完整排名
   */
  function getCurrentRankings() {
    const now = new Date();
    const weekNumber = getISOWeek(now);
    const year = now.getFullYear();

    // 轮换前6名和后10名
    const rotatedTop6 = rotateArray(TOP_6_POOL, weekNumber);
    const rotatedBottom10 = rotateArray(BOTTOM_10_POOL, weekNumber);

    // 合并为完整排名
    const rankings = [
      ...rotatedTop6.map((item, idx) => ({
        rank: idx + 1,
        tier: 'top',
        ...item
      })),
      ...rotatedBottom10.map((item, idx) => ({
        rank: idx + 7,
        tier: 'bottom',
        ...item
      }))
    ];

    return {
      rankings,
      weekNumber,
      year,
      updateDate: now.toISOString().split('T')[0],
      nextUpdate: getNextMonday(now)
    };
  }

  /**
   * 获取下周一的日期
   */
  function getNextMonday(date) {
    date = date || new Date();
    const result = new Date(date);
    const dayOfWeek = result.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
    result.setDate(result.getDate() + daysUntilMonday);
    return result.toISOString().split('T')[0];
  }

  /**
   * 格式化日期为中文
   */
  function formatDateCN(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  }

  /**
   * 获取排名等级的 CSS 类名
   */
  function getRankClass(rank) {
    if (rank === 1) return 'top-1';
    if (rank === 2) return 'top-2';
    if (rank === 3) return 'top-3';
    return 'regular';
  }

  /**
   * 获取排名奖牌图标
   */
  function getRankIcon(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  }

  // 导出到全局
  window.RankingRotator = {
    getCurrentRankings,
    getISOWeek,
    formatDateCN,
    getRankClass,
    getRankIcon,
    TOP_6_POOL,
    BOTTOM_10_POOL
  };

})(window);
