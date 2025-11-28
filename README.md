# Notes Application

A full-stack notes management application built with NestJS (backend) and React (frontend). Users can create, edit, delete, and archive notes, organize them into categories.

## Features

- **User Authentication**: Secure login and signup with JWT tokens
- **Note Management**: Create, read, update, and delete notes
- **Archiving**: Archive and unarchive notes
- **Categories**: Organize notes into categories
- **Real-time Updates**: Page refreshes automatically after each action
- **Responsive UI**: Built with React and Tailwind CSS

## Tech Stack

### Backend
- **NestJS**: Node.js framework for building efficient server-side applications
- **TypeORM**: ORM for TypeScript and JavaScript
- **PostgreSQL**: Relational database
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing

### Frontend
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Router**: Declarative routing for React

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker (for PostgreSQL database)
- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hirelens-challenges/LealCastellanos-fd5154.git
   cd LealCastellanos-fd5154
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up the database:**
   The `start.sh` script handles PostgreSQL setup via Docker. Make sure Docker is running.

## Running the Application

### Quick Start (Recommended)
Run the provided startup script which sets up the database, starts the backend, creates an initial user, and starts the frontend:

```bash
chmod +x start.sh
./start.sh
```

This will:
- Start a PostgreSQL database in Docker
- Start the backend server on port 3000
- Create an initial user (username: `jlebot7`, password: `admin12345`)
- Start the frontend development server on port 5173

### Manual Setup

1. **Start PostgreSQL:**
   ```bash
   sudo docker run -d \
     --name postgres_db \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=notests \
     -p 5432:5432 \
     -v postgres_data:/var/lib/postgresql/data \
     postgres:15-alpine
   ```

2. **Run database migrations:**
   ```bash
   cd backend
   npm run migrate:up
   ```

3. **Start the backend:**
   ```bash
   npm run start:dev
   ```

4. **Start the frontend (in a new terminal):**
   ```bash
   cd ../frontend
   npm run dev
   ```

## Usage

1. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`

2. **Login:**
   Use the initial user credentials:
   - Username: `jlebot7`
   - Password: `admin12345`

3. **Create notes:**
   Click the "+" button in the bottom-right corner to create a new note.

4. **Manage notes:**
   - Edit notes by clicking the edit button on a note card
   - Archive/unarchive notes using the archive button
   - Delete notes using the delete button

5. **Categories:**
   - View notes by category by clicking on category names
   - Delete categories using the trash icon next to category names

## Deployment to Vercel

This application is configured for deployment on Vercel. Follow these steps to deploy:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Set up Vercel Postgres:**
   - Go to your Vercel dashboard and create a new Postgres database
   - Copy the `DATABASE_URL` from the database settings

4. **Deploy the application:**
   ```bash
   vercel --prod
   ```

5. **Set environment variables in Vercel:**
   - Go to your project settings in Vercel
   - Add the following environment variables:
     - `DATABASE_URL`: Your Vercel Postgres connection string
     - `JWT_SECRET`: A secure random string for JWT signing
     - `SESSION_SECRET`: A secure random string for session management

6. **Run database migrations:**
   After deployment, run migrations on the production database:
   ```bash
   vercel env pull .env.local
   # Edit .env.local to include DATABASE_URL
   cd backend
   npm run migrate:up
   ```

7. **Access the deployed application:**
   Vercel will provide a URL for your deployed application.

### Environment Variables

For local development, create a `.env` file in the `backend` directory with:
```
DATABASE_URL=postgresql://username:password@localhost:5432/notests
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

For Vercel deployment, set these in your Vercel project settings.

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (protected)

### Users
- `POST /users/signup` - User registration

### Notes
- `GET /notes` - Get all notes (protected)
- `POST /notes` - Create a new note (protected)
- `PUT /notes/:id` - Update a note (protected)
- `DELETE /notes/:id` - Delete a note (protected)
- `PUT /notes/:id/archive` - Archive/unarchive a note (protected)

### Categories
- `GET /categories` - Get all categories (protected)
- `POST /categories` - Create a new category (protected)
- `DELETE /categories/:id` - Delete a category (protected)
- `PUT /notes/:noteId/categories/:categoryId` - Add category to note (protected)

## Project Structure

```
LealCastellanos-fd5154/
├── backend/
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── data-source.ts
│   │   ├── auth/
│   │   ├── users/
│   │   ├── notes/
│   │   ├── categories/
│   │   ├── entities/
│   │   ├── dto/
│   │   └── scripts/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── handlers/
│   │   ├── types/
│   │   ├── utils/
│   │   └── assets/
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── start.sh
├── CHALLENGE.md
└── README.md
```

## Development

### Backend Scripts
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run migrate:up` - Run database migrations
- `npm run migrate:down` - Revert database migrations

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Built as part of a coding challenge
- Uses modern web development best practices
- Implements secure authentication and data management
