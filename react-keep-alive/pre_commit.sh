#!/bin/bash
RED="\033[0;31m"
YELLOW="\033[0;33m"
NC="\033[0m"
# validate ignorecase
ignorecase="$(git config core.ignorecase)"
if [ "$ignorecase" == "true" ]
then
  echo -e "💀 $RED git 不能设置忽略大下写，输入 >>> git config core.ignorecase false <<<修复这个问题 $NC"
  exit 1
fi
