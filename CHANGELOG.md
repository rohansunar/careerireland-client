# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-01-XX

### 🚀 Initial Release

### 🚀 Added

- **Root Layout Structure**: Created proper Next.js App Router root layout at `src/app/layout.tsx`
- **Dashboard Page**: Added user dashboard with proper CSS styling and navigation
- **Environment Configuration**: Added NextAuth environment variables for proper authentication
- **Middleware Support**: Added middleware configuration for route protection
- **Layout Hierarchy**: Implemented proper layout hierarchy following Next.js App Router conventions

### 🔧 Fixed

- **Critical CSS Loading Issue**: Fixed unstructured pages without CSS/JS loading after login
- **Layout Structure**: Resolved duplicate HTML structure causing asset loading conflicts
- **Provider Duplication**: Eliminated duplicate NextAuth and TanStack providers
- **CSS Import Paths**: Fixed incorrect CSS import paths in auth layout
- **Authentication Flow**: Resolved JWT decryption errors with proper environment configuration
- **Route Group Layout**: Fixed improper use of route group layout as root layout

### 🎨 Changed

- **Main Layout**: Refactored main layout to remove HTML structure and focus on content
- **Auth Layout**: Simplified auth layout to handle only authentication-specific styling
- **Login Redirect**: Updated login form to redirect to dashboard instead of home page
- **Asset Loading**: Improved asset loading performance and consistency

### 🗂️ Restructured

- **Layout Architecture**:
  - `src/app/layout.tsx` - Root layout with HTML structure and global providers
  - `src/app/(main)/layout.tsx` - Main content layout with navigation
  - `src/app/(main)/auth/layout.tsx` - Authentication-specific layout

### ⚡ Performance

- **Faster Compilation**: Reduced server startup time from 6.1s to 2.6s
- **Optimized Imports**: Removed unnecessary imports and duplicate providers
- **Clean Console**: Eliminated layout-related compilation warnings

### 🛠️ Technical Details

#### Before (Broken Structure):

```
src/app/
├── (main)/
│   ├── layout.tsx ❌ (Had <html>, <body> tags)
│   ├── auth/
│   │   └── layout.tsx ❌ (No HTML structure, wrong CSS imports)
│   └── page.tsx
├── globals.css
└── [NO ROOT LAYOUT] ❌
```

#### After (Fixed Structure):

```
src/app/
├── layout.tsx ✅ (Root layout with <html>, <body>)
├── (main)/
│   ├── layout.tsx ✅ (Main content layout)
│   ├── auth/
│   │   └── layout.tsx ✅ (Auth-specific styling)
│   └── page.tsx
└── globals.css
```

### 🔐 Security

- **Environment Variables**: Added proper NextAuth configuration
- **Route Protection**: Implemented middleware for protected routes
- **Session Management**: Fixed JWT token handling

### 📝 Documentation

- **Code Comments**: Added comprehensive code documentation
- **Error Handling**: Improved error messages and debugging information

---

## [1.0.0] - 2024-01-XX

### 🚀 Initial Release

- **Next.js Application**: Initial Career Ireland application setup
- **Authentication**: NextAuth integration with credentials and Google OAuth
- **UI Components**: Shadcn/ui component library integration
- **Styling**: Tailwind CSS configuration
- **Pages**: Home, About, Contact, Services, and Authentication pages
- **Navigation**: Responsive navigation with mobile support
- **Footer**: Company information and links

### 🎨 Features

- **Responsive Design**: Mobile-first responsive layout
- **Dark Mode**: Theme switching capability
- **Form Handling**: React Hook Form with Zod validation
- **Image Optimization**: Next.js Image component integration
- **Font Optimization**: Custom font loading with next/font

### 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Zod
- **UI**: Shadcn/ui components
- **Icons**: Lucide React
- **State Management**: TanStack Query

---

## Git Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples:

```bash
feat(auth): add user dashboard with proper CSS loading
fix(layout): resolve unstructured pages without CSS/JS
refactor(layout): implement proper Next.js App Router structure
docs(changelog): add comprehensive project changelog
```
