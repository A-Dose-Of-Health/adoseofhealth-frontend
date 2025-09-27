import HeroSectionTextHover from "@/components/animata/hero/hero-section-text-hover";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HeroSubText } from "@/components/herosubtext";
import { Navbar } from "@/components/navbar";
import { Navbar2 } from "@/components/navbar2";
import { Navbar3 } from "@/components/navbar3";
import { TheEssentials } from "@/components/the-essentials";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Hero />
      </ContentWrapper>

      {/* <Navbar /> */}
      {/* <HeroSectionTextHover /> */}
      {/* <HeroSubText/> */}
      {/* <Navbar2/> */}
      {/* <TheEssentials /> */}
    </>
  );
}
