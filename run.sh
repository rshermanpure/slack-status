#!/bin/bash

export $(xargs < .env)

if [ ! -x $NODE_PATH ] || [ ! -x $NPX_PATH ]; then
  echo "Error: Node.js or npx not found at specified paths."
  exit 1
fi

NODE_DIR=$(dirname "$NODE_PATH")
NPX_DIR=$(dirname "$NPX_PATH")

export PATH="$NODE_DIR:$NPX_DIR:$PATH"

SLACK_URL=$SLACK_URL SLACK_TITLE=$SLACK_TITLE $NPX_PATH playwright test tests/set-status.spec.ts