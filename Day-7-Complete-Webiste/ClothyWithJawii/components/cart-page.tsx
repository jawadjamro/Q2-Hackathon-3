

'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { inter, poppins } from "@/app/ui/font"
import { useEffect, useState } from 'react';
import { getCartItems, removeFromCart, updateCartQuantity } from '@/app/actions/actions';
import { Product } from '@/types/product';
import { urlFor } from '@/sanity/lib/image';
import toast from "react-hot-toast"
import AuthGuard from "./AuthGuard"

export default function CartPage() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [couponCode, setCouponCode] = useState<string>("");
    const [discount, setDiscount] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        setCartItems(getCartItems());
    }, []);

    const handleRemove = (id: string) => {
        removeFromCart(id);
        setCartItems(getCartItems());
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        updateCartQuantity(id, quantity);
        setCartItems(getCartItems());
    };

    const handleIncrement = (id: string) => {
        const product = cartItems.find(item => item._id === id);
        if (product) {
            handleQuantityChange(id, product.quantity + 1);
        }
    };

    const handleDecrement = (id: string) => {
        const product = cartItems.find(item => item._id === id);
        if (product && product.quantity > 1) {
            handleQuantityChange(id, product.quantity - 1);
        }
    };

    const handleApplyCoupon = () => {
        if (couponCode === "jawiii") {
            setDiscount(50);
            localStorage.setItem("appliedDiscount", "50");
            toast.success(`Congratulations($50 discount)🎉`);
        } else {
            setDiscount(0);
            localStorage.removeItem("appliedDiscount");
            toast.error(`Invalid coupon code. Please try again.`);
        }
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const total = Math.max(subtotal - discount, 0);

    return (
        <AuthGuard>
            <div className={`${inter.className} min-h-screen bg-gray-50`}>
                {/* Breadcrumb */}
                <div className="mt-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 py-3.5">
                            <Link 
                                href="/" 
                                className="text-gray-600 hover:text-black transition-colors text-sm"
                            >
                                Home
                            </Link>
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">Cart</span>
                        </nav>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
                    {/* Cart Table */}
                    <div className="mb-8 overflow-x-auto">
                        <div className="min-w-[600px]">
                            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 sm:gap-8 pb-6 border-b text-sm font-medium text-gray-700">
                                <div>Product</div>
                                <div>Price</div>
                                <div>Quantity</div>
                                <div>Subtotal</div>
                            </div>

                            {cartItems.map((item) => (
                                <div key={item._id} className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 sm:gap-8 py-6 border-b items-center">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <button 
                                            className="text-gray-600 hover:text-black"
                                            onClick={() => handleRemove(item._id)}
                                        >
                                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg">
                                            {item.image && (
                                                <Image
                                                    src={urlFor(item.image).url()}
                                                    alt={"image"}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            )}
                                        </div>
                                        <span className="font-medium text-sm sm:text-base text-gray-800">{item.name}</span>
                                    </div>
                                    <div className="text-sm sm:text-base text-gray-700">${item.price}</div>
                                    <div className="flex items-center border rounded-sm max-w-[72px]">
                                        <button 
                                            className="p-1 sm:p-2 hover:bg-gray-100"
                                            onClick={() => handleDecrement(item._id)}
                                        >
                                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </button>
                                        <span className="w-6 sm:w-8 text-center text-sm sm:text-base text-gray-700">{item.quantity}</span>
                                        <button 
                                            className="p-1 sm:p-2 hover:bg-gray-100"
                                            onClick={() => handleIncrement(item._id)}
                                        >
                                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </button>
                                    </div>
                                    <div className="text-sm sm:text-base text-gray-700">${item.price * item.quantity}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                        <Button 
                            variant="outline" 
                            className="h-10 sm:h-12 px-6 sm:px-12 rounded-lg border-gray-300 hover:bg-gray-100 transition-colors w-full sm:w-auto"
                            onClick={() => router.push('/')}
                        >
                            Return To Shop
                        </Button>
                    </div>

                    {/* Coupon and Cart Total */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input 
                                placeholder="Coupon Code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="h-10 sm:h-12 w-full sm:max-w-[300px] rounded-lg border-gray-300 focus:border-gray-400 focus:ring-0"
                            />
                            <Button 
                                onClick={handleApplyCoupon}
                                className="h-10 sm:h-12 px-6 sm:px-8 bg-blue-600 hover:bg-blue-700 rounded-lg w-full sm:w-auto"
                            >
                                Apply Coupon
                            </Button>
                        </div>

                        <div className="border rounded-lg p-4 sm:p-6 space-y-4 w-full lg:max-w-[470px] lg:ml-auto bg-white">
                            <h2 className={`${poppins.className} text-lg sm:text-xl font-medium mb-4 text-gray-800`}>Cart Total</h2>
                            
                            <div className="flex justify-between py-3 border-b text-sm sm:text-base text-gray-700">
                                <span>Subtotal:</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b text-sm sm:text-base text-gray-700">
                                <span>Discount:</span>
                                <span>-${discount}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b text-sm sm:text-base text-gray-700">
                                <span>Shipping:</span>
                                <span className="text-gray-600">Free</span>
                            </div>
                            <div className="flex justify-between py-3 text-sm sm:text-base text-gray-800">
                                <span>Total:</span>
                                <span>${total}</span>
                            </div>

                            <Button 
                                onClick={() => router.push('/checkout')}
                                className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 rounded-lg mt-4 text-sm sm:text-base"
                            >
                                Proceed to checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            </AuthGuard>
    )
}