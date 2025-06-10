#!/bin/bash
cd /home/kavia/workspace/code-generation/travelgenie-ai-61-b6217ca8/travelgenie_ai_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

