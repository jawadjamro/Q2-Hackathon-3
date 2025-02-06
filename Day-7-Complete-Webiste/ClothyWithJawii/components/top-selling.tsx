


"use client";

import { client } from "@/sanity/lib/client";
import { topSellingProductsQuery } from "@/sanity/lib/queries";
import { Product } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { addToCart } from "@/app/actions/actions";

const TopSellingProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const products: Product[] = await client.fetch(topSellingProductsQuery);
      setAllProducts(products);
    }

    fetchProducts();
  }, []);



  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent default link behavior
    toast.success(`${product.name} added to cart!`);
    addToCart(product);
  };

  

  return (
    <div className="p-6">
    <div className="grid grid-cols-1 mt-10 lg:grid-cols-4 gap-6">
      {/* Products Section */}
      <section className="lg:col-span-4">
        <h2 className="text-2xl font-semibold mb-6">TOP SELLING</h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 shadow rounded flex flex-col h-full group">
              <Link href={`/product/${product.slug.current}`} className="flex flex-col flex-grow">
                {product.image && (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                )}
  
                <h3 className="text-lg font-medium mt-4">{product.name}</h3>
                <p className="text-gray-600">Price ${product.price}</p>
  
                {/* Add to Cart Button with Hover Effect */}
                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full bg-black text-white py-2 rounded h-10"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
  
  );
};

export default TopSellingProducts;