export const staticPortfolioData = {
  profile: {
    firstName: "Mahmoud",
    lastName: "Ghoraba",
    headline: "MERN | Next.js Stack Engineer",
    shortBio:
      "Computer Science Engineer specializing in high-performance Full-Stack applications. Expert in Next.js, React, and the MERN stack with a focus on scalable architecture.",
    email: "mahmood.ghoraba.eng@gmail.com",
    phone: "01098836658",
    location: "Menoufia, Egypt",
    yearsOfExperience: 1,
    github: "https://github.com/Mahmoud123Jamal",
    linkedin: "https://www.linkedin.com/in/mahmoud-ghoraba-3186333a2",
  },
  education: {
    University: "University of Menoufia",
    faculty: "Faculty of Computers and Information",
    degree: "Bachelor's Degree",
    gpa: "3.12",
    location: "Egypt",
    graduationDate: "2023",
    achievements: [
      "Software Engineering Specialist",
      "React and MERN Stack Certification",
    ],
  },
  skills: [
    { name: "HTML5", category: "frontend", proficiency: "expert" },
    { name: "CSS3", category: "frontend", proficiency: "expert" },
    { name: "JavaScript", category: "frontend", proficiency: "expert" },
    { name: "TypeScript", category: "frontend", proficiency: "advanced" },
    { name: "React.js", category: "frontend", proficiency: "expert" },
    { name: "Next.js", category: "frontend", proficiency: "expert" },
    { name: "Tailwind CSS 4.0", category: "frontend", proficiency: "expert" },
    { name: "Redux Toolkit", category: "frontend", proficiency: "advanced" },
    { name: "Node.js", category: "backend", proficiency: "advanced" },
    { name: "Express.js", category: "backend", proficiency: "advanced" },
    { name: "MongoDB Atlas", category: "database", proficiency: "advanced" },
    {
      name: "Neon PostgreSQL",
      category: "database",
      proficiency: "intermediate",
    },
    { name: "Drizzle ORM", category: "database", proficiency: "intermediate" },
    { name: "Git / GitHub", category: "tools", proficiency: "advanced" },
    { name: "Postman", category: "tools", proficiency: "advanced" },
  ],
  projects: [
    {
      title: "Full-Stack AI Story Generator",
      tagline:
        "AI-powered SaaS using OpenAI API to generate personalized children's stories",
      techStack: [
        "Next.js",
        "React",
        "OpenAI",
        "Drizzle ORM",
        "Neon DB",
        "Clerk",
      ],
      github:
        "https://github.com/Mahmoud123Jamal/StoriesAPP_Generator_Using_OPENAI_NEXTJS.git",
      category: "Web Integrated With AI",
      featured: true,
    },
    {
      title: "Doctor Appointment Booking System",
      tagline:
        "Full-stack MERN application with secure authentication and Role-Based Access Control",
      techStack: ["MongoDB", "Express.js", "React", "Node.js"],
      github:
        "https://github.com/Mahmoud123Jamal/Doctor-Appointment-MERN-App.git",
      category: "MERN Stack",
      featured: true,
    },
    {
      title: "Full-Stack RecipeHub",
      tagline:
        "Recipe-sharing MERN platform with JWT authentication and image uploads",
      techStack: ["React", "Node.js", "TypeScript", "MongoDB"],
      github: "https://github.com/Mahmoud123Jamal/Recipe-app-MERN-Stack.git",
      category: "Web App",
      featured: false,
    },
    {
      title: "AI Chat Bot Application",
      tagline:
        "AI-powered chat application with real-time responses using Gemini API",
      techStack: ["React", "Gemini API", "Fal.ai", "Context API"],
      github: "https://github.com/Mahmoud123Jamal/ai-chatbot-app.git",
      category: "Web Integrated With AI",
      featured: false,
    },
    {
      title: "Multilingual Food Delivery App",
      tagline:
        "Food delivery platform supporting English and Arabic with live search and filtering",
      techStack: ["React", "Redux Toolkit", "i18next", "Bootstrap 5"],
      github: "https://github.com/Mahmoud123Jamal/food-delivery-app.git",
      category: "Web App",
      featured: false,
    },
  ],
  services: [
    {
      title: "Frontend: React & Next.js",
      shortDescription:
        "Specializing in Next.js App Router, Server Components, and Tailwind CSS 4.0 to build SEO-friendly interfaces.",
    },
    {
      title: "Backend: Node, Express & Hybrid Databases",
      shortDescription:
        "Building secure APIs with Node.js. Expert in MongoDB, Neon PostgreSQL, and Drizzle ORM architectures.",
    },
    {
      title: "Full-Stack: MERN & Next.js SaaS",
      shortDescription:
        "Developing end-to-end applications integrating AI (OpenAI/Gemini), Clerk Auth, and real-time features.",
    },
  ],
  workExperience: [
    {
      company: "Information Technology Institute (ITI)",
      position: "React Frontend Trainee",
      period: "July 2022 – August 2022",
      responsibilities: [
        "Contributed to building responsive React components using modern JavaScript",
        "Built responsive UI using HTML, CSS, JavaScript, and React",
        "Worked with GitHub, Redux, Bootstrap, and React Router",
        "Integrated APIs and applied UI/UX best practices",
      ],
    },
  ],
};
