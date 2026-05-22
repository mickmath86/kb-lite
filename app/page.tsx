import Image from "next/image";
import { HeroLeftAlignedWithDemo } from "../components/sections/hero-left-aligned-with-demo";
import Home02 from "../pages/home-02";
import { StatsFourColumns } from "../components/sections/stats-four-columns";
export default function Home() {
  return (
   <> 
      <Home02 />
      <StatsFourColumns 
      />
   </>
  );
}
