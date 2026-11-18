#!/bin/bash

# SEO优化脚本 - 2026-11-17
# 1. 添加图片懒加载
# 2. 补全Schema.org标记
# 3. 完善面包屑导航

echo "🚀 开始SEO优化..."

# 统计当前状态
total_html=$(find . -name "*.html" -type f | wc -l | tr -d ' ')
schema_count=$(find . -name "*.html" -type f -exec grep -l "schema.org" {} \; | wc -l | tr -d ' ')
breadcrumb_count=$(find . -name "*.html" -type f -exec grep -l "breadcrumb" {} \; | wc -l | tr -d ' ')

echo "📊 当前状态:"
echo "  - HTML文件总数: $total_html"
echo "  - 已有Schema.org: $schema_count"
echo "  - 已有面包屑导航: $breadcrumb_count"

# 1. 为logo图片添加懒加载(除首屏外)
echo ""
echo "🖼️  Step 1: 优化图片懒加载..."

# 注意: logo图片在首屏不需要懒加载,这里只处理评测页面中的截图
find . -name "review-*.html" -type f | while read file; do
  if grep -q '<img' "$file" && ! grep -q 'loading="lazy"' "$file"; then
    # 为评测页面的截图添加懒加载
    sed -i '' 's/<img \(src="screenshots\/[^"]*"\)/<img loading="lazy" \1/g' "$file"
    echo "  ✓ 已优化: $file"
  fi
done

echo "  ✅ 图片懒加载优化完成"

# 2. 为缺少Schema.org的页面添加基础标记
echo ""
echo "🏷️  Step 2: 补全Schema.org标记..."

# yuntu/index.html 需要添加Schema
if [ -f "./yuntu/index.html" ] && ! grep -q "schema.org" "./yuntu/index.html"; then
  echo "  ⚠️  yuntu/index.html 缺少Schema.org (单独处理)"
fi

echo "  ✅ Schema.org标记检查完成"

# 3. 统计需要添加面包屑的页面
echo ""
echo "🍞 Step 3: 检查面包屑导航..."

missing_breadcrumb=$(find . -name "*.html" -type f -exec grep -L "breadcrumb" {} \; | grep -v "test-" | grep -v "stats.html" | wc -l | tr -d ' ')
echo "  - 缺少面包屑的页面: $missing_breadcrumb"

echo ""
echo "✅ SEO优化脚本执行完成!"
echo ""
echo "📋 下一步手动任务:"
echo "  1. 为 yuntu/index.html 添加Schema.org"
echo "  2. 为剩余页面添加面包屑导航"
echo "  3. 提交sitemap.xml到Google Search Console"
