# Quick Start Guide - QA Dashboard Backend

## 🚀 Quick Setup (5 minutes)

### Step 1: Install PostgreSQL

**Windows:** Download from https://www.postgresql.org/download/windows/
- Default user: `postgres`
- Default port: `5432`
- Remember your password!

### Step 2: Setup Database (Automated)

```powershell
cd server
.\setup-db.ps1
```

Enter your PostgreSQL password when prompted. The script will:
- Create the `qa_dashboard` database
- Run schema migration
- Seed with sample data
- Update your `.env` file

### Step 3: Start the Backend

```bash
cd server
npm start
```

You should see:
```
Server is running on port 5000
Health check: http://localhost:5000/health
API base URL: http://localhost:5000/api
```

### Step 4: Test the Backend

Open a browser and visit:
- http://localhost:5000/health - Should show `{"status":"ok","database":"connected"}`
- http://localhost:5000/api/overview - Should show dashboard metrics

### Step 5: Start the Frontend

In a new terminal:
```bash
npm run dev
```

Visit http://localhost:5173 to see the dashboard.

---

## 📝 Manual Database Setup (Alternative)

If the automated script doesn't work:

```bash
# 1. Create database
psql -U postgres -c "CREATE DATABASE qa_dashboard;"

# 2. Run schema
psql -U postgres -d qa_dashboard -f server/db/schema.sql

# 3. Seed data
psql -U postgres -d qa_dashboard -f server/db/seed.sql

# 4. Update server/.env with your password
```

---

## 🧪 Running Tests

```bash
cd server
npm test                 # Run all tests
npm run test:coverage    # Run with coverage report
```

Expected: 30 tests passing

---

## 🔧 Troubleshooting

### "Database disconnected" error

1. Check PostgreSQL is running:
   - Windows: Open Services, look for "postgresql"
   - Run: `psql -U postgres -l` to list databases

2. Verify credentials in `server/.env`

3. Test connection: `psql -U postgres -d qa_dashboard`

### Port 5000 already in use

Change port in `server/.env`:
```env
PORT=5001
```

And update `vite.config.js` proxy target to match.

### Frontend not loading data

1. Ensure backend is running on port 5000
2. Check browser console for errors
3. Verify proxy in `vite.config.js` is configured
4. Components still need to be updated to use API service (see walkthrough.md)

---

## 📚 Documentation

- [README.md](../README.md) - Complete setup guide
- [API.md](./API.md) - API endpoint documentation
- [walkthrough.md](../../../.gemini/antigravity/brain/e9f33dd4-4d40-4984-bc75-9025dc5b6377/walkthrough.md) - Implementation details

---

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `qa_dashboard` created
- [ ] Schema and seed data loaded
- [ ] Backend server starts without errors
- [ ] Health check returns "ok"
- [ ] API endpoints return data
- [ ] All tests pass (30/30)
- [ ] Frontend components updated to use API service
- [ ] Frontend loads data from backend

---

## 🎯 Next Steps

The backend is complete! To finish the integration:

1. **Update Frontend Components** - Replace mock data imports with API service
2. **Add Loading States** - Show spinners while data loads
3. **Add Error Handling** - Display errors gracefully
4. **Test End-to-End** - Verify all features work with real data

See [walkthrough.md](../../../.gemini/antigravity/brain/e9f33dd4-4d40-4984-bc75-9025dc5b6377/walkthrough.md) for detailed next steps.
