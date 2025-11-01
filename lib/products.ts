import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    slug: "xx99-mark-two-headphones",
    name: "XX99 Mark II Headphones",
    category: "headphones",
    categoryImage: "/category-headphones.png",
    new: true,
    price: 299900,
    description:
      "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    features:
      "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening...",
    includes: [
      { quantity: 1, item: "Headphone unit" },
      { quantity: 2, item: "Replacement earcups" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 5m audio cable" },
      { quantity: 1, item: "Travel bag" },
    ],
    gallery: {
      first: "/product-xx99-mark-two.jpg",
      second: "/product-xx99-mark-two.jpg",
      third: "/product-xx99-mark-two.jpg",
    },
    others: [
      {
        slug: "xx99-mark-one-headphones",
        name: "XX99 Mark I",
        image: "/product-xx99-mark-one.jpg",
      },
      {
        slug: "xx59-headphones",
        name: "XX59",
        image: "/product-xx59.jpg",
      },
      {
        slug: "zx9-speaker",
        name: "ZX9 Speaker",
        image: "/product-zx9-speaker.jpg",
      },
    ],
    image: "/product-xx99-mark-two.jpg",
    cartImage: "/product-xx99-mark-two.jpg",
  },
  {
    id: "2",
    slug: "xx99-mark-one-headphones",
    name: "XX99 Mark I Headphones",
    category: "headphones",
    categoryImage: "/category-headphones.png",
    new: false,
    price: 179900,
    description:
      "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction...",
    features:
      "As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise...",
    includes: [
      { quantity: 1, item: "Headphone unit" },
      { quantity: 2, item: "Replacement earcups" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 5m audio cable" },
    ],
    gallery: {
      first: "/product-xx99-mark-one.jpg",
      second: "/product-xx99-mark-one.jpg",
      third: "/product-xx99-mark-one.jpg",
    },
    others: [
      {
        slug: "xx99-mark-two-headphones",
        name: "XX99 Mark II",
        image: "/product-xx99-mark-two.jpg",
      },
      {
        slug: "xx59-headphones",
        name: "XX59",
        image: "/product-xx59.jpg",
      },
      {
        slug: "zx9-speaker",
        name: "ZX9 Speaker",
        image: "/product-zx9-speaker.jpg",
      },
    ],
    image: "/product-xx99-mark-one.jpg",
    cartImage: "/product-xx99-mark-one.jpg",
  },
  {
    id: "3",
    slug: "xx59-headphones",
    name: "XX59 Headphones",
    category: "headphones",
    categoryImage: "/category-headphones.png",
    new: false,
    price: 89900,
    description:
      "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones.",
    features:
      "These headphones have been created from durable, high-quality materials tough enough to take anywhere...",
    includes: [
      { quantity: 1, item: "Headphone unit" },
      { quantity: 2, item: "Replacement earcups" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 5m audio cable" },
    ],
    gallery: {
      first: "/product-xx59.jpg",
      second: "/product-xx59.jpg",
      third: "/product-xx59.jpg",
    },
    others: [
      {
        slug: "xx99-mark-two-headphones",
        name: "XX99 Mark II",
        image: "/product-xx99-mark-two.jpg",
      },
      {
        slug: "xx99-mark-one-headphones",
        name: "XX99 Mark I",
        image: "/product-xx99-mark-one.jpg",
      },
      {
        slug: "zx9-speaker",
        name: "ZX9 Speaker",
        image: "/product-zx9-speaker.jpg",
      },
    ],
    image: "/product-xx59.jpg",
    cartImage: "/product-xx59.jpg",
  },
  {
    id: "4",
    slug: "zx9-speaker",
    name: "ZX9 Speaker",
    category: "speakers",
    categoryImage: "/category-speakers.png",
    new: true,
    price: 449900,
    description:
      "Upgrade your sound system with the all new ZX9 active speaker.",
    features:
      "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B...",
    includes: [
      { quantity: 2, item: "Speaker unit" },
      { quantity: 2, item: "Speaker cloth panel" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 10m audio cable" },
      { quantity: 1, item: "10m optical cable" },
    ],
    gallery: {
      first: "/product-zx9-speaker.jpg",
      second: "/product-zx9-speaker.jpg",
      third: "/product-zx9-speaker.jpg",
    },
    others: [
      {
        slug: "zx7-speaker",
        name: "ZX7 Speaker",
        image: "/product-zx7-speaker.jpg",
      },
      {
        slug: "xx99-mark-one-headphones",
        name: "XX99 Mark I",
        image: "/product-xx99-mark-one.jpg",
      },
      {
        slug: "xx59-headphones",
        name: "XX59",
        image: "/product-xx59.jpg",
      },
    ],
    image: "/product-zx9-speaker.jpg",
    cartImage: "/product-zx9-speaker.jpg",
  },
  {
    id: "5",
    slug: "zx7-speaker",
    name: "ZX7 Speaker",
    category: "speakers",
    categoryImage: "/category-speakers.png",
    new: false,
    price: 349900,
    description:
      "Stream high quality sound wirelessly with minimal to no loss.",
    features:
      "Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate...",
    includes: [
      { quantity: 2, item: "Speaker unit" },
      { quantity: 2, item: "Speaker cloth panel" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 7.5m audio cable" },
      { quantity: 1, item: "7.5m optical cable" },
    ],
    gallery: {
      first: "/product-zx7-speaker.jpg",
      second: "/product-zx7-speaker.jpg",
      third: "/product-zx7-speaker.jpg",
    },
    others: [
      {
        slug: "zx9-speaker",
        name: "ZX9 Speaker",
        image: "/product-zx9-speaker.jpg",
      },
      {
        slug: "xx99-mark-one-headphones",
        name: "XX99 Mark I",
        image: "/product-xx99-mark-one.jpg",
      },
      {
        slug: "xx59-headphones",
        name: "XX59",
        image: "/product-xx59.jpg",
      },
    ],
    image: "/product-zx7-speaker.jpg",
    cartImage: "/product-zx7-speaker.jpg",
  },
  {
    id: "6",
    slug: "yx1-earphones",
    name: "YX1 Wireless Earphones",
    category: "earphones",
    categoryImage: "/category-earphones.png",
    new: true,
    price: 59900,
    description:
      "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones.",
    features:
      "Experience unrivalled stereo sound thanks to innovative acoustic technology...",
    includes: [
      { quantity: 2, item: "Earphone unit" },
      { quantity: 6, item: "Multi-size earplugs" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "USB-C charging cable" },
      { quantity: 1, item: "Travel pouch" },
    ],
    gallery: {
      first: "/product-yx1-earphones.jpg",
      second: "/product-yx1-earphones.jpg",
      third: "/product-yx1-earphones.jpg",
    },
    others: [
      {
        slug: "xx99-mark-one-headphones",
        name: "XX99 Mark I",
        image: "/product-xx99-mark-one.jpg",
      },
      {
        slug: "xx59-headphones",
        name: "XX59",
        image: "/product-xx59.jpg",
      },
      {
        slug: "zx9-speaker",
        name: "ZX9 Speaker",
        image: "/product-zx9-speaker.jpg",
      },
    ],
    image: "/product-yx1-earphones.jpg",
    cartImage: "/product-yx1-earphones.jpg",
  },
];

/**
 * Helper functions
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}
