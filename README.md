# 梯云测评 — Cloudflare Pages 部署指南

## 文件结构

```
airport-blog/
├── index.html       # 首页（机场推荐）
├── tutorials.html   # 使用教程
├── wiki.html        # 科普百科
├── deals.html       # 优惠专区
├── about.html       # 关于我们
├── index.css        # 全局样式
├── app.js           # 交互逻辑
└── wrangler.json    # CF Pages 配置
```

## 部署到 Cloudflare Pages（推荐方式）

### 方法一：直接上传（最简单）

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 左侧菜单 → **Workers & Pages** → **Create Application** → **Pages**
3. 选择 **Direct Upload**
4. 将 `airport-blog/` 文件夹打包成 zip 上传
5. 等待部署完成，绑定你的自定义域名

### 方法二：GitHub 自动部署（推荐，便于更新）

1. 将 `airport-blog/` 推送到 GitHub 仓库（可设为私有）
2. Cloudflare Pages → Create Application → Pages → **Connect to Git**
3. 选择你的仓库，Build 配置：
   - Build command: 留空
   - Build output directory: `/`
4. 绑定自定义域名

## 绑定自定义域名

1. Pages 项目 → **Custom Domains** → Add domain
2. 输入你在 CF 注册的域名（如 `tiyun.com`）
3. 由于域名已在 CF，DNS 会自动配置，几秒钟生效

## 自定义配置（上线前必改）

### index.html / 各页面
- 将所有 `https://t.me/` 替换为你的真实 Telegram 频道链接
- 将 AFF 链接替换为你实际注册的机场推广链接

### app.js
```js
const affLinks = {
  wgetcloud: '你的WgetCloud AFF链接',
  boostnet:  '你的BoostNet AFF链接',
  suyun:     '你的速云加速AFF链接'
};
```

### deals.html
- 将优惠码替换为机场方给你的真实专属码
- 更新折扣截止时间

## 添加新机场卡片

复制 `index.html` 中的 `<!-- Card N -->` 注释块，修改：
- `data-tags="..."` — 筛选标签（iepl/budget/stream/beginner）
- Logo 渐变色、Emoji
- 机场名、描述、标签、评分、测速数据、价格
- `onclick="goAff('机场key')"` 并在 app.js 中添加对应链接
