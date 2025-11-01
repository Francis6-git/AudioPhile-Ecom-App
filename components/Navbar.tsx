"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { CartModal } from "./CartModal";
import Link from "next/link";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <header className="bg-[#101010] border-b border-white/10">
        <div className="container-custom">
          <nav className="flex items-center justify-between h-[90px] md:h-[96px]">
            <button
              className="lg:hidden text-white cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex items-center">
              <span className="text-white text-2xl font-bold tracking-wider">
                audiophile
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-[34px]">
              <Link
                href="/"
                className="text-white text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/category/headphones"
                className="text-white text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
              >
                Headphones
              </Link>
              <Link
                href="/category/speakers"
                className="text-white text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
              >
                Speakers
              </Link>
              <Link
                href="/category/earphones"
                className="text-white text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
              >
                Earphones
              </Link>
            </div>

            <button
              className="relative text-white hover:text-primary transition-colors cursor-pointer"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>

          {mobileMenuOpen && (
            <div className="lg:hidden pb-8">
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-white text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/category/headphones"
                  className="text-white text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Headphones
                </Link>
                <Link
                  href="/category/speakers"
                  className="text-white text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Speakers
                </Link>
                <Link
                  href="/category/earphones"
                  className="text-white text-[13px] font-bold tracking-[2px] uppercase hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Earphones
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
