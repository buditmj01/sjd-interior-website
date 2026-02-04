#!/bin/bash

# MySQL Database Backup Script
# Usage: ./scripts/backup-database.sh

set -e

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

# Backup directory
BACKUP_DIR="$CMS_DIR/backups"
mkdir -p "$BACKUP_DIR"

# Filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_backup_$TIMESTAMP.sql"

echo "📦 Backing up database: $DB_NAME"
echo "   Host: $DB_HOST:$DB_PORT"
echo "   User: $DB_USER"

# Dump database
mysqldump \
  --host="$DB_HOST" \
  --port="$DB_PORT" \
  --user="$DB_USER" \
  --password="$DB_PASS" \
  --single-transaction \
  --routines \
  --triggers \
  --databases "$DB_NAME" \
  > "$BACKUP_FILE" 2>/dev/null

# Compress
gzip "$BACKUP_FILE"

echo "✅ Backup completed: ${BACKUP_FILE}.gz"
echo "   Size: $(du -h "${BACKUP_FILE}.gz" | cut -f1)"

# Keep only last 7 backups
find "$BACKUP_DIR" -name "*_backup_*.sql.gz" -mtime +7 -delete 2>/dev/null || true

echo "🗑️  Old backups cleaned (kept last 7 days)"
