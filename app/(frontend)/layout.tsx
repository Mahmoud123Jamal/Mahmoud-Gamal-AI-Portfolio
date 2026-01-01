import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import ChaChatAiWrapper from "@/components/ui/ChatAiWrapper";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <ChaChatAiWrapper />
      <Footer />
    </div>
  );
}
