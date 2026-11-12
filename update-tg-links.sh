#!/bin/bash
# 批量更新所有 HTML 文件中的 TG 频道链接

find . -name "*.html" -type f | while read file; do
  if grep -q 'https://t\.me/"' "$file"; then
    sed -i '' 's|https://t\.me/"|https://t.me/yongjichang"|g' "$file"
    echo "✓ Updated: $file"
  fi
done

echo ""
echo "所有文件已更新完成！"
