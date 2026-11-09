/**
 * 机场排行榜自动轮换系统
 * 每天自动轮换排名顺序
 * 使用日期计算当前排名
 */

// 前6名机场池（固定在前6位，但顺序每天轮换）
const TOP_6_POOL = [
  { id: 'yuntu', name: '云图机场', icon: '🗺️', price: '¥20/月起', score: 9.2, desc: '金融级专线·1倍率无陷阱', tags: ['iepl', 'stream', 'budget'], badge: '强烈推荐', gradient: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' },
  { id: 'kunpeng', name: '鲲鹏加速', icon: '🦅', price: '¥1起', score: 9.1, desc: '1元套餐·全站极速1倍率', tags: ['budget', 'stream'], badge: '性价比 #1', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)' },
  { id: 'shunyun', name: '瞬云', icon: '⚡', price: '¥16/月起', score: 9.0, desc: 'IEPL专线·套餐灵活·年付实惠', tags: ['budget'], badge: '正常运行', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { id: 'jisuyun', name: '极速Cloud', icon: '⚡', price: '¥30/月起', score: 8.9, desc: '三网CN2GIA精品·VLess协议', tags: ['premium', 'speed'], badge: '正常运行', gradient: 'linear-gradient(135deg,#c2410c,#ea580c)' },
  { id: 'huanyuyun', name: '寰宇云', icon: '🌏', price: '¥28/月起', score: 8.8, desc: 'IPLC专线·不限时套餐', tags: ['iepl', 'budget'], badge: '新测评', gradient: 'linear-gradient(135deg,#667eea,#764ba2)' },
  { id: 'jiuyun', name: '九云', icon: '☁️', price: '¥6/月起', score: 8.7, desc: '海外中转·VLESS协议·超低价', tags: ['budget', 'beginner', 'stream'], badge: '正常运行', gradient: 'linear-gradient(135deg,#22d3a0,#10b981)' }
];

/**
 * 获取从某个起始日期到现在的天数
 * 使用固定起始日期：2026-01-01
 */
function getDaysSinceStart(date = new Date()) {
  const startDate = new Date('2026-01-01');
  const diffTime = date.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * 轮换数组顺序（基于天数）
 */
function rotateArray(arr, dayNumber) {
  const offset = dayNumber % arr.length;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}

/**
 * 获取当前天的前6名排名
 */
function getTop6Rankings() {
  const dayNumber = getDaysSinceStart();
  const rotated = rotateArray(TOP_6_POOL, dayNumber);

  return rotated.map((item, index) => ({
    ...item,
    rank: index + 1
  }));
}

/**
 * 获取明天的日期
 */
function getTomorrow(date = new Date()) {
  const result = new Date(date);
  result.setDate(result.getDate() + 1);
  result.setHours(0, 0, 0, 0); // 设置为明天的0点
  return result.toISOString().split('T')[0];
}

/**
 * 获取当前是第几天（从2026-01-01开始）
 */
function getCurrentDayNumber() {
  return getDaysSinceStart();
}

// 导出到全局
if (typeof window !== 'undefined') {
  window.RankingRotator = {
    getTop6Rankings,
    getTomorrow,
    getCurrentDayNumber,
    getDaysSinceStart
  };
}
