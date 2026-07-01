#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"

if gh repo view StsZu/windows-cli-course &>/dev/null; then
  git remote add origin git@github.com:StsZu/windows-cli-course.git 2>/dev/null || \
    git remote set-url origin git@github.com:StsZu/windows-cli-course.git
fi

gh api repos/StsZu/windows-cli-course/pages -X POST --input - <<'EOF' 2>/dev/null || \
gh api repos/StsZu/windows-cli-course/pages -X PUT --input - <<'EOF'
{
  "build_type": "legacy",
  "source": { "branch": "main", "path": "/" }
}
EOF

echo "Waiting for Pages build..."
for i in $(seq 1 24); do
  STATUS=$(gh api repos/StsZu/windows-cli-course/pages --jq '.status' 2>/dev/null || echo "unknown")
  CODE=$(curl -sI "https://stszu.github.io/windows-cli-course/index.html" | head -1)
  echo "  [$i] status=$STATUS $CODE"
  if [[ "$STATUS" == "built" ]] && echo "$CODE" | grep -q "200"; then
    echo "Done: https://stszu.github.io/windows-cli-course/"
    exit 0
  fi
  sleep 5
done
