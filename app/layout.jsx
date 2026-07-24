import "./homepage.css";
import "./chatbot.css";

export const metadata = {
  title: "Best Patcharapon | Test Engineer & Developer Portfolio",
  description:
    "Portfolio of Best Patcharapon — Test Engineer and Software Developer based in Chiang Mai, Thailand.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
