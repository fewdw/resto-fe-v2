import Link from "next/link";
import Info from "./components/landing-page/Info";
import LandingPageHero from "./components/landing-page/LandingPageHero";
import Navbar from "./components/navbars/Navbar";
import SignInNav from "./components/navbars/SignInNav";

export default function Home() {
  return (
    <div>
      <LandingPageHero />
      <Info />
    </div>
  );
}
