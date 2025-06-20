# Automotive Landing Page

Automotive Landing Page built with Next.js 15, React 19, and TypeScript, featuring an interactive card-based UI system for showcasing automotive content.

##  Features

##  Features

![image](https://github.com/user-attachments/assets/e9fd8f9e-a83d-4e71-8708-fddb553c3eb6)

- Build the Project using Next JS 15 (ref: https://nextjs.org/docs/app/getting-started/installation)

- Use TailwindCSS

- Responsive on desktop and mobile, the cards should be in a single column on mobile.
  Desktop
![image](https://github.com/user-attachments/assets/4253093f-5a65-4c2b-89e8-f4f425db62a4)
  Mobile
![image](https://github.com/user-attachments/assets/057eb49a-a278-4298-8539-c9cbba2287bd)
  IPad
![image](https://github.com/user-attachments/assets/cb46f50a-21b2-4a14-a6b0-ad6b575d91ad)

- Card 3 includes two paragraphs of text for height variation
![image](https://github.com/user-attachments/assets/c4c825c4-86ba-4135-9d41-6353c9ae88d5)

- State-managed border logic (middle card highlighted on load, updates on click)
Default (caculate the middle card with the border)
![image](https://github.com/user-attachments/assets/a99fd024-2680-48d7-a2b0-339331d1a511)
Click the first card:
![image](https://github.com/user-attachments/assets/6900f633-ed60-4d76-8882-a33a56260926)

- Light/dark mode toggle via global state: A global isDark state is managed inside the ThemeToggle component, Based on the state, .dark class is added or removed from document.documentElement
![image](https://github.com/user-attachments/assets/9eca1380-c949-4dae-8a25-8e64f6de9377)
![image](https://github.com/user-attachments/assets/ffe7d106-e025-451a-9453-68b160c2866b)

- Mock API integration with loading state (with axios to set the time delay)
![image](https://github.com/user-attachments/assets/6147e2ae-8d88-4924-972d-ab05128ab34d)

- Basic unit tests (Jest + React) for the border logic and the toggle logic
![image](https://github.com/user-attachments/assets/16836dcc-4d2b-4f97-9ba8-184421b17b53)

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

## Available Scripts

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



