#!/bin/bash

# IndexNow 提交脚本 - 通知 Bing/Microsoft 收录新页面
# 使用方法：bash indexnow-submit.sh

# 配置
HOST="yongjichang.com"
KEY="e3f8c9a1b2d4e5f6a7b8c9d0e1f2a3b4"  # 请替换为你的 IndexNow key
KEY_LOCATION="https://${HOST}/${KEY}.txt"

# 要提交的 URL 列表
URLS=(
  "https://${HOST}/rankings"
  "https://${HOST}/"
)

# IndexNow API 端点（Bing）
API_ENDPOINT="https://api.indexnow.org/indexnow"

# 构建 JSON payload
JSON_PAYLOAD=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": [
$(printf '    "%s"' "${URLS[0]}")
$(for url in "${URLS[@]:1}"; do printf ',\n    "%s"' "$url"; done)
  ]
}
EOF
)

echo "📤 正在提交 IndexNow 请求..."
echo ""
echo "提交的 URL:"
for url in "${URLS[@]}"; do
  echo "  - $url"
done
echo ""

# 发送请求
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$JSON_PAYLOAD" \
  "$API_ENDPOINT")

# 解析响应
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "HTTP 状态码: $HTTP_CODE"
echo ""

# 判断结果
case $HTTP_CODE in
  200)
    echo "✅ 提交成功！搜索引擎已收到通知"
    echo "Bing 通常会在 24-48 小时内爬取这些页面"
    ;;
  202)
    echo "✅ 提交成功！请求已接受"
    ;;
  400)
    echo "❌ 请求格式错误"
    echo "$BODY"
    ;;
  403)
    echo "❌ 密钥验证失败"
    echo "请检查 IndexNow key 是否正确，以及 ${KEY_LOCATION} 是否可访问"
    ;;
  422)
    echo "❌ URL 格式错误"
    echo "$BODY"
    ;;
  429)
    echo "⚠️  请求过于频繁，请稍后再试"
    ;;
  *)
    echo "⚠️  未知响应: $HTTP_CODE"
    echo "$BODY"
    ;;
esac

echo ""
echo "💡 提示："
echo "1. 确保 https://${HOST}/${KEY}.txt 文件存在且包含你的 IndexNow key"
echo "2. IndexNow 不保证立即收录，通常需要 1-7 天"
echo "3. 可以在 Bing Webmaster Tools 查看收录状态"
