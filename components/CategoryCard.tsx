import { ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  image: StaticImageData;
  slug: string;
}

export function CategoryCard({ name, image, slug }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className="relative bg-[#F1F1F1] rounded-lg pt-[88px] pb-[22px] px-6 text-center group hover:scale-105 transition-transform"
    >
      <div className="relative w-[150px] h-[150px] mx-auto -mt-[75px]">
        <Image
          src={image}
          alt={`${name} category`}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-[15px] md:text-[18px] font-bold tracking-[1.3px] uppercase mb-4">
        {name}
      </h3>
      <div className="flex items-center justify-center gap-3 text-[13px] font-bold tracking-[1px] uppercase text-black/50 group-hover:text-primary transition-colors">
        <span>Shop</span>
        <ChevronRight size={16} className="text-primary" />
      </div>
    </Link>
  );
}
