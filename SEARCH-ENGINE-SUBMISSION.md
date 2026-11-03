# 搜索引擎提交指南

## 🚀 立即执行的步骤

### 1. Google Search Console 提交

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 选择 `yongjichang.com` 资源
3. 左侧菜单 → **站点地图**
4. 输入：`https://yongjichang.com/sitemap.xml`
5. 点击**提交**

**验证方法**：
```
状态：成功
发现的网址：应显示 ~80+ 个
```

### 2. Bing Webmaster Tools 提交

1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 添加/选择 `yongjichang.com`
3. 左侧菜单 → **Sitemaps**
4. 提交：`https://yongjichang.com/sitemap.xml`

### 3. IndexNow API 推送（已集成）

你的网站已经集成了 IndexNow API，每次页面更新会自动推送到 Bing 和 Yandex。

验证文件：`https://yongjichang.com/30d99b2fcc4c41d49a3904f88b315cba.txt`

### 4. 手动触发 IndexNow（可选）

```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "yongjichang.com",
    "key": "30d99b2fcc4c41d49a3904f88b315cba",
    "keyLocation": "https://yongjichang.com/30d99b2fcc4c41d49a3904f88b315cba.txt",
    "urlList": [
      "https://yongjichang.com/",
      "https://yongjichang.com/compare",
      "https://yongjichang.com/reviews",
      "https://yongjichang.com/airport-monthly-report-oct-2026",
      "https://yongjichang.com/reviews/review-kunpeng"
    ]
  }'
```

---

## 📈 监控和验证

### Google Search Console 检查项

**索引覆盖率**（每周检查）：
1. **覆盖范围** → 查看已提交和已编入索引的页面
2. 目标：80+ 页面被索引
3. 修复任何错误或警告

**效果报告**（每周检查）：
1. **效果** → 查看展示次数、点击次数、平均排名
2. 重点关注：
   - "机场推荐" - 目标排名前 5
   - "机场测评" - 目标排名前 3
   - "1元机场" - 目标排名前 10

**移动设备易用性**（每月检查）：
1. 确保所有页面移动端友好
2. 修复任何移动端可用性问题

### Clarity 数据监控

1. 访问 [clarity.microsoft.com](https://clarity.microsoft.com)
2. 查看热图分析：
   - 用户最关注的内容
   - 点击率最高的机场
   - 页面滚动深度
3. 查看会话录制：
   - 用户行为路径
   - 流失页面分析

---

## 🎯 预期效果时间线

### 1-3 天
- Sitemap 被搜索引擎抓取
- 新页面开始被索引

### 1 周
- 部分关键词开始有排名
- Google Search Console 显示初步数据

### 2-4 周
- 关键词排名稳定上升
- 有机流量开始增长

### 2-3 个月
- 主要关键词进入前 20
- 日均有机流量 > 500 UV

---

## 🔍 竞争对手监控

使用以下工具追踪竞争对手：

### 免费工具
- **Ubersuggest**：关键词研究和竞争对手分析
- **Google Trends**：搜索趋势和热度对比
- **Similar Web 插件**：竞争对手流量估算

### 重点关注
1. 竞争对手的新内容
2. 他们的关键词策略
3. 外链来源
4. 内容更新频率

---

## ✅ 每周 SEO 任务清单

### 周一
- [ ] 检查 Google Search Console 索引状态
- [ ] 查看上周流量数据
- [ ] 规划本周内容更新

### 周三
- [ ] 发布/更新 1-2 篇内容
- [ ] 检查 Clarity 热图数据
- [ ] 优化低点击率页面

### 周五
- [ ] 提交本周新增/更新的页面到 IndexNow
- [ ] 检查竞争对手动态
- [ ] 规划下周内容

### 每周日
- [ ] 更新首页"最近更新"时间
- [ ] 检查并修复死链
- [ ] 备份网站数据

---

## 🚨 紧急情况处理

### 排名突然下降
1. 检查 Google Search Console 是否有处罚通知
2. 检查网站是否能正常访问
3. 检查竞争对手是否有大动作
4. 回滚最近的内容更改（如果有）

### 流量异常波动
1. 检查 GA4 数据是否准确
2. 排除节假日/周末因素
3. 检查是否有热点事件引流
4. 查看 Search Console 搜索分析

---

**创建日期**：2026-10-01  
**下次更新**：2026-10-08
