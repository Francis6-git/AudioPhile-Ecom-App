"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/QuantityInput";
import { products } from "@/lib/products";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { formatCurrency } from "@/lib/currency";
import { toast } from "sonner";
import categoryHeadphones from "@/public/category-headphones.png";
import categorySpeakers from "@/public/category-speakers.png";
import categoryEarphones from "@/public/category-earphones.png";
import heroAbout from "@/public/hero-about.jpg";
import Image from "next/image";

export default function Product() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.cartImage,
      quantity,
    });
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Back Button */}
      <section className="pt-4 md:pt-8 lg:pt-[79px]">
        <div className="container-custom">
          <button
            onClick={() => router.back()}
            className="text-[15px] text-black/50 hover:text-primary transition-colors cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-6 md:py-8 lg:py-[56px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-[69px] lg:gap-[125px] items-center">
            <div className="bg-[#F1F1F1] rounded-lg h-[327px] md:h-[480px] lg:h-[560px] flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-auto h-3/4 object-contain"
              />
            </div>
            <div>
              {product.new && (
                <p className="text-[14px] tracking-[10px] uppercase text-primary mb-4 md:mb-4">
                  New Product
                </p>
              )}
              <h1 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] font-bold tracking-[1px] md:tracking-[1.4px] uppercase mb-6 md:mb-8">
                {product.name}
              </h1>
              <p className="text-[15px] leading-[25px] text-black/50 mb-6 md:mb-8">
                {product.description}
              </p>
              <p className="text-[18px] font-bold tracking-[1.3px] mb-8">
                {formatCurrency(product.price)}
              </p>
              <div className="flex gap-4">
                <QuantityInput value={quantity} onChange={setQuantity} />
                <Button
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-primary-light text-white h-12 px-8 text-[13px] font-bold tracking-[1px] uppercase cursor-pointer"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-[88px] md:py-[120px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[88px] lg:gap-[125px]">
            <div className="lg:col-span-2">
              <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.9px] md:tracking-[1.1px] uppercase mb-6 md:mb-8">
                Features
              </h2>
              <p className="text-[15px] leading-[25px] text-black/50 whitespace-pre-line">
                {product.features}
              </p>
            </div>
            <div>
              <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.9px] md:tracking-[1.1px] uppercase mb-6 md:mb-8">
                In the Box
              </h2>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex gap-6">
                    <span className="text-[15px] font-bold text-primary">
                      {item.quantity}x
                    </span>
                    <span className="text-[15px] text-black/50">
                      {item.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="pb-[120px]">
        <div className="container-custom">
          <h2 className="text-[24px] md:text-[32px] font-bold uppercase text-center mb-10 md:mb-16">
            You may also like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-[11px] lg:gap-[30px]">
            {product.others.map((other) => (
              <div key={other.slug} className="text-center">
                <div className="bg-[#F1F1F1] rounded-lg h-[120px] md:h-[318px] mb-8 overflow-hidden flex items-center justify-center">
                  <img
                    src={other.image}
                    alt={other.name}
                    className="w-auto h-3/4 object-contain"
                  />
                </div>
                <h3 className="text-[24px] font-bold uppercase mb-8">
                  {other.name}
                </h3>
                <Link href={`/product/${other.slug}`}>
                  <Button className="bg-primary hover:bg-primary-light text-white h-12 px-8 text-[13px] font-bold uppercase cursor-pointer">
                    See Product
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-[120px]">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[30px]">
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
      </section>

      {/* About Section */}
      <section className="pb-[120px] lg:pb-[200px]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[125px] items-center">
          <div className="lg:order-2">
            <Image
              src={heroAbout}
              alt="Person enjoying audio with premium headphones"
              className="rounded-lg w-full h-[300px] md:h-[300px] lg:h-[588px] object-cover"
              priority
            />
          </div>
          <div className="text-center lg:text-left lg:order-1">
            <h2 className="text-[28px] md:text-[40px] font-bold uppercase mb-8">
              Bringing you the <span className="text-primary">best</span> audio
              gear
            </h2>
            <p className="text-[15px] leading-[25px] text-black/50">
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories...
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
