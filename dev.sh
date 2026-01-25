#!/bin/bash

# SJD Interior Design - Development Automation Script
# This script automates the setup and running of the full stack

set -e

echo "SJD Interior Design - Full Stack Automation"
echo "============================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    print_status "Docker is running"
}

# Generate random secrets
generate_secrets() {
    openssl rand -base64 32 2>/dev/null || cat /dev/urandom | head -c 32 | base64
}

# Setup environment
setup_environment() {
    print_status "Setting up environment..."
    
    # Create frontend .env file if it doesn't exist
    if [ ! -f "frontend/.env" ]; then
        cat > frontend/.env << EOF
# Frontend Environment Variables
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRAPI_TOKEN=
EOF
        print_status "Created frontend .env file"
    fi
    
    # Create CMS .env file if it doesn't exist
    if [ ! -f "cms/.env" ]; then
        cat > cms/.env << EOF
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=$(generate_secrets),$(generate_secrets)
API_TOKEN_SALT=$(generate_secrets)
ADMIN_JWT_SECRET=$(generate_secrets)
TRANSFER_TOKEN_SALT=$(generate_secrets)
JWT_SECRET=$(generate_secrets)

# Database (SQLite for local development)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
EOF
        print_status "Created CMS .env file with generated secrets"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Frontend dependencies
    print_status "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
    
    # CMS dependencies
    if [ -d "cms" ]; then
        print_status "Installing CMS dependencies..."
        cd cms && npm install && cd ..
    fi
}

# Start CMS with Docker (PostgreSQL)
start_cms_docker() {
    print_status "Starting Strapi CMS with Docker..."
    check_docker
    docker-compose up -d postgres strapi
    
    print_status "Waiting for Strapi to be ready..."
    until curl -sf http://localhost:1337/_health > /dev/null 2>&1; do
        echo -n "."
        sleep 2
    done
    echo ""
    print_status "Strapi CMS is ready"
}

# Start CMS locally (SQLite)
start_cms_local() {
    print_status "Starting Strapi CMS locally..."
    cd cms
    npm run develop &
    CMS_PID=$!
    cd ..
    echo $CMS_PID > .cms.pid
    
    print_status "Waiting for Strapi to be ready..."
    until curl -sf http://localhost:1337/_health > /dev/null 2>&1; do
        echo -n "."
        sleep 2
    done
    echo ""
    print_status "Strapi CMS started with PID: $CMS_PID"
}

# Start frontend in development mode
start_frontend() {
    print_status "Starting frontend in development mode..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    echo $FRONTEND_PID > .frontend.pid
    print_status "Frontend started with PID: $FRONTEND_PID"
}

# Main function
main() {
    case "${1:-help}" in
        "setup")
            print_status "Running full setup..."
            setup_environment
            install_dependencies
            print_status "Setup complete!"
            echo ""
            echo "Next steps:"
            echo "  ./dev.sh cms      - Start Strapi CMS (SQLite)"
            echo "  ./dev.sh start    - Start both CMS and Frontend"
            echo "  ./dev.sh docker   - Start with Docker (PostgreSQL)"
            ;;
        "cms")
            print_status "Starting CMS only..."
            start_cms_local
            print_status "CMS started!"
            echo ""
            echo "Strapi Admin: http://localhost:1337/admin"
            echo "Strapi API:   http://localhost:1337/api"
            ;;
        "frontend")
            print_status "Starting frontend only..."
            start_frontend
            print_status "Frontend started!"
            echo ""
            echo "Frontend: http://localhost:4321"
            ;;
        "start")
            print_status "Starting full stack..."
            start_cms_local
            sleep 2
            start_frontend
            print_status "Full stack started!"
            echo ""
            echo "Frontend:     http://localhost:4321"
            echo "Strapi Admin: http://localhost:1337/admin"
            ;;
        "docker")
            print_status "Starting with Docker..."
            check_docker
            docker-compose up -d
            print_status "Docker services started!"
            echo ""
            echo "Strapi Admin: http://localhost:1337/admin"
            echo "Strapi API:   http://localhost:1337/api"
            echo ""
            echo "Run 'cd frontend && npm run dev' for frontend"
            ;;
        "stop")
            print_status "Stopping all services..."
            docker-compose down 2>/dev/null || true
            if [ -f ".frontend.pid" ]; then
                kill $(cat .frontend.pid) 2>/dev/null || true
                rm .frontend.pid
            fi
            if [ -f ".cms.pid" ]; then
                kill $(cat .cms.pid) 2>/dev/null || true
                rm .cms.pid
            fi
            print_status "All services stopped"
            ;;
        "restart")
            print_status "Restarting all services..."
            $0 stop
            sleep 2
            $0 start
            ;;
        "logs")
            print_status "Showing Docker logs..."
            docker-compose logs -f
            ;;
        "status")
            print_status "Checking service status..."
            echo ""
            echo "Docker services:"
            docker-compose ps 2>/dev/null || echo "  No Docker services running"
            echo ""
            echo "Local processes:"
            if [ -f ".frontend.pid" ]; then
                echo "  Frontend PID: $(cat .frontend.pid)"
            fi
            if [ -f ".cms.pid" ]; then
                echo "  CMS PID: $(cat .cms.pid)"
            fi
            ;;
        *)
            echo "SJD Interior Design - Development Script"
            echo ""
            echo "Usage: $0 <command>"
            echo ""
            echo "Commands:"
            echo "  setup     - Install all dependencies and create env files"
            echo "  cms       - Start Strapi CMS only (SQLite)"
            echo "  frontend  - Start frontend only"
            echo "  start     - Start both CMS and frontend locally"
            echo "  docker    - Start CMS with Docker (PostgreSQL)"
            echo "  stop      - Stop all services"
            echo "  restart   - Restart all services"
            echo "  logs      - Show Docker logs"
            echo "  status    - Check service status"
            echo ""
            echo "Quick Start:"
            echo "  1. ./dev.sh setup"
            echo "  2. ./dev.sh start"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
