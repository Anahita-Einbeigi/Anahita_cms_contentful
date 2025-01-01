import Navigation from './navbar';
import Footer from './footer';
import { getFooterText } from '../lib/footer';

// RootLayout-komponenten hanterar sidans struktur med en (children), (navItems) och (footerText) som props. 
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

// getStaticProps hämtar statisk data för sidfoten från getFooterText vid byggtiden, vilket gör det möjligt att förladda innehållet i sidfoten.
export async function getStaticProps() {
  const footerText = await getFooterText();

  return {
    props: {
      footerText,
    },
  };
}
