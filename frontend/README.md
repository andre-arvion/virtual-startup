# Virtual Startup Platform Frontend

The frontend application for the Virtual Startup Platform, built with React, TypeScript, and Tailwind CSS.

## Features

### User Interface
- Modern, responsive design
- Dark/light theme support
- Intuitive navigation
- Real-time updates

### Project Management
- Project dashboard
- Project creation and editing
- Project phases visualization
- Persona management interface
- Asset management system

### Task Management
- Task board with drag-and-drop
- Task creation and assignment
- Priority and status management
- Due date tracking

### Activity Tracking
- Real-time activity feed
- Project-specific activity logs
- User activity history

### Search and Navigation
- Global search functionality
- Advanced filtering options
- Quick navigation shortcuts

## Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State Management
- **Axios** - API Client
- **React Query** - Data Fetching
- **Shadcn/ui** - UI Components
- **React Hook Form** - Form Management
- **Zod** - Schema Validation

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/     # Reusable components
│   │   ├── auth/      # Authentication components
│   │   ├── layout/    # Layout components
│   │   ├── project/   # Project-related components
│   │   └── ui/        # UI components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilities and helpers
│   ├── pages/         # Page components
│   ├── store/         # State management
│   ├── styles/        # Global styles
│   └── types/         # TypeScript types
└── tests/             # Test files
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Backend API running (see main README)

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update environment variables:
```env
VITE_API_URL=http://localhost:8001
```

4. Start development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run typecheck` - Run TypeScript type checking

## Development Guidelines

### Component Structure

```typescript
// Example component structure
import { useState } from 'react'
import { useStore } from '@/store'
import { Button } from '@/components/ui'

interface Props {
  // Component props
}

export function ComponentName({ ...props }: Props) {
  // Component logic
  return (
    // JSX
  )
}
```

### State Management

- Use Zustand for global state
- Use React Query for server state
- Use local state for component-specific state

### Styling

- Use Tailwind CSS for styling
- Follow the design system
- Use CSS modules for complex components

### Best Practices

- Write clean, maintainable code
- Add proper TypeScript types
- Write unit tests for components
- Follow the established coding style
- Document complex logic
- Use proper error handling

## API Integration

The frontend communicates with the backend API using Axios. API calls are organized in the `src/lib/api` directory:

```typescript
// Example API call
import { api } from '@/lib/api'

export const getProjects = async () => {
  const response = await api.get('/api/projects')
  return response.data
}
```

## Contributing

1. Follow the project's coding style
2. Write clear commit messages
3. Add tests for new features
4. Update documentation as needed
5. Create pull requests for review

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check if the backend is running
   - Verify API URL in .env file
   - Check CORS settings

2. **Build Issues**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify dependencies

3. **State Management Issues**
   - Check Redux DevTools
   - Verify store updates
   - Check component re-renders

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Query Documentation](https://tanstack.com/query/latest)
