import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";

import categoryHeadphones from "../public/category-headphones.png";
import categorySpeakers from "../public/category-speakers.png";
import categoryEarphones from "../public/category-earphones.png";
import productZX9 from "../public/product-zx9-speaker.jpg";
import productZX7 from "../public/product-zx7-speaker.jpg";
import productYX1 from "../public/product-yx1-earphones.jpg";
import heroAbout from "../public/hero-about.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#191919] text-white">
        <div className="container-custom">
          <div className="flex flex-col items-center text-center py-[108px] md:py-[126px] lg:py-[128px] lg:items-start lg:text-left lg:max-w-[398px]">
            <p className="text-[14px] tracking-[10px] uppercase text-white/50 mb-6">
              New Product
            </p>
            <h1 className="text-[36px] md:text-[56px] leading-[40px] md:leading-[58px] font-bold tracking-[1.3px] uppercase mb-6">
              XX99 Mark II Headphones
            </h1>
            <p className="text-[15px] leading-[25px] text-white/75 mb-7 md:mb-10 max-w-[349px]">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link href="/product/xx99-mark-two-headphones">
              <Button className="bg-primary hover:bg-primary-light text-white h-12 px-8 text-[13px] font-bold tracking-[1px] uppercase">
                See Product
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-10 md:py-24 lg:py-[120px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[10px] lg:gap-[30px]">
            <CategoryCard
              name="Headphones"
              slug="headphones"
              image={categoryHeadphones}
            />
            <CategoryCard
              name="Speakers"
              slug="speakers"
              image={categorySpeakers}
            />
            <CategoryCard
              name="Earphones"
              slug="earphones"
              image={categoryEarphones}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="pb-[120px] md:pb-24 lg:pb-[200px]">
        <div className="container-custom space-y-8 md:space-y-[48px]">
          {/* ZX9 Speaker */}
          <div className="bg-primary rounded-lg overflow-hidden px-6 pt-[55px] pb-[55px] md:px-[62px] lg:px-[95px] lg:py-[133px] flex flex-col lg:flex-row lg:items-center lg:gap-[138px]">
            <div className="flex justify-center mb-8 lg:mb-0">
              <Image
                src={productZX9}
                alt="ZX9 Speaker"
                className="w-[172px] md:w-[197px] lg:w-[410px] h-auto object-contain"
                priority
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-[36px] md:text-[56px] leading-[40px] md:leading-[58px] font-bold tracking-[1.3px] uppercase text-white mb-6 max-w-[261px] mx-auto lg:mx-0">
                ZX9 Speaker
              </h2>
              <p className="text-[15px] leading-[25px] text-white/75 mb-6 md:mb-10 max-w-[349px] mx-auto lg:mx-0">
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Link href="/product/zx9-speaker">
                <Button className="bg-[#000000] hover:bg-[#4C4C4C] text-white h-12 px-8 text-[13px] font-bold tracking-[1px] uppercase">
                  See Product
                </Button>
              </Link>
            </div>
          </div>

          {/* ZX7 Speaker */}
          <div className="bg-[#F1F1F1] rounded-lg overflow-hidden px-6 md:px-[62px] lg:px-[95px] py-[101px] relative">
            <Image
              src={productZX7}
              alt="ZX7 Speaker"
              className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-lg"
              fill
            />
            <div className="relative z-10">
              <h2 className="text-[28px] font-bold tracking-[2px] uppercase mb-8">
                ZX7 Speaker
              </h2>
              <Link href="/product/zx7-speaker">
                <Button
                  variant="outline"
                  className="border-2 border-black bg-transparent hover:bg-black hover:text-white text-black h-12 px-8 text-[13px] font-bold tracking-[1px] uppercase"
                >
                  See Product
                </Button>
              </Link>
            </div>
          </div>

          {/* YX1 Earphones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[11px] lg:gap-[30px]">
            <div className="bg-[#F1F1F1] rounded-lg h-[200px] md:h-[320px] overflow-hidden relative">
              <Image
                src={productYX1}
                alt="YX1 Earphones"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-[#F1F1F1] rounded-lg px-6 md:px-10 lg:px-[95px] py-[41px] md:py-[101px] flex flex-col justify-center">
              <h2 className="text-[28px] font-bold tracking-[2px] uppercase mb-8">
                YX1 Earphones
              </h2>
              <Link href="/product/yx1-earphones">
                <Button
                  variant="outline"
                  className="border-2 border-black bg-transparent hover:bg-black hover:text-white text-black h-12 px-8 text-[13px] font-bold tracking-[1px] uppercase"
                >
                  See Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="pb-[120px] md:pb-24 lg:pb-[200px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[125px] items-center">
            <div className="lg:order-2">
              <Image
                src={heroAbout}
                alt="Person enjoying audio with premium headphones"
                className="rounded-lg w-full h-[300px] md:h-[300px] lg:h-[588px] object-cover"
                priority
              />
            </div>
            <div className="text-center lg:text-left lg:order-1">
              <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] font-bold tracking-[1px] md:tracking-[1.4px] uppercase mb-8">
                Bringing you the <span className="text-primary">best</span>{" "}
                audio gear
              </h2>
              <p className="text-[15px] leading-[25px] text-black/50">
                Located at the heart of New York City, Audiophile is the premier
                store for high end headphones, earphones, speakers, and audio
                accessories...
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
