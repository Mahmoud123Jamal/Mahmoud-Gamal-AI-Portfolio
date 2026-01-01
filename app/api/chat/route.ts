import { NextResponse } from "next/server";
import { staticPortfolioData } from "@/lib/staticPortfolioData";

const queryCache = new Map<string, { reply: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const lowerMessage = message.toLowerCase().trim();

    // Check cache
    const now = Date.now();
    const cachedResponse = queryCache.get(lowerMessage);
    if (cachedResponse && now - cachedResponse.timestamp < CACHE_TTL) {
      return NextResponse.json({
        reply: cachedResponse.reply,
        cached: true,
        success: true,
        timestamp: cachedResponse.timestamp,
      });
    }

    // Use static data
    const { profile, education, skills, projects, services, workExperience } =
      staticPortfolioData;

    let aiReply = "";
    let usedAI = false;
    let aiModel = "none";

    // Try Llama 3.2 3B Instruct (FREE) via OpenRouter
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (apiKey) {
      try {
        console.log("🤖 Attempting Llama 3.2 3B Instruct (Free)...");

        const systemPrompt = `You are ${profile.firstName} ${profile.lastName}, a ${profile.headline}. You are speaking in first person about your portfolio.

PORTFOLIO INFORMATION:
- Name: ${profile.firstName} ${profile.lastName}
- Title: ${profile.headline}
- Bio: ${profile.shortBio}
- Experience: ${profile.yearsOfExperience} year${profile.yearsOfExperience > 1 ? "s" : ""}
- Location: ${profile.location}
- Contact: ${profile.email} | ${profile.phone}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}

EDUCATION:
- ${education.degree} in ${education.faculty}
- ${education.University}, ${education.location}
- GPA: ${education.gpa} | Graduated: ${education.graduationDate}
- Achievements: ${education.achievements.join(", ")}

TECHNICAL SKILLS:
${skills.map((s) => `- ${s.name} (${s.category}, ${s.proficiency})`).join("\n")}

PROJECTS:
${projects.map((p) => `- ${p.title}: ${p.tagline}. Technologies: ${p.techStack.join(", ")}. GitHub: ${p.github}`).join("\n")}

WORK EXPERIENCE:
- ${workExperience[0].position} at ${workExperience[0].company} (${workExperience[0].period})
- Responsibilities: ${workExperience[0].responsibilities.join(", ")}

SERVICES OFFERED:
${services.map((s) => `- ${s.title}: ${s.shortDescription}`).join("\n")}

PERSONAL INTERESTS:
- Technology and programming
- Learning new frameworks and tools
- Sports (football/soccer)
- Food (pizza, different cuisines)
- Reading tech blogs
- Travel and exploration

RESPONSE GUIDELINES:
1. Answer in first person as ${profile.firstName}
2. Be professional but friendly and conversational
3. Provide detailed, comprehensive answers
4. Use emojis occasionally to make it engaging
5. For technical questions: explain thoroughly with examples
6. For personal questions: answer naturally and conversationally
7. Structure answers clearly with paragraphs(4 or 5 sentences)
8. Mention specific projects when relevant
9. Include contact info when asked about hiring or contact
10. Do not fake data
`;

        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
              "HTTP-Referer":
                process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3005",
              "X-Title": `${profile.firstName}'s Portfolio`,
            },
            body: JSON.stringify({
              model: "meta-llama/llama-3.2-3b-instruct:free", // Llama 3.2 3B Instruct FREE
              messages: [
                {
                  role: "system",
                  content: systemPrompt,
                },
                {
                  role: "user",
                  content: message,
                },
              ],
              max_tokens: 500,
              temperature: 0.8,
            }),
          }
        );

        if (response.ok) {
          const data: OpenRouterResponse = await response.json();
          aiReply = data.choices?.[0]?.message?.content?.trim() || "";

          if (aiReply && aiReply.length > 50) {
            usedAI = true;
            aiModel = "Llama 3.2 3B Instruct";
            console.log(
              "✅ Llama AI response received, length:",
              aiReply.length
            );
          } else {
            console.log("⚠️ AI response too short, using fallback");
          }
        } else {
          const errorText = await response
            .text()
            .catch(() => "Could not read error");
          console.error(
            "❌ OpenRouter API error:",
            response.status,
            errorText.substring(0, 200)
          );
        }
      } catch (error: any) {
        console.error("❌ Llama API fetch error:", error.message);
      }
    } else {
      console.log("⚠️ No OpenRouter API key configured");
    }

    // Use static responses if AI failed or not configured
    if (!aiReply || !usedAI) {
      console.log("🔄 Using enhanced static responses");
      const firstName = profile.firstName;
      const fullName = `${profile.firstName} ${profile.lastName}`;

      if (
        lowerMessage.includes("football") ||
        lowerMessage.includes("play football") ||
        lowerMessage.includes("soccer")
      ) {
        aiReply = `⚽ Yes, I do enjoy football! While I'm more focused on coding these days, I definitely appreciate a good game of football. It's a great way to stay active and clear my mind after long coding sessions. The teamwork and strategy in football actually remind me of collaborative programming projects where everyone has a role to play and communication is key for success!`;
      } else if (
        lowerMessage.includes("pizza") ||
        lowerMessage.includes("eat pizza") ||
        lowerMessage.includes("food")
      ) {
        aiReply = `🍕 Absolutely love pizza! It's one of my favorite foods to enjoy while working on coding projects. There's something about pizza that makes debugging sessions more enjoyable! My go-to is usually a classic Margherita or pepperoni, but I'm always up for trying new toppings. Food and coding are a surprisingly good combination - the energy boost helps me tackle complex problems!`;
      } else if (
        lowerMessage.includes("hobby") ||
        lowerMessage.includes("hobbies") ||
        lowerMessage.includes("interest") ||
        lowerMessage.includes("like to do")
      ) {
        aiReply = `🎯 Outside of programming, I have several interests that help me maintain a balanced lifestyle:

• **Sports & Fitness:** Football, swimming, and gym workouts to stay active
• **Food Exploration:** Trying different cuisines - big fan of Italian, Japanese, and Middle Eastern food
• **Tech Learning:** Constantly exploring new frameworks, tools, and programming languages
• **Reading:** Tech blogs, documentation, and occasionally sci-fi novels
• **Gaming:** Strategy games that challenge problem-solving skills
• **Travel:** Exploring new places and cultures when possible

These activities help me stay refreshed and often provide new perspectives that I bring back to my development work!`;
      } else if (
        lowerMessage.includes("how are you") ||
        lowerMessage.includes("how's it going") ||
        lowerMessage.includes("what's up")
      ) {
        aiReply = `👋 I'm doing great, thanks for asking! Just here sharing my passion for web development and helping people learn about my portfolio. It's always exciting to talk about technology, projects, and development approaches. How about you? What brings you to my portfolio today?`;
      } else if (
        lowerMessage.includes("weather") ||
        lowerMessage.includes("temperature") ||
        lowerMessage.includes("outside")
      ) {
        aiReply = `🌤️ I'm based in ${profile.location}, but honestly, I spend most of my time indoors coding and building awesome web applications! The weather is always perfect for programming in my climate-controlled workspace. Speaking of which, have you checked out any of my projects? I'd love to tell you more about what I've been building!`;
      } else if (
        lowerMessage.includes("joke") ||
        lowerMessage.includes("funny") ||
        lowerMessage.includes("humor")
      ) {
        aiReply = `😄 Why do programmers prefer dark mode? Because light attracts bugs! 

Or here's another one: What's a programmer's favorite hangout spot? The Foo Bar!

All joking aside, I find programming itself quite enjoyable - there's something truly satisfying about solving complex problems and seeing your code come to life. Want to hear about some of the interesting technical challenges I've tackled in my projects?`;
      } else if (
        (lowerMessage.includes("can you") ||
          lowerMessage.includes("are you") ||
          lowerMessage.includes("do you") ||
          lowerMessage.includes("tell me if you")) &&
        (lowerMessage.includes("frontend") ||
          lowerMessage.includes("react") ||
          lowerMessage.includes("next.js") ||
          lowerMessage.includes("mern"))
      ) {
        aiReply = `Yes, absolutely! 🚀 I'm a ${profile.headline} specializing in ${lowerMessage.includes("mern") ? "MERN stack" : "React and Next.js"} development.

**My Frontend Expertise:**
I have comprehensive expertise in React development including modern features like hooks, context API, React Router, and performance optimization techniques. With Next.js, I leverage powerful features such as server-side rendering, static site generation, API routes, and the App Router architecture to build SEO-friendly, high-performance applications.

**MERN Stack Development:**
For full-stack projects, I work with MongoDB for database design, Express.js for building robust RESTful APIs, and Node.js for server-side logic. I create seamless integrations between frontend and backend systems with an emphasis on clean architecture, scalability, and maintainability.

**Project Experience:**
I've successfully implemented these technologies in production projects including:
• **AI Story Generator:** Uses Next.js for server-side rendering and OpenAI API integration
• **Doctor Appointment System:** Full MERN stack application with role-based access control
• **RecipeHub:** TypeScript-based recipe sharing platform

With ${profile.yearsOfExperience} year of professional experience, I can confidently handle complex frontend and full-stack development projects! 💻`;
      } else if (
        lowerMessage.includes("project") ||
        lowerMessage.includes("have you worked on") ||
        lowerMessage.includes("built") ||
        lowerMessage.includes("portfolio")
      ) {
        aiReply = `I've built several comprehensive projects that showcase my full-stack development capabilities. Here's a detailed overview: 🎯\n\n`;

        projects.forEach((project, index) => {
          aiReply += `${index + 1}. **${project.title}**\n`;
          aiReply += `   **Description:** ${project.tagline}\n`;
          aiReply += `   **Technologies:** ${project.techStack.join(", ")}\n`;
          aiReply += `   **GitHub:** ${project.github}\n`;

          if (project.title.toLowerCase().includes("ai story")) {
            aiReply += `   **Key Features:** AI-powered story generation, user authentication, responsive design with Tailwind CSS, story saving functionality\n`;
          } else if (project.title.toLowerCase().includes("doctor")) {
            aiReply += `   **Key Features:** Role-based access control, appointment scheduling, secure JWT authentication, admin dashboard\n`;
          } else if (project.title.toLowerCase().includes("recipe")) {
            aiReply += `   **Key Features:** Recipe sharing platform, image uploads, user profiles, search functionality\n`;
          }
          aiReply += `\n`;
        });

        aiReply += `**Development Approach:** Each project follows industry best practices including proper documentation, version control with Git, responsive design, and performance optimization.`;
      } else if (
        lowerMessage.includes("skill") ||
        lowerMessage.includes("technolog") ||
        lowerMessage.includes("tech stack") ||
        lowerMessage.includes("what can you do")
      ) {
        aiReply = `My technical skillset is comprehensive and spans the entire development stack: 🛠️\n\n`;

        const frontendSkills = skills.filter((s) => s.category === "frontend");
        const backendSkills = skills.filter((s) => s.category === "backend");
        const databaseSkills = skills.filter((s) => s.category === "database");
        const toolSkills = skills.filter((s) => s.category === "tools");

        if (frontendSkills.length > 0) {
          aiReply += `🎨 **Frontend Development:**\n`;
          frontendSkills.slice(0, 6).forEach((s) => {
            aiReply += `• ${s.name} (${s.proficiency})\n`;
          });
          aiReply += `\n`;
        }

        if (backendSkills.length > 0) {
          aiReply += `⚙️ **Backend Development:**\n`;
          backendSkills.slice(0, 5).forEach((s) => {
            aiReply += `• ${s.name} (${s.proficiency})\n`;
          });
          aiReply += `\n`;
        }

        if (databaseSkills.length > 0) {
          aiReply += `🗄️ **Databases:**\n`;
          databaseSkills.forEach((s) => {
            aiReply += `• ${s.name} (${s.proficiency})\n`;
          });
          aiReply += `\n`;
        }

        aiReply += `**Specialized Expertise:**\n`;
        aiReply += `• Full-Stack MERN Development\n`;
        aiReply += `• Modern React & Next.js Applications\n`;
        aiReply += `• RESTful API Design & Development\n`;
        aiReply += `• Responsive Web Design & UI/UX\n`;
        aiReply += `• Performance Optimization\n\n`;
        aiReply += `I'm always expanding my skills and staying updated with the latest technologies! 📚`;
      } else if (
        lowerMessage.includes("experience") ||
        lowerMessage.includes("background") ||
        lowerMessage.includes("work history") ||
        lowerMessage.includes("tell me about yourself")
      ) {
        aiReply = `I'm ${fullName}, a ${profile.headline} with ${profile.yearsOfExperience} year of professional experience. 🎓\n\n`;
        aiReply += `${profile.shortBio}\n\n`;

        aiReply += `**Professional Experience:**\n`;
        aiReply += `• **Position:** ${workExperience[0].position}\n`;
        aiReply += `• **Company:** ${workExperience[0].company}\n`;
        aiReply += `• **Period:** ${workExperience[0].period}\n`;
        aiReply += `• **Key Responsibilities:** ${workExperience[0].responsibilities.slice(0, 3).join(", ")}\n\n`;

        aiReply += `**Education:**\n`;
        aiReply += `• ${education.degree} in ${education.faculty}\n`;
        aiReply += `• ${education.University}, ${education.location}\n`;
        aiReply += `• GPA: ${education.gpa} | Graduated: ${education.graduationDate}\n\n`;

        aiReply += `I'm passionate about building scalable, high-performance applications and continuously improving my skills!`;
      } else if (
        lowerMessage.includes("contact") ||
        lowerMessage.includes("email") ||
        lowerMessage.includes("hire") ||
        lowerMessage.includes("get in touch") ||
        lowerMessage.includes("available")
      ) {
        aiReply = `I'd love to connect and explore potential opportunities! 🤝\n\n`;
        aiReply += `📧 **Email:** ${profile.email}\n`;
        aiReply += `📱 **Phone:** ${profile.phone}\n`;
        aiReply += `📍 **Location:** ${profile.location}\n\n`;
        aiReply += `🔗 **Professional Profiles:**\n`;
        aiReply += `• **GitHub:** ${profile.github}\n`;
        aiReply += `• **LinkedIn:** ${profile.linkedin}\n\n`;
        aiReply += `**I'm available for:**\n`;
        aiReply += `• Full-time development positions\n`;
        aiReply += `• Freelance projects\n`;
        aiReply += `• Technical consulting\n`;
        aiReply += `• Open source collaborations\n\n`;
        aiReply += `Let's discuss how I can contribute to your next project! 🚀`;
      } else if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("hey") ||
        lowerMessage.includes("greetings")
      ) {
        aiReply = `Hello there! 👋 I'm ${firstName}, a ${profile.headline}.\n\n`;
        aiReply += `I'm excited to share my journey in web development with you! I can tell you about:\n`;
        aiReply += `• My projects and technical skills 🚀\n`;
        aiReply += `• My experience with React, Next.js, and MERN stack 💻\n`;
        aiReply += `• How to contact me for opportunities 🤝\n`;
        aiReply += `• Or just have a friendly chat! 🎯\n\n`;
        aiReply += `What would you like to know about my portfolio?`;
      } else if (
        lowerMessage.includes("who are you") ||
        lowerMessage.includes("your name") ||
        lowerMessage.includes("mahmoud") ||
        lowerMessage.includes("ghoraba")
      ) {
        aiReply = `I'm ${fullName} 👋\n\n`;
        aiReply += `A ${profile.headline} passionate about building modern web applications.\n\n`;
        aiReply += `${profile.shortBio}\n\n`;
        aiReply += `I'm passionate about creating scalable, high-performance applications and continuously learning new technologies. When I'm not coding, you might find me exploring new frameworks, contributing to open source, or enjoying sports and good food!`;
      } else {
        aiReply = `I'm ${fullName}, a ${profile.headline} specializing in modern web development. 🌟\n\n`;
        aiReply += `I can help you with information about:\n`;
        aiReply += `1. My technical skills and capabilities 🛠️\n`;
        aiReply += `2. Projects I've built and their technologies 🚀\n`;
        aiReply += `3. My professional experience and education 📚\n`;
        aiReply += `4. How to contact me for opportunities 🤝\n`;
        aiReply += `5. Or just have a friendly conversation! 🎯\n\n`;
        aiReply += `What interests you most about my portfolio?`;
      }
    }

    // Cache the response
    queryCache.set(lowerMessage, { reply: aiReply, timestamp: now });

    return NextResponse.json({
      reply: aiReply,
      success: true,
      usedAI: usedAI,
      aiModel: aiModel,
      fallback: !usedAI,
      cached: false,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        reply: `Hi! I'm ${staticPortfolioData.profile.firstName} ${staticPortfolioData.profile.lastName}, a ${staticPortfolioData.profile.headline}. I specialize in React, Next.js, and MERN stack development with experience building AI-powered applications, healthcare systems, and recipe platforms. Feel free to ask me about my projects, skills, or just say hello!`,
        success: false,
        fallback: true,
      },
      { status: 200 }
    );
  }
}

export async function GET() {
  // Clean up cache
  const now = Date.now();
  for (const [key, value] of queryCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      queryCache.delete(key);
    }
  }

  const hasApiKey = !!process.env.OPENROUTER_API_KEY;

  return NextResponse.json({
    message: "Portfolio Chat API",
    status: "active",
    aiEnabled: hasApiKey,
    aiModel: hasApiKey
      ? "Llama 3.2 3B Instruct (Free)"
      : "Static responses only",
    note: "Using OpenRouter with free Llama 3.2 3B model",
    endpoint: "/api/chat",
    methods: ["POST", "GET"],
    capabilities: [
      "Portfolio questions (projects, skills, experience)",
      "Technical discussions",
      "General conversation (sports, food, hobbies)",
      "Contact information",
      "Professional services",
    ],
    timestamp: new Date().toISOString(),
    cacheSize: queryCache.size,
  });
}

export const dynamic = "force-dynamic";
