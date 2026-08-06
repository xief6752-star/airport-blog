// IndexNow — 页面访问时自动提交当前URL到 Bing/IndexNow
(function () {
  var KEY = '30d99b2fcc4c41d49a3904f88b315cba';
  var HOST = 'yongjichang.com';

  // 只在真实站点上运行，本地开发跳过
  if (location.hostname !== HOST) return;

  // 避免重复提交：同一URL 24小时内只提交一次
  var STORAGE_KEY = 'indexnow_submitted';
  var url = location.href.split('?')[0].split('#')[0];
  try {
    var cache = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    var now = Date.now();
    if (cache[url] && now - cache[url] < 86400000) return;
    cache[url] = now;
    // 清理超过7天的缓存条目
    Object.keys(cache).forEach(function (k) {
      if (now - cache[k] > 604800000) delete cache[k];
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (e) {}

  // 提交到 IndexNow（Bing 端点，同步到所有参与引擎）
  var endpoint = 'https://www.bing.com/indexnow';
  var params = new URLSearchParams({
    url: url,
    key: KEY,
    keyLocation: 'https://' + HOST + '/' + KEY + '.txt'
  });

  fetch(endpoint + '?' + params.toString(), {
    method: 'GET',
    mode: 'no-cors'
  }).catch(function () {});
})();
