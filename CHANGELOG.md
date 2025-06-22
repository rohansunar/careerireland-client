# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-06-22

### 🚀 Added

- **Estimated Completion Date Field**: Added new `estimated_completion` date input field to application/case ID pages
  - Positioned near existing `updatedAt` field for logical grouping
  - Displays "Not set" when no date is provided
  - Proper date validation and formatting implemented
  - Updated ApplicationData interface to include optional `estimated_completion` field

### 🔧 Enhanced

- **Stage Name Display**: Improved Case ID section to show actual stage names instead of step numbers

  - Compares `current_step === steps[i].stageOrder` to find matching stage
  - Extracts and displays corresponding `stageName` from matched stage object
  - Falls back to step number format if stage name not found
  - Applied to both main stage indicator and step progress display

- **Save Form Backend Integration**: Modified form submission to exclude `currentStep` field from client-side updates
  - Stage progression now handled exclusively by backend for data integrity
  - Updated `SubmissionPayload` interface to make `currentStep` optional
  - Modified mutation function to conditionally include `currentStep` only for step progression
  - Maintains backward compatibility for existing functionality

### 🗑️ Removed

- **Delete Account Option**: Removed "Delete Account" button from user profile page
  - Eliminated delete account dropdown menu item from profile settings
  - Removed associated DeleteAccount component and related imports
  - Cleaned up unused state management and event handlers
  - Maintains existing profile page layout and design consistency

### 🎨 UI/UX Improvements

- **Enhanced Error Handling**: Improved user experience with better error states

  - Added loading spinner with descriptive text for application details
  - Implemented user-friendly error messages with retry functionality
  - Added "Application Not Found" state with navigation back to applications
  - Enhanced error display with appropriate icons and styling

- **Memory Leak Prevention**: Implemented proper cleanup for timeout operations
  - Added useRef for tracking setTimeout operations
  - Implemented cleanup effect to prevent memory leaks on component unmount
  - Enhanced error handling with more descriptive error messages from API responses

### 🧪 Testing & Quality

- **Updated Test Suite**: Fixed CasesTable test suite to match current data structure

  - Updated mock data to use current Case interface with proper field names
  - Fixed test expectations to match new table headers and data display
  - Corrected button text expectations and navigation testing
  - Reduced column count expectation from 8 to 5 to match current implementation

- **Build Verification**: Ensured successful compilation and development server startup
  - Resolved TypeScript compilation errors
  - Verified development server runs without blocking errors
  - Maintained existing functionality while implementing new features

### 🛠️ Technical Details

#### Files Modified:

- `src/app/(main)/profile/components/setting.tsx` - Removed delete account functionality
- `src/app/(main)/profile/components/profile.tsx` - Updated to remove delete account component
- `src/app/(main)/profile/application/[caseId]/page.tsx` - Added estimated completion field, enhanced stage display, improved error handling
- `src/hooks/use-query.ts` - Modified SubmissionPayload interface and mutation logic
- `src/app/(main)/profile/components/__tests__/CasesTable.test.tsx` - Updated test suite for current data structure

#### Interface Changes:

- `ApplicationData` interface: Added optional `estimated_completion?: string` field
- `SubmissionPayload` interface: Made `currentStep?: string` optional
- Removed unused `getStatusBadgeVariant` function

#### Security & Performance:

- Implemented proper timeout cleanup to prevent memory leaks
- Enhanced error handling with user-friendly messages
- Maintained data integrity by moving stage progression to backend-only control
- Improved loading states and error recovery mechanisms

### 📊 Impact

- **Enhanced User Experience**: Better error handling and loading states improve user satisfaction
- **Data Integrity**: Backend-controlled stage progression ensures consistent application state
- **Security**: Removed accidental account deletion risk by removing delete functionality
- **Performance**: Memory leak prevention and proper cleanup improve application stability
- **Maintainability**: Cleaner codebase with removed unused functions and improved error handling

## [1.2.0] - 2025-06-22

### 🗑️ Removed

- **Document Upload Section**: Removed entire upload documents section from Document Vault feature

  - Eliminated drag & drop interface for document uploads
  - Removed "Choose Files" button and file format information
  - Removed upload progress indicators and file validation logic

- **Statistics Dashboard Cards**: Removed all document statistics cards from Document Vault

  - Removed "Total Documents" card
  - Removed "Approved", "Pending", "Rejected", "Expired" status cards
  - Removed "Critical" priority documents card

- **Status & Priority Management**: Eliminated document status and priority tracking system

  - Removed "Status & Priority" column from documents table
  - Removed DocumentStatus and DocumentPriority type definitions
  - Removed status filtering dropdown from document filters
  - Removed status icons and priority badges from document display

- **Delete Functionality**: Removed delete button from document actions
  - Preserved View and Download buttons in actions column
  - Maintained document table structure and responsive design

### 🔧 Refactored

- **Document Vault Component**: Streamlined DocumentVault.tsx for simplified document viewing

  - Updated UploadedDoc interface to remove status and priority properties
  - Simplified document filtering to category and search only
  - Updated static mock data to remove status and priority references
  - Cleaned up unused imports and functions

- **Backend Integration**: Removed document upload API integration

  - Removed useSubmitApplicationDocument hook from use-query.ts
  - Updated application page to remove document upload functionality
  - Maintained existing document viewing and download capabilities

- **Mock Data and Tests**: Updated test fixtures and mock data
  - Updated applicationStepsMock.json to change "Uploading Documents" to "Document Collection"
  - Removed verification status references from mock data
  - Updated test fixtures to reflect simplified document structure

### 🎨 UI/UX Improvements

- **Simplified Interface**: Cleaner, more focused document management interface

  - Removed visual clutter from statistics cards and status indicators
  - Streamlined table layout with essential columns only
  - Maintained responsive design across all screen sizes
  - Preserved document categorization and search functionality

- **Consistent Design**: Maintained design system consistency
  - Kept existing color schemes and typography
  - Preserved navigation and layout structure
  - Maintained accessibility features and responsive behavior

### 🛠️ Technical Details

#### Files Modified:

- `src/app/(main)/profile/components/DocumentVault.tsx` - Main component refactoring
- `src/hooks/use-query.ts` - Removed document upload API integration
- `src/app/(main)/profile/application/[caseId]/page.tsx` - Removed upload functionality
- `src/util/applicationStepsMock.json` - Updated mock data structure
- `src/__tests__/fixtures/immigrationData.ts` - Updated test fixtures

#### Removed Components:

- Upload area with drag & drop functionality
- Statistics dashboard with 6 metric cards
- Status and priority filtering system
- Document delete functionality
- Status icons and priority badges

#### Preserved Features:

- Document viewing and downloading
- Category-based filtering
- Search functionality
- Responsive table design
- Document metadata display
- Authentication and authorization

### 📊 Impact

- **Reduced Complexity**: Simplified codebase by removing ~200 lines of upload-related code
- **Improved Performance**: Eliminated unnecessary API calls and state management
- **Enhanced Focus**: Users can now focus on viewing and managing existing documents
- **Maintained Functionality**: All essential document management features preserved

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
