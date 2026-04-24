# LeadFlow CRM

A professional, full-stack lead management system designed to capture, track, and convert business inquiries with surgical precision.

## 1. Overview
LeadFlow CRM is a modern relationship management tool built for businesses that value operational clarity. It provides a seamless transition from initial client contact via a public-facing inquiry form to a secure, private administrative environment. The system emphasizes speed of response, data integrity, and actionable analytics, ensuring that no potential lead falls through the cracks.

## 2. Tech Stack

### Frontend
- **React 18 & Vite**: Fast, modern component-based architecture and build tool.
- **Tailwind CSS**: Utility-first styling for a polished, distinctive UI.
- **Framer Motion**: Purposeful animations and smooth route transitions via `motion/react`.
- **Recharts**: Performance-tuned data visualization for business metrics.
- **jsPDF & AutoTable**: Client-side document generation for executive reporting.
- **Lucide React**: Clean, consistent iconography.
- **React Router**: Client-side routing for SPA behavior.
- **Axios**: Promised-based HTTP client for API interactions.

### Backend
- **Node.js & Express**: Scalable server environment handling API logic and middleware.
- **JWT (JSON Web Tokens)**: Secure, stateless session management.

### Database
- **MongoDB**: Flexible NoSQL document database for leads and activity logs.
- **Mongoose**: Elegant object modeling for lead schemas.

### Authentication
- **Secure Admin Login**: Protected routes using bearer tokens stored in localized state.

### Tools & Environment
- **AI Studio Build**: Primary development and deployment platform.
- **Cloud Run**: Containerized execution environment.
- **PostCSS**: CSS transformation tool integrated with Vite.

## 3. Features
- **Public Lead Intake**: A dedicated `/form` route for professional client self-onboarding. Includes source selection and message capture.
- **Admin Command Center**: A secure `/admin` dashboard with data visualization (Bar/Pie charts) showing real-time statistics.
- **Data Export**: One-click professional PDF report generation and CSV data exporting.
- **Lead Database**: Advanced filtering system to manage leads by status (New, Contacted, Converted).
- **Activity Logging**: Internal persistent notes for every lead to track the history of interactions.
- **Landing Page**: A high-conversion landing page outlining product value and guiding users to the appropriate modules.
- **Responsive Design**: Fully adaptive interface optimized for desktop precision and tablet browsers.

## 4. Project Structure
```text
├── src/                  # Frontend Application
│   ├── components/       # Reusable UI components (Navbar, Modals, etc.)
│   ├── context/          # Auth and State management
│   ├── lib/              # API configuration (Axios interceptors)
│   ├── pages/            # View-level components (Dashboard, Leads, Form)
│   └── main.jsx          # Frontend entry point
├── server/               # Backend API
│   ├── middleware/       # Auth guards and utility middleware
│   ├── models/           # Mongoose schemas (Lead, User)
│   └── routes/           # API endpoints (/auth, /leads)
├── server.ts             # Full-stack server entry point (Vite + Express)
└── metadata.json         # Application metadata and permissions
```

## 5. Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (set in environment)

### Steps
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd leadflow-crm
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```
