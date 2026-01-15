# OpenHouse - Volunteer Management Platform

A comprehensive platform for managing volunteers and events, built with modern web technologies.

## Tech Stack

- **Frontend Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **UI Components**: React 19

## Features

- 🔐 **Authentication**: Secure user authentication with NextAuth.js
- 👥 **User Management**: Role-based access control (Admin, Organizer, Volunteer)
- 📅 **Event Management**: Create, manage, and track volunteer events
- 🎯 **Volunteer Profiles**: Detailed profiles with skills, interests, and availability
- 📊 **Hours Tracking**: Track and verify volunteer hours
- ✅ **Event Registration**: Easy event registration and check-in system

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or remote)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd openhouse
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the following variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: Your application URL (http://localhost:3000 for development)

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push the schema to your database
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Database Management

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio to view/edit data
npm run db:studio
```

## Project Structure

```
openhouse/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── auth/         # Authentication endpoints
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Prisma schema
├── public/               # Static files
├── .env                  # Environment variables (gitignored)
├── .env.example          # Environment variables template
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Database Schema

The application includes the following main models:

- **User**: User accounts with authentication
- **Volunteer**: Volunteer profiles with skills and availability
- **Event**: Volunteer events and opportunities
- **EventRegistration**: Event signups and attendance tracking
- **VolunteerHours**: Volunteer time tracking

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:generate` - Generate Prisma Client

## Development Workflow

1. Make changes to the code
2. Test locally with `npm run dev`
3. Update database schema in `prisma/schema.prisma` if needed
4. Run `npm run db:push` to update the database
5. Run `npm run build` to ensure production build works
6. Commit and push your changes

## Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Node.js:
- Railway
- Render
- DigitalOcean App Platform
- AWS
- Google Cloud

Make sure to:
1. Set all required environment variables
2. Run database migrations
3. Set `NODE_ENV=production`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
