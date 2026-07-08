import ScrollProgress from "@/components/ui/ScrollProgress";
import Nav from "@/components/Nav";
import CinematicHero from "@/components/CinematicHero";
import Marquee from "@/components/Marquee";
import Story from "@/components/Story";
import Service from "@/components/Service";
import HowItWorks from "@/components/HowItWorks";
import Sisterhood from "@/components/Sisterhood";
import Lila from "@/components/Lila";
import Future from "@/components/Future";
import Testimonials from "@/components/Testimonials";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import { IG } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Polish Girl Skin Co.",
  description:
    "Personalized, judgment free skincare concierge offering 1:1 virtual consultations and a monthly membership community for women.",
  url: "https://polish-girl-skin-co.vercel.app",
  image: "https://polish-girl-skin-co.vercel.app/opengraph-image.png",
  logo: "https://polish-girl-skin-co.vercel.app/logo.png",
  priceRange: "$149 - $600",
  areaServed: "US",
  sameAs: [IG],
  founder: {
    "@type": "Person",
    name: "Nicole Kaminski",
    jobTitle: "Founder and Skincare Concierge",
  },
};

export default function Home() {
  return (
    <div id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Nav />
      <main>
        <CinematicHero />
        <Marquee />
        <Story />
        <Service />
        <HowItWorks />
        <Sisterhood />
        <Lila />
        <Future />
        <Testimonials />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}
