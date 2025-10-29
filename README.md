# POS License Management System

A Next.js application for managing POS (Point of Sale) application licenses with user authentication and admin panel.

## Features

- **Google OAuth Authentication**: Users can sign in using their Google account
- **Email/Password Authentication**: Traditional login for admin users
- **JWT Token-based Authentication**: Secure token management for mobile apps
- **Admin Panel**: Comprehensive user and license management interface
- **Role-based Access Control**: USER and ADMIN roles
- **License Expiration Management**: Set and track license expiration dates
- **PostgreSQL Database**: Using Supabase for data persistence

## Setup

### 1. Environment Variables

Update the `.env` file with your actual credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database (get these from Supabase dashboard)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
GOOGLE_CLIENT_ID="your-google-client-id"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-change-in-production"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Database Migrations

The migration has already been applied to create the users table.

### 4. Create Admin User

To create an initial admin user, run:

```bash
npx tsx scripts/seed.ts
```

Default admin credentials:
- Email: `admin@example.com`
- Password: `admin123`

**Important**: Change the password after first login!

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## API Endpoints

### Authentication

#### POST /api/auth/google
Authenticate with Google ID token from mobile app.

**Request:**
```json
{
  "idToken": "google_id_token_from_mobile"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "USER",
    "expireDate": "2024-12-31T00:00:00.000Z",
    "isActive": true
  }
}
```

#### POST /api/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": { ... }
}
```

#### GET /api/auth/verify
Verify JWT token and get user data.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "USER",
    "expireDate": "2024-12-31T00:00:00.000Z",
    "isActive": true,
    "isExpired": false
  }
}
```

### Admin Endpoints

#### GET /api/admin/users
Get all users (Admin only).

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Response:**
```json
{
  "success": true,
  "users": [...]
}
```

#### PATCH /api/admin/users/[id]
Update user details (Admin only).

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Request:**
```json
{
  "name": "Updated Name",
  "role": "USER",
  "expireDate": "2024-12-31",
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "user": { ... }
}
```

## Mobile App Integration Flow

1. **User authenticates with Google** on mobile app
2. **Mobile app sends Google ID token** to `/api/auth/google`
3. **Backend verifies token** and returns JWT + user data with expiry date
4. **Mobile app stores** JWT token and expiry date locally
5. **Mobile app checks expiry date** locally before allowing access
6. **Periodically verify token** with `/api/auth/verify` to check if account is still active

## Admin Panel

Access the admin panel at `/admin` after logging in with admin credentials.

Features:
- View all users
- Edit user details
- Change user roles
- Set license expiration dates
- Activate/deactivate accounts

## Technology Stack

- **Next.js 13**: React framework with App Router
- **TypeScript**: Type-safe development
- **Prisma**: Database ORM
- **Supabase**: PostgreSQL database and authentication
- **shadcn/ui**: UI component library
- **Tailwind CSS**: Styling
- **Google Auth Library**: Google OAuth verification
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing

## Security Features

- Row Level Security (RLS) on database tables
- JWT token authentication
- Password hashing with bcrypt
- Google OAuth verification
- Role-based access control
- Secure API routes with middleware

## License

This project is for license management of POS applications.
