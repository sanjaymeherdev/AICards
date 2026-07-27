# Multi-User Authentication Setup

This app now supports multi-user authentication with email/password and one account per IP address.

## Features

- **Email/Password Authentication**: Users can sign up and login with email and password
- **One Account Per IP**: Each IP address can only create one account (enforced at database level)
- **JWT Tokens**: Secure session management with 7-day token expiration
- **Rate Limiting**: Auth endpoints are rate-limited to prevent brute force attacks (10 requests per 15 minutes)
- **Password Hashing**: Passwords are hashed with bcrypt (12 salt rounds)
- **Protected Routes**: Card CRUD operations require authentication

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Create new account | No |
| POST | `/api/auth/login` | Login with email/password | No |
| GET | `/api/auth/me` | Get current user info | Yes |

### Cards (Protected)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cards` | List all user's cards | Yes |
| GET | `/api/cards/:slug` | Get specific card | Yes |
| POST | `/api/cards` | Create/update card | Yes |
| PUT | `/api/cards/:slug` | Update card | Yes |
| DELETE | `/api/cards/:slug` | Delete card | Yes |

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string (Railway provides this automatically)
- `JWT_SECRET`: Secret key for JWT tokens (change in production!)
- `PORT`: Server port (default: 3000)

Example for local development:
```bash
export DATABASE_URL="postgresql://user:pass@localhost:5432/wedding_cards"
export JWT_SECRET="your-super-secret-key-change-in-production"
export PORT=3000
```

### 3. Run Database Migrations

Create the required tables by running:

```bash
node scripts/migrate.js
```

This creates:
- `users` table (with unique email and IP constraints)
- `cards` table (linked to users)
- `ai_designs` table (existing)

### 4. Start the Server

```bash
npm start
```

### 5. Access the Auth Page

Navigate to `http://localhost:3000/auth` to access the login/signup page.

## Usage Examples

### Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepass123"}'
```

Response:
```json
{
  "message": "Account created successfully",
  "user": { "id": 1, "email": "user@example.com", "createdAt": "..." },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepass123"}'
```

### Create a Card (Authenticated)

```bash
curl -X POST http://localhost:3000/api/cards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"slug": "john-jane", "template_id": "template-1", "status": "draft"}'
```

### List Your Cards

```bash
curl -X GET http://localhost:3000/api/cards \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## One Account Per IP

The system enforces one account per IP address using PostgreSQL's `inet` type with a UNIQUE constraint. When signing up:

1. The server extracts the client IP from the request (handles X-Forwarded-For for proxies)
2. Checks if an account already exists for that IP
3. If yes, returns error: "An account already exists for this IP address. Only one account per IP is allowed."
4. If no, creates the account with the IP stored

**Note**: Behind NAT/proxies (like Railway), multiple users may share the same external IP. This is intentional for the one-account-per-IP requirement but be aware of this limitation.

## Security Considerations

1. **Change JWT_SECRET in production** - Use a strong, random secret
2. **HTTPS** - Always use HTTPS in production to protect credentials
3. **Rate limiting** - Auth endpoints are limited to 10 requests per 15 minutes
4. **Password requirements** - Minimum 6 characters (consider increasing)
5. **Token expiration** - Tokens expire after 7 days

## Frontend Integration

The auth page (`/auth.html`) demonstrates how to:
- Handle signup/login forms
- Store JWT tokens in localStorage
- Include tokens in API requests via Authorization header
- Check authentication status
- Logout

Example frontend code for authenticated requests:

```javascript
const token = localStorage.getItem('authToken');

fetch('/api/cards', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

## Database Schema

```sql
-- Users table with one account per IP
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  ip_address    INET NOT NULL UNIQUE,  -- Enforces one account per IP
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Cards table linked to users
CREATE TABLE cards (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slug        TEXT NOT NULL,
  template_id TEXT NOT NULL,
  status      TEXT DEFAULT 'draft',
  data        JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, slug)
);
```
