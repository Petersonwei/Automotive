# Automotive Landing Page

Automotive Landing Page built with Next.js 15, React 19, and TypeScript, featuring an interactive card-based UI system for showcasing automotive content.

##  Features

### Card Component System
- Responsive grid layout with 1/2/3 column configurations
- Interactive card highlighting system with smooth transitions
- Flexible card components with customizable headers, bodies, and images
- Bottom-aligned action buttons with proper spacing
- Minimum height constraints for consistent layout

### Technical Implementation
- Built with Next.js 15 and React 19
- TypeScript for type safety
- TailwindCSS for styling
- Jest and React Testing Library for unit testing
- Axios for API integration
- Redux Toolkit for state management

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Petersonwei/Automotive
cd automotive
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Testing

Run the test suite:
```bash
pnpm test
# or
npm test
```

Watch mode for development:
```bash
pnpm test:watch
# or
npm run test:watch
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── __tests__/     # Component tests
├── constants/         # Application constants
├── data/             # Static data and mock API responses
└── services/         # API services and utilities
```

## 🛠️ Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode

## Tech Stack

- **Framework:** Next.js 15.3.4
- **UI Library:** React 19.0.0
- **Styling:** TailwindCSS 4
- **HTTP Client:** Axios
- **Testing:** Jest & React Testing Library
- **Icons:** React Icons

## UI Components

### Card System
The project features a sophisticated card system with:
- Responsive layouts
- Interactive highlighting
- Smooth transitions
- Accessible design
- Flexible content areas

### Theme Toggle
Includes a dark/light mode toggle with system preference detection.

## Responsive Design

The application is fully responsive with breakpoints for:
- Mobile devices
- Tablets
- Desktop screens
- Large displays



