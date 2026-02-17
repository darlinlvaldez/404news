import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-tech min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}