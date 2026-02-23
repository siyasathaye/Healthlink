# HealthLink Membership System Setup

## 🚀 Quick Start

### 1. Update Environment Variables

Edit `.env.local` and set your Supabase database password:

```
NEXT_PUBLIC_SUPABASE_URL=https://eltdnueqrfiwiynhjoes.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsdGRudWVxcmZpd2l5bmhqb2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyMDgzMzAsImV4cCI6MjA4Mjc4NDMzMH0.rzYQ54ylCZW4JnWdASfMBx054k92vX24-6mTAqquUqs
DATABASE_URL=postgresql://postgres:[YOUR_SUPABASE_PASSWORD]@db.eltdnueqrfiwiynhjoes.supabase.co:5432/postgres
```

**To get your Supabase password:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Database**
4. Copy the **Password** (or reset it if needed)

### 2. Run Database Migrations

```bash
npm run prisma:migrate
```

This will:
- Create the database schema (User, Event, Attendance tables)
- Generate the Prisma client

### 3. Seed Test Data

```bash
npm run prisma:seed
```

This creates:
- **1 Officer**: `officer@healthlink.org` / password: `officerpass`
- **4 Test Members** with various attendance counts
- **3 Test Events**

### 4. Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

## 🔐 Test Accounts

### Officer (can view members)
- Email: `officer@healthlink.org`
- Password: `officerpass`
- Role: OFFICER

### Members
- `member1@ucsd.edu` / `memberpass` (2 events → **Active**)
- `member2@ucsd.edu` / `memberpass` (3 events → **Active**)
- `member3@ucsd.edu` / `memberpass` (1 event → **Inactive**)
- `member4@ucsd.edu` / `memberpass` (0 events → **Inactive**)

## 📋 API Endpoints

### Get all members with attendance status
```
GET /api/members/status
```

Returns:
```json
[
  {
    "id": "xxx",
    "email": "member1@ucsd.edu",
    "name": "Alice Johnson",
    "createdAt": "2026-01-12T...",
    "attendanceCount": 2,
    "active": true
  }
]
```

### Record attendance
```
POST /api/attendance
```

Body:
```json
{
  "userId": "member-id",
  "eventId": "event-id"
}
```

### Get member's attendance
```
GET /api/attendance?userId=member-id
```

## 📄 Pages

- `/` - Home page
- `/login` - Member login (Supabase OTP)
- `/officer` - Officer dashboard (view members and attendance)

## 🗄️ Database Schema

### User
- `id` (String) - Primary key
- `email` (String) - Unique email
- `name` (String) - User's name
- `role` (Enum: MEMBER | OFFICER)
- `createdAt`, `updatedAt` - Timestamps

### Event
- `id` (String) - Primary key
- `title` (String) - Event name
- `date` (DateTime) - Event date
- `createdAt`, `updatedAt` - Timestamps

### Attendance
- `id` (String) - Primary key
- `userId` (String) - Foreign key to User
- `eventId` (String) - Foreign key to Event
- `createdAt` - Timestamp
- **Unique constraint**: One attendance record per user per event

## ✅ Member Active Status

A member is considered **ACTIVE** if they have attended **at least 2 unique events**.

This is computed on the fly when querying `/api/members/status`.

## 📝 Next Steps

1. **Customize the design** - Update the Tailwind CSS styles to match your brand
2. **Add event management** - Create pages to add/edit events (for officers)
3. **Event check-in UI** - Build a check-in interface for officers to mark attendance
4. **Email notifications** - Send notifications when members become active/inactive
5. **Role-based access control** - Add more granular permissions for different officer types
