import Navigation from './navbar';
import Footer from './footer';
import { getFooterText } from '../lib/footer';

export default function RootLayout({ children, navItems, footerText }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-100">
          <Navigation navItems={navItems} />
        </header>
        <main>{children}</main>
        <Footer footerText={footerText} />
      </body>
    </html>
  );
}

export async function getStaticProps() {
  const footerText = await getFooterText();

  return {
    props: {
      footerText,
    },
  };
}
