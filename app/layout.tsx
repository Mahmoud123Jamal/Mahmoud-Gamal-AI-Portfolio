import { ChatAi } from "@/components/ui/ChatAi";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}

          <SanityLive />
          <ChatAi />
        </body>
      </html>
    </ClerkProvider>
  );
}
