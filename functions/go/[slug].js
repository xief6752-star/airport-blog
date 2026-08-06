// Cloudflare Pages Function: /go/[slug]
// 记录点击次数到 KV，然后跳转到目标链接
// KV namespace 需在 CF 控制台绑定，变量名：CLICKS

const LINKS = {
  // 飞鸟
  'flyingbird-top': 'https://flyingbird.cc/?utm_source=yongjichang&utm_medium=review&utm_campaign=flyingbird&utm_content=top',
  'flyingbird-mid': 'https://flyingbird.cc/?utm_source=yongjichang&utm_medium=review&utm_campaign=flyingbird&utm_content=mid',
  'flyingbird-bot': 'https://flyingbird.cc/?utm_source=yongjichang&utm_medium=review&utm_campaign=flyingbird&utm_content=bot',

  // WgetCloud
  'wgetcloud-top': 'https://wgetcloud.org/?utm_source=yongjichang&utm_medium=review&utm_campaign=wgetcloud&utm_content=top',
  'wgetcloud-mid': 'https://wgetcloud.org/?utm_source=yongjichang&utm_medium=review&utm_campaign=wgetcloud&utm_content=mid',
  'wgetcloud-bot': 'https://wgetcloud.org/?utm_source=yongjichang&utm_medium=review&utm_campaign=wgetcloud&utm_content=bot',

  // 4ksAPI
  'fourks-top': 'https://4ksapi.com/?utm_source=yongjichang&utm_medium=review&utm_campaign=fourks&utm_content=top',
  'fourks-mid': 'https://4ksapi.com/?utm_source=yongjichang&utm_medium=review&utm_campaign=fourks&utm_content=mid',
  'fourks-bot': 'https://4ksapi.com/?utm_source=yongjichang&utm_medium=review&utm_campaign=fourks&utm_content=bot',

  // Nexitally 奶昔
  'nexitally-top': 'https://nexitally.com/?utm_source=yongjichang&utm_medium=review&utm_campaign=nexitally&utm_content=top',
  'nexitally-mid': 'https://nexitally.com/?utm_source=yongjichang&utm_medium=review&utm_campaign=nexitally&utm_content=mid',
  'nexitally-bot': 'https://nexitally.com/?utm_source=yongjichang&utm_medium=review&utm_campaign=nexitally&utm_content=bot',

  // 大哥云
  'dageyun-top': 'https://aff02.dgy02.com/#/register?code=PQdpFA0R&utm_source=yongjichang&utm_medium=review&utm_campaign=dageyun&utm_content=top',
  'dageyun-mid': 'https://aff02.dgy02.com/#/register?code=PQdpFA0R&utm_source=yongjichang&utm_medium=review&utm_campaign=dageyun&utm_content=mid',
  'dageyun-bot': 'https://aff02.dgy02.com/#/register?code=PQdpFA0R&utm_source=yongjichang&utm_medium=review&utm_campaign=dageyun&utm_content=bot',

  // 寰宇云
  'huanyuyun-top': 'https://huanyuyun.cc/#/register?code=CPBmzXgk&utm_source=yongjichang&utm_medium=review&utm_campaign=huanyuyun&utm_content=top',
  'huanyuyun-mid': 'https://huanyuyun.cc/#/register?code=CPBmzXgk&utm_source=yongjichang&utm_medium=review&utm_campaign=huanyuyun&utm_content=mid',
  'huanyuyun-bot': 'https://huanyuyun.cc/#/register?code=CPBmzXgk&utm_source=yongjichang&utm_medium=review&utm_campaign=huanyuyun&utm_content=bot',

  // 极联云
  'jilianyun-top': 'https://ccc.jichang.best/#/register?code=za8UKIYz&utm_source=yongjichang&utm_medium=review&utm_campaign=jilianyun&utm_content=top',
  'jilianyun-mid': 'https://ccc.jichang.best/#/register?code=za8UKIYz&utm_source=yongjichang&utm_medium=review&utm_campaign=jilianyun&utm_content=mid',
  'jilianyun-bot': 'https://ccc.jichang.best/#/register?code=za8UKIYz&utm_source=yongjichang&utm_medium=review&utm_campaign=jilianyun&utm_content=bot',

  // 好泽VPN
  'haozevpn-top': 'https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13&utm_source=yongjichang&utm_medium=review&utm_campaign=haozevpn&utm_content=top',
  'haozevpn-mid': 'https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13&utm_source=yongjichang&utm_medium=review&utm_campaign=haozevpn&utm_content=mid',
  'haozevpn-bot': 'https://haozevpn.jlyvipaff.com/#/?code=KUKfOY13&utm_source=yongjichang&utm_medium=review&utm_campaign=haozevpn&utm_content=bot',

  // 云图机场
  'yuntu-top': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=yuntu&utm_content=top',
  'yuntu-mid': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=yuntu&utm_content=mid',
  'yuntu-bot': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=yuntu&utm_content=bot',

  // 极速Cloud
  'jisucloud-top': 'https://ygbk.jsjc456789.com?utm_source=yongjichang&utm_medium=review&utm_campaign=jisucloud&utm_content=top',
  'jisucloud-mid': 'https://ygbk.jsjc456789.com?utm_source=yongjichang&utm_medium=review&utm_campaign=jisucloud&utm_content=mid',
  'jisucloud-bot': 'https://ygbk.jsjc456789.com?utm_source=yongjichang&utm_medium=review&utm_campaign=jisucloud&utm_content=bot',

  // 瞬云
  'shunyun-top': 'https://ccc.jichang.best/#/register?code=MhKYAnsG&utm_source=yongjichang&utm_medium=review&utm_campaign=shunyun&utm_content=top',
  'shunyun-mid': 'https://ccc.jichang.best/#/register?code=MhKYAnsG&utm_source=yongjichang&utm_medium=review&utm_campaign=shunyun&utm_content=mid',
  'shunyun-bot': 'https://ccc.jichang.best/#/register?code=MhKYAnsG&utm_source=yongjichang&utm_medium=review&utm_campaign=shunyun&utm_content=bot',

  // 超悦机场 → 云图
  'chaoyue-top': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=chaoyue&utm_content=top',
  'chaoyue-mid': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=chaoyue&utm_content=mid',
  'chaoyue-bot': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=chaoyue&utm_content=bot',

  // 一元机场 → 云图
  'yiyuan-top': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=yiyuan&utm_content=top',
  'yiyuan-mid': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=yiyuan&utm_content=mid',
  'yiyuan-bot': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=yiyuan&utm_content=bot',

  // TAG机场 → 云图
  'tag-top': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=tag&utm_content=top',
  'tag-mid': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=tag&utm_content=mid',
  'tag-bot': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=tag&utm_content=bot',

  // GlaDOS → 云图
  'glados-top': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=glados&utm_content=top',
  'glados-mid': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=glados&utm_content=mid',
  'glados-bot': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=glados&utm_content=bot',

  // 硅基流动 → 云图
  'siliconflow-top': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=siliconflow&utm_content=top',
  'siliconflow-mid': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=siliconflow&utm_content=mid',
  'siliconflow-bot': 'https://vip.ytjcok.org/#/register?code=iV8ahCNE&utm_source=yongjichang&utm_medium=review&utm_campaign=siliconflow&utm_content=bot',
};

export async function onRequest(context) {
  const { params, env } = context;
  const slug = params.slug;
  const target = LINKS[slug];

  if (!target) {
    const home = new URL(context.request.url);
    return Response.redirect(`${home.protocol}//${home.host}/`, 302);
  }

  if (env.CLICKS) {
    try {
      const key = `click:${slug}:${new Date().toISOString().slice(0, 10)}`;
      const current = parseInt(await env.CLICKS.get(key) || '0');
      await env.CLICKS.put(key, String(current + 1), { expirationTtl: 60 * 60 * 24 * 90 });
    } catch (e) {}
  }

  return Response.redirect(target, 302);
}
