# MAI Digital - AI Coding Guidelines

## Project Overview
MAI Digital is a Next.js 16 application for evaluating and implementing universal design accessibility. Built with React 19, TypeScript, and Tailwind CSS v4, it features a client-side simulated workflow: login → location selection → accessibility survey → report generation.

## Architecture
- **Framework**: Next.js App Router with mixed TypeScript/JavaScript components
- **Styling**: Tailwind CSS v4 with custom green color scheme (`text-green-600`, `bg-green-500`)
- **State Management**: React hooks (`useState`, `useRouter`) for client-side interactivity
- **Charts**: Recharts library for data visualization (e.g., pie charts in reports)
- **Language**: Portuguese UI with English code comments

## Key Patterns
- **Navigation**: Use `useRouter` from `next/navigation` for programmatic routing (e.g., `router.push('/levantamento')`)
- **Survey Categories**: Define arrays of objects with `id`, `label`, `icon` for accessibility categories (see `app/levantamento/page.js`)
- **Scoring Interface**: Range sliders (0-10) with visual feedback for accessibility ratings
- **Modal Overlays**: Fixed positioning with backdrop blur for input forms
- **Responsive Design**: Flexbox layouts with Tailwind utilities for mobile-first design

## Development Workflow
- **Start Dev Server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build` (production build)
- **Lint**: `npm run lint` (ESLint with Next.js rules)
- **Dependencies**: Minimal setup - add `recharts` for charts if needed

## Conventions
- **File Naming**: Kebab-case for routes (e.g., `localizacao`, `levantamento`), PascalCase for components
- **Comments**: Include requirement references like `(RNF005)` and citations like `[cite: 286-292]`
- **Icons**: Use emoji for category icons (e.g., `🚌` for Transporte)
- **Colors**: Green palette for primary actions, gray for neutrals, yellow accents for highlights
- **Typography**: Geist font family with bold headings and medium body text

## Example Patterns
- **Category Definition**:
  ```javascript
  const categorias = [
    { id: 'transporte', label: 'Transporte', sub: '5 subtópicos', icon: '🚌' }
  ];
  ```
- **Router Navigation**:
  ```javascript
  const router = useRouter();
  router.push('/relatorio');
  ```
- **Tailwind Classes**: `bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600`

## Key Files
- `app/page.js`: Login simulation
- `app/localizacao/page.js`: Map-based location selection
- `app/levantamento/page.js`: Survey with scoring sliders
- `app/relatorio/page.js`: Report with pie charts
- `app/layout.tsx`: Root layout with metadata</content>
<parameter name="filePath">/home/samuel/Documentos/MAI/.github/copilot-instructions.md