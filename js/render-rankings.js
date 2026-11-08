/**
 * 动态渲染前6名机场卡片
 */

// 生成机场卡片的 HTML
function generateAirportCard(airport) {
  const rankLabel = airport.rank === 1 ? '编辑推荐 #1' :
                    airport.rank === 2 ? '推荐 #2' :
                    `推荐 #${airport.rank}`;

  const badgeStyle = airport.rank === 1 ? 'badge-top' : 'badge-online';

  // 生成统计数据（每个机场可以有自定义的统计数据）
  const statsHtml = getStatsForAirport(airport.id);

  // 生成标签
  const tagsHtml = getTagsForAirport(airport.id);

  return `
    <div class="airport-card scroll-reveal" data-tags="${airport.tags.join(' ')}">
      ${airport.rank <= 2 ? `<div class="card-rank" style="background:${airport.gradient};">${rankLabel}</div>` : `<div class="card-rank">${rankLabel}</div>`}
      <div class="card-header">
        <div class="card-logo-wrap">
          <div class="card-logo" style="background:${airport.gradient};">${airport.icon}</div>
          <div>
            <div class="card-name">${airport.name}</div>
            <div class="card-subtitle">${airport.desc}</div>
          </div>
        </div>
        <span class="card-badge ${badgeStyle}"><span class="badge-dot"></span>${airport.badge}</span>
      </div>
      ${tagsHtml}
      <div class="card-rating">
        ${generateStars(airport.score)}
        <span class="rating-score">${airport.score.toFixed(1)}</span>
        <span class="rating-count">/ 10.0</span>
      </div>
      ${statsHtml}
      <div class="card-price">
        <div class="price-info"><span class="price-amount">${airport.price.split('/')[0]}</span><span class="price-unit">/${airport.price.split('/')[1] || '月起'}</span></div>
        <div class="card-cta">
          <button class="btn-card btn-card-ghost" onclick="showDetail('${airport.id}')">详情</button>
          <button class="btn-card btn-card-primary" onclick="goAff('${airport.id}')">立即入手 →</button>
        </div>
      </div>
    </div>
  `;
}

// 生成星级评分
function generateStars(score) {
  const fullStars = Math.floor(score / 2); // 满分10分转换为5星
  const hasHalfStar = (score / 2) % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let html = '<div class="stars">';
  for (let i = 0; i < fullStars; i++) {
    html += '<span class="star">★</span>';
  }
  if (hasHalfStar) {
    html += '<span class="star half">★</span>';
  }
  for (let i = 0; i < emptyStars; i++) {
    html += '<span class="star" style="color:#4a5578;">★</span>';
  }
  html += '</div>';
  return html;
}

// 获取每个机场的标签
function getTagsForAirport(airportId) {
  const tagMap = {
    yuntu: [
      { text: '金融级专线', class: 'tag-blue' },
      { text: '接入点更换', class: 'tag-green' },
      { text: '优惠码 yt88', class: 'tag-purple' }
    ],
    kunpeng: [
      { text: '1元套餐', class: 'tag-orange' },
      { text: 'ChatGPT', class: 'tag-green' },
      { text: 'Netflix', class: 'tag-green' },
      { text: '1.0倍率', class: 'tag-blue' }
    ],
    shunyun: [
      { text: '中转+专线', class: 'tag-blue' },
      { text: 'Netflix', class: 'tag-green' },
      { text: '节点丰富', class: 'tag-purple' },
      { text: '年付低价', class: 'tag-orange' }
    ],
    jindouyun: [
      { text: 'IEPL专线', class: 'tag-blue' },
      { text: 'Netflix', class: 'tag-green' },
      { text: 'ChatGPT', class: 'tag-green' },
      { text: '三网优化', class: 'tag-orange' }
    ],
    huanyuyun: [
      { text: 'IPLC专线', class: 'tag-blue' },
      { text: 'Netflix', class: 'tag-green' },
      { text: '不限时流量', class: 'tag-purple' },
      { text: '三网优化', class: 'tag-orange' }
    ],
    jiuyun: [
      { text: '海外中转', class: 'tag-blue' },
      { text: 'Netflix', class: 'tag-green' },
      { text: 'ChatGPT', class: 'tag-green' },
      { text: '超低价', class: 'tag-orange' }
    ]
  };

  const tags = tagMap[airportId] || [];
  let html = '<div class="card-tags">';
  tags.forEach(tag => {
    html += `<span class="tag ${tag.class}">${tag.text}</span>`;
  });
  html += '</div>';
  return html;
}

// 获取每个机场的统计数据
function getStatsForAirport(airportId) {
  const statsMap = {
    yuntu: [
      { value: '低延迟', label: '金融级专线', color: '#22d3a0' },
      { value: '稳定', label: '24H保证' },
      { value: '1x', label: '节点倍率' }
    ],
    kunpeng: [
      { value: '1元', label: '试用套餐', color: '#fb923c' },
      { value: '99GB', label: '12元/月' },
      { value: '1.0x', label: '全站倍率' }
    ],
    shunyun: [
      { value: '35ms', label: '平均延迟', color: '#22d3a0' },
      { value: '700+', label: '晚高峰Mbps' },
      { value: '99.2%', label: '30日可用率' }
    ],
    jindouyun: [
      { value: '22ms', label: '平均延迟', color: '#22d3a0' },
      { value: '600+', label: '晚高峰Mbps' },
      { value: '99.4%', label: '30日可用率' }
    ],
    huanyuyun: [
      { value: '12ms', label: '参考延迟', color: '#22d3a0' },
      { value: '780+', label: '实测Mbps' },
      { value: '三网优化', label: '线路特征' }
    ],
    jiuyun: [
      { value: '28ms', label: '平均延迟', color: '#22d3a0' },
      { value: '280+', label: '晚高峰Mbps' },
      { value: '待观察', label: '长期稳定性' }
    ]
  };

  const stats = statsMap[airportId] || [];
  let html = '<div class="card-stats">';
  stats.forEach(stat => {
    const colorStyle = stat.color ? `style="color:${stat.color};"` : '';
    html += `
      <div class="card-stat">
        <div class="card-stat-value" ${colorStyle}>${stat.value}</div>
        <div class="card-stat-label">${stat.label}</div>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

// 渲染前6名机场到页面
function renderTop6Rankings() {
  if (typeof RankingRotator === 'undefined') {
    console.error('RankingRotator 未加载');
    return;
  }

  const rankings = RankingRotator.getTop6Rankings();
  const container = document.getElementById('top6-rankings-container');

  if (!container) {
    console.error('找不到 #top6-rankings-container 容器');
    return;
  }

  // 生成所有卡片的 HTML
  const cardsHtml = rankings.map(airport => generateAirportCard(airport)).join('');

  // 插入到容器中
  container.innerHTML = cardsHtml;

  // 重新触发 scroll reveal 动画
  if (typeof observer !== 'undefined') {
    document.querySelectorAll('#top6-rankings-container .scroll-reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // 显示下次更新时间
  const tomorrow = RankingRotator.getTomorrow();
  const updateInfo = document.getElementById('ranking-update-info');
  if (updateInfo) {
    updateInfo.textContent = `📅 排名每天0点更新 · 下次更新：${tomorrow}`;
  }
}

// 页面加载完成后渲染
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderTop6Rankings);
} else {
  renderTop6Rankings();
}
