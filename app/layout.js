
import Navigation from '../components/navigation';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-100">
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}