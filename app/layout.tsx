import "./globals.css";

export const metadata = {
  title: "Market Anomaly Detection",
  description: "Web App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
