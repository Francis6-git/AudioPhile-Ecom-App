"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

import categoryHeadphones from "@/public/category-headphones.png";
import categorySpeakers from "@/public/category-speakers.png";
import categoryEarphones from "@/public/category-earphones.png";
import heroAbout from "@/public/hero-about.jpg";

export default function Category() {
  const params = useParams();
  const slug = params?.slug as string;

  const categoryProducts = products.filter((p) => p.category === slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#000000] text-white py-8 md:py-[105px]">
        <div className="container-custom">
          <h1 className="text-[28px] md:text-[40px] font-bold tracking-[2px] md:tracking-[1.4px] uppercase text-center">
            {slug}
          </h1>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-[120px] lg:py-[160px]">
        <div className="container-custom space-y-[120px] md:space-y-[120px] lg:space-y-[160px]">
          {categoryProducts.map((product, index) => (
            <div
              key={product.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-[52px] lg:gap-[125px] items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="bg-[#FAFAFA] rounded-lg h-[352px] md:h-[352px] lg:h-[560px] flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="object-contain"
                    width={500}
                    height={500}
                  />
                </div>
              </div>

              <div
                className={`text-center lg:text-left ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                {product.new && (
                  <p className="text-[14px] tracking-[10px] uppercase text-primary mb-4 md:mb-4">
                    New Product
                  </p>
                )}
                <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] font-bold tracking-[1px] md:tracking-[1.4px] uppercase mb-6 md:mb-8">
                  {product.name}
                </h2>
                <p className="text-[15px] leading-[25px] text-black/50 mb-6 md:mb-8 max-w-[572px] mx-auto lg:mx-0">
                  {product.description}
                </p>
                <Link href={`/product/${product.slug}`}>
                  <Button className="bg-primary hover:bg-primary-light text-white h-12 px-8 text-[13px] font-bold tracking-[1px] uppercase cursor-pointer">
                    See Product
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-[120px] md:py-24 lg:py-[120px]">
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

      {/* About Section */}
      <section className="pb-[120px] md:pb-24 lg:pb-[200px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[125px] items-center">
            <div className="lg:order-2">
              <Image
                src={heroAbout}
                alt="Person enjoying audio with premium headphones"
                className="rounded-lg object-cover"
                width={800}
                height={600}
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
                accessories. We have a large showroom and luxury demonstration
                rooms available for you to browse and experience a wide range of
                our products. Stop by our store to meet some of the fantastic
                people who make Audiophile the best place to buy your portable
                audio equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
