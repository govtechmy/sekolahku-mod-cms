# sekolahku-mod-cms

A Payload CMS application built with Next.js for managing Sekolahku content. Features server-side authentication with strong session security and password policies.

## Prerequisites

- **Node.js**: `^18.20.2` or `>=20.9.0`
- **pnpm**: `^9` or `^10`
- **MongoDB**: For data persistence (local or remote URI)

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure the following variables:

| Variable                           | Description                   | Example                         |
| ---------------------------------- | ----------------------------- | ------------------------------- |
| `DATABASE_URI`                     | MongoDB connection string     | `mongodb://127.0.0.1/sekolahku` |
| `PAYLOAD_SECRET`                   | Secret key for Payload CMS    | Generate a secure random string |
| `PAYLOAD_API_KEY`                  | API key for external requests | Generate a secure random string |
| `SERVICE_USER_EMAIL`               | Email for service account     | `service@example.com`           |
| `PAYLOAD_TOKEN_EXPIRATION_SECONDS` | Session timeout (seconds)     | `3600` (default: 60 minutes)    |
| `PAYLOAD_LOGOUT_ON_CLOSE`          | Logout on browser close       | `false` (best-effort only)      |

### 3. Run Development Server

```bash
pnpm dev
```

Access the admin panel at `http://localhost:3000/admin`

## Available Scripts

| Script                    | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| `pnpm dev`                | Start development server with hot reload       |
| `pnpm devsafe`            | Clean build cache and start development server |
| `pnpm build`              | Build for production                           |
| `pnpm start`              | Start production server                        |
| `pnpm lint`               | Run ESLint checks                              |
| `pnpm generate:types`     | Generate TypeScript types from Payload config  |
| `pnpm generate:importmap` | Generate Payload admin UI import map           |
| `pnpm payload`            | Access Payload CLI directly                    |

## Tech Stack

- **Framework**: Next.js 15.4.7 with React 19
- **CMS**: Payload CMS 3.64.0
- **Database**: MongoDB
- **Storage**: AWS S3 (via @payloadcms/storage-s3)
- **Rich Text Editor**: Lexical
- **Testing**: Vitest 3.2.3, Playwright 1.56.1
- **Language**: TypeScript 5.7.3
- **Package Manager**: pnpm

## Security Features

### Password Policy

All admin users must use strong passwords with the following requirements:

- **Minimum 12 characters** long
- **Contains uppercase letter** (A-Z)
- **Contains lowercase letter** (a-z)
- **Contains number** (0-9)
- **Contains special character** (!@#$%^&\*, etc.)

Example valid password: `MyPass123!Secure`

### Session Security

This project enforces server-side authentication expiration for admin users:

- **Token Expiration**: Configurable via `PAYLOAD_TOKEN_EXPIRATION_SECONDS` (default: 3600 seconds / 60 minutes)
- **Auto-Refresh Disabled**: `admin.autoRefresh` is disabled to prevent silent token extension while users remain on admin pages
- **Secure Cookies**:
  - `SameSite=Strict` for maximum CSRF protection
  - `Secure=true` (HTTPS only)
  - Session tracking enabled via `useSessions: true`

### Optional: Logout on Browser Close

Enable `PAYLOAD_LOGOUT_ON_CLOSE=true` to send a logout signal when users close the browser tab/window:

- Uses `pagehide` event detection
- Falls back to `navigator.sendBeacon` for reliability
- **Best-effort only** — not guaranteed on every browser/device scenario

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (frontend)/        # Public frontend pages
│   ├── (payload)/         # Payload admin UI routes
│   │   └── LogoutOnClose.tsx    # Browser close logout handler
│   └── api/               # API routes
├── collections/           # Payload CMS collections
│   ├── Users.ts           # User management with auth
│   ├── Media.ts           # Media files
│   ├── ArticlesMedia.ts   # Article media relations
│   ├── Categories.ts      # Content categories
│   ├── Siaran.ts          # Broadcasts/announcements
│   └── Takwim.ts          # Calendar/timeline
├── auth/                  # Authentication strategies
│   └── apiKeyStrategy.ts  # API key authentication
├── utils/                 # Utility functions
│   ├── password-policy.util.ts    # Password validation
│   ├── env-parse.util.ts
│   └── ...
├── config/                # Configuration files
│   └── env.config.ts
└── payload.config.ts      # Payload CMS configuration
```

## Database

### MongoDB Setup

**Local Development:**

```bash
# Using Docker
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo

# Update DATABASE_URI in .env.local
DATABASE_URI=mongodb://admin:password@localhost:27017/sekolahku
```

**Remote MongoDB:**

```
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/sekolahku
```

## Docker Support

### Development Container

```bash
docker-compose up
```

### Production Build

```bash
docker build -f Dockerfile.prod -t sekolahku-cms:latest .
docker run -p 3000:3000 sekolahku-cms:latest
```

## Testing

### Unit & Integration Tests

```bash
# Run all tests
pnpm exec vitest

# Run with coverage
pnpm exec vitest --coverage

# Watch mode
pnpm exec vitest --watch
```

### E2E Tests

```bash
# Run Playwright tests
pnpm exec playwright test
```

## Development Notes

### Type Generation

When modifying collections or auth configurations, regenerate TypeScript types:

```bash
pnpm generate:types
```

### Import Map

When adding custom admin UI components, update the import map:

```bash
pnpm generate:importmap
```

### Environment Variables in Production

Ensure all required environment variables are set in your production environment (`.env.production` or platform-specific secret management).

## License

MIT
