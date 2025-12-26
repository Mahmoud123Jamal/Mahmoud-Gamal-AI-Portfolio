export const metadata = {
  title: "Sanity Studio",
  description: "Admin dashboard for Mahmoud Gamal Portfolio",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section style={{ margin: 0 }}>{children}</section>;
}
