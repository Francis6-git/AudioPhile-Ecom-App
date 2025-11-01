import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#101010] text-white">
      <div className="container-custom">
        <div className="border-t-4 border-primary pt-12 md:pt-14 lg:pt-[75px] pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="md:col-span-2 lg:col-span-4">
              <Link href="/" className="inline-block mb-8 lg:mb-9">
                <span className="text-2xl font-bold tracking-wider">
                  audiophile
                </span>
              </Link>
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <p className="text-white/50 text-[15px] leading-[25px] max-w-[540px]">
                Audiophile is an all in one stop to fulfill your audio needs.
                We're a small team of music lovers and sound specialists who are
                devoted to helping you get the most out of personal audio. Come
                and visit our demo facility - we're open 7 days a week.
              </p>
            </div>

            <div className="md:col-span-1 lg:col-span-2 md:flex md:justify-end lg:justify-end">
              <nav className="flex flex-col md:flex-row lg:flex-col md:gap-8 lg:gap-4 gap-4">
                <Link
                  href="/"
                  className="text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/category/headphones"
                  className="text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
                >
                  Headphones
                </Link>
                <Link
                  href="/category/speakers"
                  className="text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
                >
                  Speakers
                </Link>
                <Link
                  href="/category/earphones"
                  className="text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
                >
                  Earphones
                </Link>
              </nav>
            </div>
          </div>

          <div className="mt-12 lg:mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <p className="text-white/50 text-[15px] font-bold">
              Copyright 2021. All Rights Reserved
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
