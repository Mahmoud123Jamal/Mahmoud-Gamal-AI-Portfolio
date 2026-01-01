# Mahmoud Gamal | AI-Powered Portfolio

### Full-Stack Engineer specializing in high-performance applications

A cutting-edge, AI-integrated professional portfolio built with the latest stable and experimental features of the React ecosystem. This project features a seamless integration with **OpenRouter (Meta-Llama)** for real-time data-driven responses and a headless **Sanity CMS** for dynamic content management.

---

## Cutting-Edge Tech Stack

### **Core Frameworks**

- **Next.js 16.1.1**: Utilizing the latest App Router and Turbopack for near-instant development.
- **React 19.2.3**: Optimized with the **Babel React Compiler** for automatic performance tuning.
- **TypeScript**: Strictly typed for robust, scalable code.

### **AI and Content Integration**

- **AI Assistant**: Powered by **Meta-Llama** via **OpenRouter AI**, providing context-aware responses based on actual portfolio data.
- **Sanity CMS v5**: A headless CMS managing professional skills, projects, and site metadata.
- **Next-Sanity**: Seamless integration for real-time content fetching and Sanity Typegen.

### **UI and Styling**

- **Tailwind CSS v4**: High-performance utility-first styling with the latest JIT engine.
- **Framer Motion 12**: Advanced physics-based animations for scroll reveals and interactive UI.
- **Radix UI**: Accessible primitives including Dialog and Progress bars for technical skill visualization.
- **Lucide React**: Modern and consistent iconography.

### **Authentication and Tooling**

- **Clerk Auth**: Secure administrative access for content management.
- **Biome 2.2**: An ultra-fast toolchain for linting and formatting (replaces ESLint/Prettier).

---

## Features

- **AI Assistant**: Integrates OpenRouter AI to answer visitor questions using real-time portfolio context.
- **Visual Skills Map**: Dynamic progress indicators for Backend (Node.js, Express), Frontend (Next.js, Tailwind), and Databases (MongoDB, Neon).
- **CI/CD Pipeline**: Automated deployments via Vercel with integrated build caches and repository cloning.
- **Branded Experience**: Custom blue scrollbars, concentric loading spinners, and consistent "Blue-600" accents.
- **Mobile First**: Fully responsive architecture optimized for all screen breakpoints.

---

## Installation and Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/Mahmoud123Jamal/Mahmoud-Gamal-AI-Portfolio.git
cd mahmoud-gamal-ai-portofolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-24
SANITY_API_WRITE_TOKEN=your_sanity_write_token

# OpenRouter AI Configuration (Optional - for AI chat feature)
OPENROUTER_API_KEY=your_openrouter_api_key

# Clerk Authentication (Optional - for admin access)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

#### Getting Your API Keys:

- **Sanity CMS**:
  1. Create a project at [sanity.io](https://www.sanity.io)
  2. Get your Project ID and Dataset from the Sanity dashboard
  3. Create an API token with write permissions in Sanity → API → Tokens

- **OpenRouter AI** (Optional):
  1. Sign up at [openrouter.ai](https://openrouter.ai)
  2. Generate an API key from your dashboard
  3. The AI chat feature will work without this, but with limited functionality

- **Clerk Auth** (Optional):
  1. Create an account at [clerk.com](https://clerk.com)
  2. Create a new application
  3. Copy your publishable key and secret key from the dashboard

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port).

### 5. Sanity Studio (Content Management)

Access the Sanity Studio at `http://localhost:3000/studio` to manage your content:

- Profile information
- Projects
- Skills
- Education
- Services
- Site settings

### 6. Build for Production

```bash
npm run build
npm start
```

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add all environment variables in Vercel's project settings
4. Deploy!

The project is configured for automatic deployments on every push to the main branch.

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

Make sure to set all required environment variables in your deployment platform's settings.

---

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run typegen` - Generate Sanity TypeScript types

---

## Project Structure

```
mahmoud-gamal-ai-portofolio/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Public-facing pages
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes (chat, contact)
│   └── studio/            # Sanity Studio
├── components/            # React components
│   ├── layouts/          # Layout components
│   └── ui/               # UI components
├── sanity/               # Sanity CMS configuration
│   ├── schemaTypes/      # Content schemas
│   └── lib/              # Sanity utilities
├── lib/                  # Utility functions
└── public/               # Static assets
```

---

## Troubleshooting

### Sanity Connection Timeouts

If you experience connection timeouts with Sanity:

- Check your internet connection
- Verify your Sanity project ID and dataset are correct
- Ensure your Sanity API token has the correct permissions
- The app will continue to work without Sanity data, but sections may not display

### Build Errors

If you encounter TypeScript errors during build:

- Run `npm run typegen` to regenerate Sanity types
- Ensure all environment variables are set correctly
- Check that all dependencies are installed: `npm install`

---

## License

This project is private and proprietary.

---

## Contact

For questions or support, please contact through the portfolio website.
