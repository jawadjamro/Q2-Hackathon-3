


"use client";

import { client } from "@/sanity/lib/client";
import { allProductsQuery } from "@/sanity/lib/queries";
import { Product } from "@/types/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { addToCart } from "../actions/actions";
import toast from "react-hot-toast";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const ExploreProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<number>(2500);

  useEffect(() => {
    async function fetchProducts() {
      const products: Product[] = await client.fetch(allProductsQuery);
      setAllProducts(products);
      setFilteredProducts(products);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter(product => product.price <= priceRange);
    setFilteredProducts(filtered);
  }, [priceRange, allProducts]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent default link behavior
    toast.success(`${product.name} added to cart!`);
    addToCart(product);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(e.target.value));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Section */}
        <aside className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Price</h3>
            <input 
              type="range" 
              min="50" 
              max="2500" 
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full" 
            />
            <p>Max Price: ${priceRange}</p>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Colors</h3>
            {/* Add color filters here */}
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Size</h3>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button key={size} className="px-4 py-2 border hover:bg-black hover:text-white rounded">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-black text-white py-2 rounded mt-4">
            Apply Filters
          </button>
        </aside>

        {/* Products Section */}
        <section className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-6">Casual</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white p-4 shadow rounded flex flex-col h-full">
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
            
                {/* Add to Cart Button at Bottom */}
                <div className="mt-auto">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full bg-black text-white py-2 rounded h-10"
                  >
                    Buy Now
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

export default ExploreProducts;