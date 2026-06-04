import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
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

export default function Home() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
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
