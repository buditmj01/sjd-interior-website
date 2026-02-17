#!/bin/bash

# Simple script to trigger frontend rebuild
# Usage: ./rebuild-frontend.sh

echo "🚀 Triggering frontend rebuild..."

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "📦 Install it with: brew install gh"
    echo "🔑 Then authenticate with: gh auth login"
    exit 1
fi

# Trigger the workflow
gh workflow run automation.yml --ref main

if [ $? -eq 0 ]; then
    echo "✅ Frontend rebuild triggered successfully!"
    echo "📊 Check progress at: https://github.com/buditmj01/sjd-interior-website/actions"
    echo "⏱️  Rebuild will complete in ~2-5 minutes"
    echo "🌐 Changes will be live at: https://sjdinterior.com"
else
    echo "❌ Failed to trigger rebuild"
    echo "💡 Try running: gh auth login"
    exit 1
fi
