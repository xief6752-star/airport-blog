/**
 * 机场排行榜自动轮换系统
 * 每周一自动轮换排名顺序
 * 使用 ISO 周数计算当前排名
 */

// 前6名机场池（固定在前6位，但顺序每周轮换）
const TOP_6_POOL = [
  { name: '云图', price: '¥20/月', score: 9.2, desc: '金融级专线·全能王者' },
  { name: '鲲鹏加速', price: '¥1起', score: 9.1, desc: '1元试用·性价比之王' },
  { name: '瞬云', price: '¥16/月', score: 9.0, desc: 'BGP中转·稳定流畅' },
  { name: '极速Cloud', price: '¥30/月', score: 8.9, desc: 'IPLC专线·企业首选' },
  { name: '九云', price: '¥6/月', score: 8.8, desc: 'VLESS协议·抗封王者' },
  { name: '寰宇云', price: '¥28/月', score: 8.7, desc: 'IEPL专线·高端稳定' }
];

// 后10名机场池（排在7-16位，但顺序每周轮换）
const BOTTOM_10_POOL = [
  { name: '速界', price: '¥15/月', score: 8.5, desc: '原生IP·流媒体解锁' },
  { name: '宝云', price: '¥4/月', score: 8.4, desc: '超低价·按需计费' },
  { name: '筋斗云', price: '¥12/月', score: 8.3, desc: '稳定中转·性价比高' },
  { name: '秒秒云', price: '¥25/月', score: 8.2, desc: '高速专线·企业级' },
  { name: '山水云', price: '¥10/月', score: 8.0, desc: '中转线路·稳定可靠' },
  { name: 'Andy Cloud', price: '¥8/月', score: 7.9, desc: '海外中转·流媒体友好' },
  { name: '杏花云', price: '¥12/月', score: 7.8, desc: 'BGP线路·稳定在线' },
  { name: '熊猫cloud', price: '¥7/月', score: 7.5, desc: '按需计费·灵活便捷' },
  { name: '锦云', price: '¥9/月', score: 7.3, desc: '海外中转·价格实惠' },
  { name: '极连云', price: '¥5/月', score: 7.1, desc: '入门首选·超低门槛' }
];

/**
 * 获取 ISO 周数（一年中的第几周）
 * @param {Date} date 日期对象
 * @returns {number} ISO 周数（1-53）
 */
function getISOWeek(date = new Date()) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7; // 周一为0，周日为6
  target.setDate(target.getDate() - dayNr + 3); // 设置到本周四
  const firstThursday = target.valueOf();
  target.setMonth(0, 1); // 设置到1月1日
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}

/**
 * 获取当前年份
 * @returns {number} 年份
 */
function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * 轮换数组顺序（基于周数）
 * @param {Array} arr 原数组
 * @param {number} weekNumber 周数
 * @returns {Array} 轮换后的数组
 */
function rotateArray(arr, weekNumber) {
  const offset = weekNumber % arr.length;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}

/**
 * 获取当前周的完整排名
 * @returns {Object} 包含排名数组、周数、更新时间
 */
function getCurrentRankings() {
  const now = new Date();
  const weekNumber = getISOWeek(now);
  const year = getCurrentYear();

  // 轮换前6名和后10名
  const rotatedTop6 = rotateArray(TOP_6_POOL, weekNumber);
  const rotatedBottom10 = rotateArray(BOTTOM_10_POOL, weekNumber);

  // 合并为完整排名（1-16名）
  const fullRankings = [
    ...rotatedTop6.map((item, index) => ({
      rank: index + 1,
      ...item,
      tier: 'top' // 标记为前6名
    })),
    ...rotatedBottom10.map((item, index) => ({
      rank: index + 7,
      ...item,
      tier: 'bottom' // 标记为后10名
    }))
  ];

  return {
    rankings: fullRankings,
    weekNumber,
    year,
    updateTime: now.toISOString().split('T')[0], // YYYY-MM-DD
    nextUpdateDate: getNextMonday(now)
  };
}

/**
 * 获取下周一的日期
 * @param {Date} date 当前日期
 * @returns {string} 下周一日期 YYYY-MM-DD
 */
function getNextMonday(date = new Date()) {
  const result = new Date(date);
  const dayOfWeek = result.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek); // 周日特殊处理
  result.setDate(result.getDate() + daysUntilMonday);
  return result.toISOString().split('T')[0];
}

/**
 * 获取指定周数的排名（用于预览）
 * @param {number} weekNumber 周数
 * @param {number} year 年份
 * @returns {Object} 该周的排名
 */
function getRankingsByWeek(weekNumber, year = getCurrentYear()) {
  const rotatedTop6 = rotateArray(TOP_6_POOL, weekNumber);
  const rotatedBottom10 = rotateArray(BOTTOM_10_POOL, weekNumber);

  return {
    rankings: [
      ...rotatedTop6.map((item, index) => ({ rank: index + 1, ...item })),
      ...rotatedBottom10.map((item, index) => ({ rank: index + 7, ...item }))
    ],
    weekNumber,
    year
  };
}

// 导出函数（用于浏览器环境）
if (typeof window !== 'undefined') {
  window.RankingRotator = {
    getCurrentRankings,
    getRankingsByWeek,
    getISOWeek,
    getCurrentYear,
    TOP_6_POOL,
    BOTTOM_10_POOL
  };
}

// 导出函数（用于 Node.js 环境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getCurrentRankings,
    getRankingsByWeek,
    getISOWeek,
    getCurrentYear,
    TOP_6_POOL,
    BOTTOM_10_POOL
  };
}
