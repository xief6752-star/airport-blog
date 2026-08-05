// Cloudflare Pages Function: /stats
// 查看各链接点击统计

const PASSWORD = 'yong2026'; // 可自行修改

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pwd = url.searchParams.get('pwd');

  if (pwd !== PASSWORD) {
    return new Response('401 Unauthorized', { status: 401 });
  }

  if (!env.CLICKS) {
    return new Response('KV not bound. Please bind CLICKS namespace in CF dashboard.', { status: 500 });
  }

  const list = await env.CLICKS.list({ prefix: 'click:' });
  const totals = {};
  for (const key of list.keys) {
    const parts = key.name.split(':');
    const slug = parts[1];
    const count = parseInt(await env.CLICKS.get(key.name) || '0');
    totals[slug] = (totals[slug] || 0) + count;
  }

  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const rows = sorted.map(([slug, count]) =>
    `<tr><td>${slug}</td><td style="text-align:right;font-weight:bold;">${count}</td></tr>`
  ).join('');

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><title>点击统计</title>
<style>
  body { font-family: monospace; max-width: 600px; margin: 60px auto; padding: 0 20px; background: #f5f5f5; }
  h1 { font-size: 1.2rem; margin-bottom: 24px; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; border-bottom: 2px solid #000; padding: 8px 0; font-size: 12px; text-transform: uppercase; }
  td { padding: 10px 0; border-bottom: 1px solid #ddd; font-size: 14px; }
  .total { margin-top: 16px; font-size: 13px; color: #888; }
</style>
</head>
<body>
<h1>勇哥博客 · 链接点击统计</h1>
<table>
  <thead><tr><th>链接</th><th style="text-align:right;">点击数</th></tr></thead>
  <tbody>${rows || '<tr><td colspan="2">暂无数据</td></tr>'}</tbody>
</table>
<p class="total">共 ${sorted.length} 个链接 · 数据保留90天</p>
</body></html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
}
