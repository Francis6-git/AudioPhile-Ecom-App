"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F1F1]">
      <Navbar />

      <section className="pt-4 md:pt-8 lg:pt-[79px] pb-[97px] md:pb-[116px] lg:pb-[141px]">
        <div className="container-custom">
          <button
            onClick={() => router.back()}
            className="text-[15px] text-black/50 hover:text-primary transition-colors mb-6 md:mb-8 lg:mb-[38px] cursor-pointer"
          >
            Go Back
          </button>
          <CheckoutForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
