# Event Check-in System Guide

## 🎯 Overview

Members can now view upcoming events and check in by entering an access code provided by officers. This system ensures accurate attendance tracking.

### Flow:
1. **Officer creates event** with title, date, location, and access code
2. **Member views event** on `/events/upcoming` page
3. **Member clicks "Check In"** and enters the access code
4. **Attendance is recorded** and member sees confirmation
5. **Officer can view** member attendance on the officer dashboard

## 🔧 Setup & Database Migration

### 1. Update Prisma Schema

The schema has been updated to add fields to the `Event` model:
- `description` - Event details
- `location` - Event venue or Zoom link
- `accessCode` - Unique code for check-in (unique constraint)

### 2. Run Migration

```bash
npm run prisma:migrate
```

When prompted for a migration name, enter something like: `add_event_fields_and_access_codes`

This will:
- Add the new fields to the `events` table
- Create a unique index on `accessCode`

### 3. Seed Test Data

```bash
npm run prisma:seed
```

This creates:
- **3 test events** with access codes
- **4 test members** with varying attendance

## 📋 Pages & Features

### For Members

#### **`/member` - Member Dashboard**
- Shows user info and name
- Link to "View Upcoming Events"

#### **`/events/upcoming` - Event Check-in Page**
- Shows all upcoming events in card format
- Each card displays:
  - Event title
  - Date and time
  - Location
  - Description
- Members can:
  - Click "Check In" button
  - Enter the access code
  - See confirmation when successful
  - See which events they've already checked in to

**Features:**
- ✓ Real-time validation of access code
- ✓ Prevention of duplicate check-ins
- ✓ Error messages for invalid codes
- ✓ Visual feedback (success/error states)

### For Officers

#### **`/officer` - Officer Dashboard**
- View member attendance stats (total, active, inactive)
- See member list with attendance counts
- Filter members by status
- Link to "Manage Events"

#### **`/officer/events` - Event Management**
- Create new events with:
  - Title (required)
  - Date & time
  - Location
  - Description
  - Access code (can be auto-generated)
- View all events
- Delete events
- See access codes at a glance

**Features:**
- ✓ Auto-generate random access codes
- ✓ Full event CRUD operations
- ✓ Upcoming & past events view

## 📡 API Endpoints

### Member Check-in

```
POST /api/events/check-in
```

**Request:**
```json
{
  "eventId": "xxx",
  "accessCode": "HLK2026"
}
```

**Response (Success):**
```json
{
  "message": "Check-in successful!",
  "attendance": { ... }
}
```

**Response (Error):**
```json
{
  "error": "Invalid access code"
}
```

### Get Upcoming Events

```
GET /api/events/upcoming
```

**Response:**
```json
[
  {
    "id": "xxx",
    "title": "General Meeting #1",
    "description": "...",
    "date": "2026-01-25T18:00:00Z",
    "location": "Warren 2005"
  }
]
```

**Note:** Access codes are NOT returned to members for security

### Officer: Get All Events

```
GET /api/events/all
```

**Response:**
```json
[
  {
    "id": "xxx",
    "title": "General Meeting #1",
    "date": "2026-01-25T18:00:00Z",
    "accessCode": "HLK2026",
    ...
  }
]
```

### Officer: Create Event

```
POST /api/events
```

**Request:**
```json
{
  "title": "General Meeting #1",
  "description": "Welcome to HealthLink!",
  "date": "2026-01-25T18:00:00Z",
  "location": "Warren 2005",
  "accessCode": "HLK2026"
}
```

### Officer: Delete Event

```
DELETE /api/events/{eventId}
```

## 🧪 Test Workflow

### Step 1: Create an Event (as Officer)

1. Go to `/officer/events`
2. Click "Create New Event"
3. Fill in:
   - Title: "Test Event"
   - Date: (tomorrow)
   - Time: 18:00
   - Location: "Room 123"
   - Access Code: Click "Generate" to auto-create
4. Click "Create Event"

### Step 2: Check In (as Member)

1. Go to `/events/upcoming`
2. Find your event in the list
3. Click "Check In"
4. Enter the access code from the event card
5. Click "Check In" button
6. See ✓ Checked In confirmation

### Step 3: Verify Attendance (as Officer)

1. Go to `/officer`
2. See your member name with updated attendance count
3. Status should show as "Active" (if they now have ≥2 attendances)

## 🔐 Security Notes

- ✓ Access codes are unique per event
- ✓ Access codes are NOT sent to members via the API (only shown to officers)
- ✓ Members cannot check in twice to the same event
- ✓ Members can only see upcoming events (not past)
- ✓ Officers can see all events including access codes

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| Events not showing | Run `npm run prisma:seed` to populate test data |
| Can't check in with correct code | Make sure you're using exact code from officer page; codes are case-sensitive |
| Duplicate check-in error | You've already checked in to this event - each member can only check in once per event |
| Access code "already exists" error | Use a unique access code; generate a new one if needed |
| Events showing as past | Make sure your system date is correct; events in the past won't show |

## 📝 Next Steps

1. **Add email notifications**
   - Send email when member becomes active
   - Remind members of upcoming events

2. **Attendance export**
   - Export attendance reports for officers
   - Generate attendance certificates

3. **QR code check-in**
   - Generate QR codes for quick check-in
   - Scan instead of typing access code

4. **Event calendar**
   - Show events in calendar view
   - Add to personal calendar

5. **Recurring events**
   - Create recurring meetings
   - Auto-generate new check-in codes

## 📚 Database Schema

```prisma
model Event {
  id          String     @id @default(cuid())
  title       String
  description String?
  date        DateTime
  location    String?
  accessCode  String?    @unique
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  attendances Attendance[]
}
```

## 🎨 UI/UX Features

- **Event Cards**: Clean, modern card layout with gradient headers
- **Color Coding**: 
  - Green for checked in ✓
  - Blue for available to check in
  - Orange/red for errors
- **Loading States**: Disabled buttons during submission
- **Responsive**: Works on mobile, tablet, and desktop
- **Dark Theme**: Matches HealthLink aesthetic
