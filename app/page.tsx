import Link from "next/link";
import Info from "./components/landing-page/Info";
import LandingPageHero from "./components/landing-page/LandingPageHero";
import Navbar from "./components/navbars/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <LandingPageHero />
      <Info />
    </div>
  );
}
