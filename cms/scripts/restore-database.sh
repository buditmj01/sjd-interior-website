#!/bin/bash

# MySQL Database Restore Script
# Usage: ./scripts/restore-database.sh <backup_file.sql.gz>

set -e

if [ -z "$1" ]; then
  echo "❌ Usage: ./scripts/restore-database.sh <backup_file.sql.gz>"
  echo ""
  echo "Available backups:"
  ls -la "$(dirname "$0")/../backups/"*.sql.gz 2>/dev/null || echo "   No backups found"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Backup file not found: $BACKUP_FILE"
  exit 1
fi

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CMS_DIR="$(dirname "$SCRIPT_DIR")"

# Load environment variables
if [ -f "$CMS_DIR/.env" ]; then
  export $(cat "$CMS_DIR/.env" | grep -v '^#' | grep -v '^$' | xargs)
fi

# Set defaults if not in env
DB_HOST="${DATABASE_HOST:-localhost}"
DB_PORT="${DATABASE_PORT:-3306}"
DB_NAME="${DATABASE_NAME:-sjd_dev}"
DB_USER="${DATABASE_USERNAME:-sjd_user}"
DB_PASS="${DATABASE_PASSWORD:-}"

echo "⚠️  WARNING: This will OVERWRITE database: $DB_NAME"
echo "   Host: $DB_HOST:$DB_PORT"
echo "   File: $BACKUP_FILE"
read -p "Continue? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Restore cancelled"
  exit 1
fi

echo "📦 Restoring database from: $BACKUP_FILE"

# Decompress and restore
gunzip -c "$BACKUP_FILE" | mysql \
  --host="$DB_HOST" \
  --port="$DB_PORT" \
  --user="$DB_USER" \
  --password="$DB_PASS" \
  2>/dev/null

echo "✅ Database restored successfully"
