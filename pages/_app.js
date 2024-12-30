import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './src/styles/navigation.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
