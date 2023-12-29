import "@/styles/globals.css";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
