import { FaqSection } from "@/components/faq-section";
import { FinaleSection } from "@/components/finale-section";
import { HeaderThemeSync } from "@/components/header-theme-sync";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { PeopleSection } from "@/components/people-section";
import { SiteHeader } from "@/components/site-header";
import { StoriesSection } from "@/components/stories-section";
import { WhySection } from "@/components/why-section";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-white">
      <div className="relative w-full max-w-[430px]">
        <SiteHeader />
        <HeaderThemeSync />
        <Hero />
        <PeopleSection />
        <WhySection />
        <HowItWorks />
        <StoriesSection />
        <FaqSection />
        <FinaleSection />
      </div>
    </main>
  );
}
