# Database Setup Script for Windows
# This script helps set up the PostgreSQL database for QA Dashboard

Write-Host "QA Dashboard - Database Setup" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Check if PostgreSQL is installed
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue

if (-not $psqlPath) {
    Write-Host "ERROR: PostgreSQL is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install PostgreSQL from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

Write-Host "PostgreSQL found: $($psqlPath.Source)" -ForegroundColor Green
Write-Host ""

# Get database credentials
$dbUser = Read-Host "Enter PostgreSQL username (default: postgres)"
if ([string]::IsNullOrWhiteSpace($dbUser)) {
    $dbUser = "postgres"
}

$dbPassword = Read-Host "Enter PostgreSQL password" -AsSecureString
$dbPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
)

$dbName = "qa_dashboard"

Write-Host ""
Write-Host "Creating database '$dbName'..." -ForegroundColor Cyan

# Set password environment variable for psql
$env:PGPASSWORD = $dbPasswordPlain

# Create database
$createDbResult = psql -U $dbUser -c "CREATE DATABASE $dbName;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database created successfully!" -ForegroundColor Green
} else {
    if ($createDbResult -match "already exists") {
        Write-Host "Database already exists, continuing..." -ForegroundColor Yellow
    } else {
        Write-Host "ERROR: Failed to create database" -ForegroundColor Red
        Write-Host $createDbResult -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Running schema migration..." -ForegroundColor Cyan

# Run schema
$schemaResult = psql -U $dbUser -d $dbName -f "db\schema.sql" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Schema created successfully!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Failed to create schema" -ForegroundColor Red
    Write-Host $schemaResult -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Seeding database with sample data..." -ForegroundColor Cyan

# Run seed
$seedResult = psql -U $dbUser -d $dbName -f "db\seed.sql" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database seeded successfully!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Failed to seed database" -ForegroundColor Red
    Write-Host $seedResult -ForegroundColor Red
    exit 1
}

# Update .env file
Write-Host ""
Write-Host "Updating .env file..." -ForegroundColor Cyan

$envContent = @"
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=$dbName
DB_USER=$dbUser
DB_PASSWORD=$dbPasswordPlain

# Server Configuration
PORT=5000
NODE_ENV=development
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host ".env file updated!" -ForegroundColor Green

# Clear password from environment
$env:PGPASSWORD = $null

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "Database setup completed successfully!" -ForegroundColor Green
Write-Host "You can now start the backend server with: npm start" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Green
