# Project AI Instructions

# Project description
- An application for pet adoption.
- Users can use it to find a pet friend who has been abadoned or homeless to take care and share love.
- Users can use it to write emotional stories about adopting and caring or even show memorable moments of their pets.
- Users can read the stories shared by others and give comments or reacts to express their emotions.
- Users can freely to contribute by buying products on a shop in the application.

## Tech Stack
- Next.js (App Router, TypeScript)
- HeroUI V3
- NestJS (REST API)

## Architecture
- Microservices

### Frontend
- Core frameworks or libraries: NextJs (App router), HeroUI V3, Tailwindcss
- App Router
- Server Components by default
- Service layer for API calls
- Structure:
  - app/
  - components/
  - services/
  - utils/

### Backend
- Core frameworks: NestJs
- module → controller → service → repository
- DTO validation
- RESTful APIs

### Database
- Prisma ORM
- Database on Supabase

## Rules
- Use strict TypeScript
- No unnecessary libraries
- Keep code modular and reusable
- Follow existing patterns
- Solutions stick to the current version of existing libraries
- Consider about application security and code performance
- 

## Expectations
- Produce production-ready code
- Avoid generic examples
- Learn and apply architecture of microservices