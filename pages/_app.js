import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './src/styles/navigation.css';

// MyApp-komponenten är den globala layouten för alla sidor i applikationen, där den renderar Navbar, den aktuella sidan och Footer på varje sida.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
