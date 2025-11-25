# Health Node

A complete, scalable boilerplate for a Next.js health-tracking application. Built with clean architecture, type-safe APIs, secure authentication, and production-ready tooling.

## 🚀 Features

- **Next.js App Router** - Modern React framework with server components and API routes
- **MongoDB + Mongoose** - Long-lived database connections with clean repository pattern
- **NextAuth.js** - JWT strategy with Google OAuth, secure cookies, and session management
- **TypeScript** - Full type safety across models, API responses, and components
- **TailwindCSS** - Modern utility-first styling
- **Recharts** - Beautiful, responsive health metrics charts
- **Sentry** - Error monitoring and performance tracking
- **Testing** - Jest, React Testing Library, and Playwright E2E tests
- **Docker** - Multi-stage production builds with Docker Compose
- **CI/CD** - GitHub Actions workflow for automated testing and builds

## 📁 Project Structure

```
/app
  /api              # API route handlers
  /auth             # Authentication pages
  /dashboard        # Protected dashboard routes
  /public           # Public SEO pages
/lib
  /repositories     # Database access layer
  /services         # Business logic (analytics, etc.)
  db.ts             # MongoDB connection management
  auth.ts           # NextAuth configuration
  validations.ts    # Zod schemas
/models             # Mongoose models with TypeScript interfaces
/components         # Reusable React components
/tests
  /unit             # Jest unit tests
  /integration      # API integration tests
  /e2e              # Playwright end-to-end tests
/scripts
  seed.ts           # Database seeding script
/docker
  Dockerfile        # Multi-stage production build
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or cloud instance)
- Google OAuth credentials (for authentication)

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_TRUST_HOST=true

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/health-node
MONGODB_DB_NAME=health-node

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth (Get from https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Sentry (Optional - for error monitoring)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_DSN=
SENTRY_ENVIRONMENT=local
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Get Google OAuth credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Client Secret to `.env`

3. **Seed the database:**

```bash
npm run seed
```

This creates a sample user (`sample@healthnode.dev`) with 7 days of example health metrics.

4. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Setup

### Using Docker Compose

The easiest way to run the full stack:

```bash
docker-compose up
```

This starts:
- Next.js app on port 3000
- MongoDB on port 27017

The app will be available at `http://localhost:3000`.

### Building the Docker Image

```bash
docker build -f docker/Dockerfile -t health-node .
```

## 🧪 Testing

### Unit Tests

```bash
npm run test:unit
```

### End-to-End Tests

```bash
npm run test:e2e
```

### All Tests

```bash
npm test
```

## 📊 API Routes

### Metrics API

**GET `/api/metrics`**
- Returns recent metrics for the authenticated user
- Includes analytics summary

**POST `/api/metrics`**
- Creates a new daily metric
- Body: `{ date, weight, heartRate, sleepHours, activityMinutes, notes? }`

**GET `/api/metrics/[id]`**
- Returns a specific metric by ID

**PUT `/api/metrics/[id]`**
- Updates a metric (partial updates supported)

**DELETE `/api/metrics/[id]`**
- Deletes a metric

All routes require authentication via NextAuth session.

## 🏗️ Architecture

### Database Layer

- **Connection Management** (`lib/db.ts`): Long-lived MongoDB connections with caching
- **Repositories** (`lib/repositories/`): Clean data access layer, abstracting Mongoose
- **Models** (`models/`): Mongoose schemas with TypeScript interfaces

### Authentication

- **NextAuth.js** with JWT strategy
- **Google OAuth** provider
- **Secure cookies** (httpOnly, sameSite, secure in production)
- **Session callbacks** for user data enrichment

### Error Handling

- **Type-safe error utilities** (`utils/error.ts`)
- **Sentry integration** for error tracking
- **Consistent API responses** (`lib/http.ts`)

### Validation

- **Zod schemas** for runtime type validation
- **Type inference** from schemas for TypeScript types

## 🔒 Security

- JWT-based sessions (no database lookups on each request)
- Secure cookie configuration
- Environment variable validation
- Type-safe API handlers
- Input validation with Zod

## 📈 Monitoring

Sentry is configured for:
- Server-side error tracking (`sentry.server.config.ts`)
- Client-side error tracking (`sentry.client.config.ts`)
- Route middleware error capture

Set `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_DSN` to enable.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

The Dockerfile uses Next.js standalone output for optimal production builds:

```bash
docker build -f docker/Dockerfile -t health-node .
docker run -p 3000:3000 --env-file .env health-node
```

### Environment Variables for Production

Ensure all variables from `.env.example` are set in your production environment.

## 🧩 Key Components

- **Dashboard** (`app/dashboard/`): Protected health metrics overview
- **Metrics Charts** (`components/charts/`): Recharts-based trend visualization
- **Metric Cards** (`components/dashboard/`): Summary cards and tables
- **Auth Pages** (`app/auth/`): Sign-in flow with Google OAuth

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run seed` - Seed database with sample data
- `npm run typecheck` - TypeScript type checking

## 🤝 Contributing

This is a boilerplate project. Feel free to fork and customize for your needs.

## 📄 License

MIT

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Sentry](https://sentry.io/)
