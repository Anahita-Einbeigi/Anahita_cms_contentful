import Navigation from '../components/navigation';
import Footer from '../components/footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-100">
          <Navigation />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}