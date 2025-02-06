



// import React from "react";

// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import { getBannersData } from "@/sanity/lib/getData";
// import { BannerData } from "@/types/banner";

// const Banner = async () => {
//   const banners: BannerData[] = await getBannersData();
//   const singleBanner = banners[0];

//   return (
//     <div className="w-full ">
//       {singleBanner?.image && (
//         <Image
//           width={1920}
//           height={1080}
//           src={urlFor(singleBanner?.image)?.url()}
//           alt={"hero-banner"}
//           className="object-cover w-full h-full"
//           priority
//         />
//       )}
      
//     </div>
//   );
// };

// export default Banner;


"use client"


import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { bannerQuery } from '@/sanity/lib/queries';
import { BannerData } from '@/types/banner';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// const Main = async () => {

export default function Main() {


  const [allProducts, setAllProducts] = useState<BannerData[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const products: BannerData[] = await client.fetch(bannerQuery);
      setAllProducts(products);
    }

    fetchProducts();
  }, []);

  
  return (
    <section className="bg-gray-50 py-16">
                {allProducts.map((item) => (

              <div key={item._id}>

      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text Content */}

        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight mb-6">
           {item.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
           {item.subtitle}
          </p>
          <button className="bg-black text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-gray-800">
            <Link href="/shop">Shop Now</Link>
          </button>
        </div>

        {/* Image Section */}
        <div className="relative md:w-1/2">
          <div className="w-full h-full aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">

            <Image
              width={2500} 
              height={2500} 
              src={urlFor(item.image).url()} 
              alt={item.title} 
              className="object-cover w-full h-full"
            />
          </div>



          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 md:top-20 md:left-20 text-black text-3xl font-extrabold">
            ★ {/* Star Symbol */}
          </div>
          <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 text-black text-3xl font-extrabold">
            ★ {/* Star Symbol */}
          </div>

        </div>
      </div>


      {/* Brand Logos Section */}
      <div className="mt-16 bg-black py-4">
        <div className="container mx-auto flex justify-around items-center">
        <div className="flex  justify-around items-center gap-6 md:gap-12 p-4 bg-black text-white text-lg md:text-2xl">
  <div className="flex flex-col items-center">
    <i className="fas fa-crown text-xl md:text-3xl"></i>
    <span>VERSACE</span>
  </div>
  <div className="flex flex-col items-center">
    <i className="fas fa-tshirt text-xl md:text-3xl"></i>
    <span>ZARA</span>
  </div>
  <div className="flex flex-col items-center">
    <i className="fas fa-gem text-xl md:text-3xl"></i>
    <span>GUCCI</span>
  </div>
  <div className="flex flex-col items-center">
    <i className="fas fa-shopping-bag text-xl md:text-3xl"></i>
    <span>PRADA</span>
  </div>
  {/* <div className="flex flex-col items-center">
    <i className="fas fa-tag text-xl md:text-3xl"></i>
    <span>Calvin Klein</span>
  </div> */}
</div>

        </div>
      </div>
      </div>
    ))}



    </section>
  );
};

