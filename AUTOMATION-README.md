# SJD Interior Design - Automation Setup

## 🚀 Full Stack Automation

This project now includes automated workflows for seamless updates across Frontend (Astro), Backend (Strapi CMS), and API connections.

## Quick Start

### 1. Initial Setup
```bash
npm run setup
```

### 2. Start Development
```bash
npm run dev
```

### 3. Stop Services
```bash
npm run stop
```

## What's Automated

### ✅ **Strapi CMS Setup**
- PostgreSQL database connection
- Environment configuration
- API endpoints ready

### ✅ **Frontend API Connection**
- Strapi API integration
- Environment-based configuration
- Media handling utilities

### ✅ **GitHub Actions CI/CD**
- Automatic builds on code changes
- Deployment to staging/production
- Health checks and notifications

### ✅ **Local Development Scripts**
- One-command setup
- Service orchestration
- Status monitoring

## Environment Variables

Create these in your repository secrets:

- `STRAPI_URL` - Your Strapi CMS URL
- `STRAPI_TOKEN` - API token for authentication
- `SLACK_WEBHOOK` - For deployment notifications

## Service URLs

- **Frontend**: http://localhost:4321
- **Strapi CMS**: http://localhost:1337
- **Database**: localhost:5432

## Workflow Triggers

The automation triggers when you update:
- Frontend code (`frontend/**`)
- CMS code (`cms/**`)
- Docker configuration (`docker-compose.yml`)

## Development Commands

```bash
# Full setup (first time only)
npm run setup

# Start all services
npm run dev

# Restart services
npm run restart

# View logs
npm run logs

# Check status
npm run status

# Stop everything
npm run stop
```

## Production Deployment

When you push to `main` branch, the automation will:
1. Build frontend and CMS
2. Deploy to production
3. Run health checks
4. Send notifications

## Staging Deployment

When you push to `develop` branch, the automation will:
1. Build frontend and CMS  
2. Deploy to staging
3. Run health checks
4. Send notifications

Your full stack automation is now ready! 🎉