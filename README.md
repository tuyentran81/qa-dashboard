# QA Dashboard

A comprehensive QA Dashboard application for tracking test cases, executions, and analytics.

## Tech Stack

### Frontend
- **React** 19.2.0 with Vite
- **Recharts** for data visualization
- **Lucide React** for icons
- **XLSX** for Excel export functionality

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Jest** and Supertest for testing

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** (v14 or higher)

### Installing PostgreSQL

#### Windows
1. Download PostgreSQL from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Default port is `5432`

#### macOS
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Database Setup

1. **Create the database:**

   Open PostgreSQL command line (psql) or use a GUI tool like pgAdmin:

   ```bash
   # Windows: Use SQL Shell (psql) from Start Menu
   # macOS/Linux: Run in terminal
   psql -U postgres
   ```

   Then run:
   ```sql
   CREATE DATABASE qa_dashboard;
   ```

2. **Run the schema migration:**

   ```bash
   # Windows
   psql -U postgres -d qa_dashboard -f server\db\schema.sql

   # macOS/Linux
   psql -U postgres -d qa_dashboard -f server/db/schema.sql
   ```

3. **Seed the database with sample data:**

   ```bash
   # Windows
   psql -U postgres -d qa_dashboard -f server\db\seed.sql

   # macOS/Linux
   psql -U postgres -d qa_dashboard -f server/db/seed.sql
   ```

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd qa-dashboard
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables:**

   The backend uses environment variables for database connection. A `.env` file has been created in the `server` directory with default values:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=qa_dashboard
   DB_USER=postgres
   DB_PASSWORD=postgres
   PORT=5000
   NODE_ENV=development
   ```

   **Important:** If you used a different password during PostgreSQL installation, update `DB_PASSWORD` in `server/.env`.

## Running the Application

You need to run both the backend and frontend servers.

### Option 1: Run in Separate Terminals

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```
The backend will run on `http://localhost:5000`

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

### Option 2: Development Mode with Auto-Reload

**Backend (with auto-reload):**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
npm run dev
```

## Testing

### Frontend Tests
```bash
npm test
```

### Backend Tests
```bash
cd server
npm test
```

### Backend Test Coverage
```bash
cd server
npm run test:coverage
```

## API Documentation

See [server/API.md](server/API.md) for complete API documentation.

## Project Structure

```
qa-dashboard/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── pages/          # Page components
│   │   └── widgets/        # Dashboard widgets
│   ├── data/               # Mock data (legacy)
│   ├── services/           # API service layer
│   └── utils/              # Utility functions
├── server/                  # Backend source code
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── routes/             # API routes
│   ├── db/                 # Database scripts
│   │   ├── schema.sql     # Database schema
│   │   ├── seed.sql       # Sample data
│   │   └── connection.js  # DB connection pool
│   └── tests/              # Backend tests
├── public/                  # Static assets
└── dist/                    # Production build
```

## Features

- **Dashboard Overview**: Total test cases, automation vs manual ratio, pass rates
- **Test Case Management**: Browse, filter, and export test cases
- **Analytics**: Build trends, environment statistics, failure distribution
- **Execution Tracking**: Test execution history and results
- **Export to Excel**: Export test data to Excel files

## Development

### Linting
```bash
npm run lint
```

### Building for Production

**Frontend:**
```bash
npm run build
npm run preview
```

**Backend:**
The backend runs directly with Node.js. For production deployment, consider using PM2 or similar process managers.

## Troubleshooting

### Database Connection Issues

If you see "database disconnected" errors:

1. Verify PostgreSQL is running:
   ```bash
   # Windows
   services.msc  # Look for "postgresql" service
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Check database credentials in `server/.env`

3. Test connection manually:
   ```bash
   psql -U postgres -d qa_dashboard
   ```

### Port Already in Use

If port 5000 or 5173 is already in use:

1. Change backend port in `server/.env`:
   ```env
   PORT=5001
   ```

2. Update proxy in `vite.config.js`:
   ```javascript
   proxy: {
     '/api': {
       target: 'http://localhost:5001',
       ...
     }
   }
   ```

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Submit a pull request

## License

ISC
