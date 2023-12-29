import { Inter } from "next/font/google";
import Head from "next/head";
import Navbar from "../components/Navbar.js";
import Carousel from "../components/Carousel.js";
import Category from "../components/Category.js";
import Footer from "../components/Footer.js";
import { initFlowbite } from "flowbite";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Thriftie - Feel Trendy. Feel Authentic.</title>
        <meta
          name="description"
          content="Thriftie - Feel Trendy. Feel Authentic."
        />
        <link
          rel="shortcut icon"
          href="/logo.png"
          type="image/x-icon"
        />
        
      </Head>

      <Navbar />
      <Carousel/>
      <Category/>
      <Footer />
    </div>
  );
}
