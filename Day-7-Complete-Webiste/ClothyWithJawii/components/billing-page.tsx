

"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getCartItems } from '@/app/actions/actions';
import { Product } from '@/types/product';
import { inter } from '@/app/ui/font';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { urlFor } from '@/sanity/lib/image';
import { Input } from './ui/input';
import { Label } from './ui/label';
import toast from 'react-hot-toast';
import { client } from '@/sanity/lib/client';

export default function BillingPage() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [discount, setDiscount] = useState<number>(0); // State for discount
    const [discountCode, setDiscountCode] = useState<string>(''); // State for discount code input
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for order placement
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        phone: '',
        email: ''
    });
    const [formErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        address: false,
        city: false,
        zipCode: false,
        phone: false,
        email: false
    });

    useEffect(() => {
        setCartItems(getCartItems());
        const appliedDiscount = localStorage.getItem("appliedDiscount");
        if (appliedDiscount) {
            setDiscount(Number(appliedDiscount));
        }
    }, []);

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const total = Math.max(subtotal - discount, 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value
        });
    };

    const validateForm = () => {
        const errors = {
            firstName: !formValues.firstName,
            lastName: !formValues.lastName,
            address: !formValues.address,
            city: !formValues.city,
            zipCode: !formValues.zipCode,
            phone: !formValues.phone,
            email: !formValues.email
        };
        setFormErrors(errors);
        return Object.values(errors).every((error) => !error);
    };

    const applyDiscount = () => {
        if (discountCode === 'jawiii') {
            setDiscount(50); // Apply a $10 discount
            localStorage.setItem("appliedDiscount", "10");
            toast.success('Discount applied successfully');
        } else {
            toast.error('Invalid discount code');
        }
    };

    const handlePlaceOrder = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const orderData = {
                    _type: 'order',
                    firstName: formValues.firstName,
                    lastName: formValues.lastName,
                    address: formValues.address,
                    city: formValues.city,
                    zipCode: formValues.zipCode,
                    phone: formValues.phone,
                    email: formValues.email,
                    cartItems: cartItems.map(item => ({
                        _type: 'reference',
                        _ref: item._id,
                    })),
                    total: total,
                    discount: discount,
                    orderDate: new Date().toISOString(),
                };

                localStorage.removeItem("appliedDiscount");

                // **Reset the form**
                setFormValues({
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    zipCode: '',
                    phone: '',
                    email: ''
                });

                await client.create(orderData);
                toast.success('Order placed successfully');
                localStorage.removeItem("appliedDiscount");
                // Optionally redirect to a success page or clear the form
            } catch (error) {
                toast.error('Failed to place order. Please try again.');
                console.error('Error creating order in Sanity:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            toast.error('Please fill in all the required fields.');
        }
    };

    return (
        <div className={`${inter.className} min-h-screen bg-gray-100`}>
            {/* Breadcrumb */}
            <div className="mt-10 bg-white p-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 py-3.5">
                        <Link 
                            href="/cart" 
                            className="text-[#666666] hover:text-blue-600 transition-colors text-sm"
                        >
                            Cart
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[#666666]" />
                        <span className="text-sm text-blue-600">Checkout</span>
                    </nav>
                </div>
            </div>

            {/* Order Summary and Billing Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="border rounded-sm p-4 sm:p-6 space-y-4 w-full bg-white shadow-sm">
                        <h2 className="text-lg sm:text-xl font-medium mb-4 text-blue-600">Order Summary</h2>
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center gap-4 py-3 border-b">
                                <div className="w-16 h-16 overflow-hidden rounded">
                                    {item.image && 
                                    <Image 
                                        src={urlFor(item.image).url()} 
                                        alt={item.name} 
                                        width={64} 
                                        height={64} 
                                        className="object-cover w-full h-full"
                                    />
                                    }
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium">{item.name}</h3>
                                    <p className="text-xs text-[#666666]">Quantity: {item.quantity}</p>
                                </div>
                                <p className="text-sm">${item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    {/* Billing Form */}
                    <div className="border rounded-sm p-4 sm:p-6 space-y-4 w-full bg-white shadow-sm">
                        <h2 className="text-xl sm:text-2xl font-medium mb-6 text-blue-600">Billing Information</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input 
                                        id="firstName" 
                                        placeholder="Enter your first name" 
                                        value={formValues.firstName} 
                                        onChange={handleInputChange} 
                                        aria-invalid={formErrors.firstName ? "true" : "false"}
                                        aria-describedby="firstNameError"
                                    />
                                    {formErrors.firstName && <p id="firstNameError" className="text-red-600 text-sm mt-1">Please enter your first name</p>}
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input 
                                        id="lastName" 
                                        placeholder="Enter your last name" 
                                        value={formValues.lastName} 
                                        onChange={handleInputChange} 
                                        aria-invalid={formErrors.lastName ? "true" : "false"}
                                        aria-describedby="lastNameError"
                                    />
                                    {formErrors.lastName && <p id="lastNameError" className="text-red-600 text-sm mt-1">Please enter your last name</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input 
                                    id="address" 
                                    placeholder="Enter your address" 
                                    value={formValues.address} 
                                    onChange={handleInputChange} 
                                    aria-invalid={formErrors.address ? "true" : "false"}
                                    aria-describedby="addressError"
                                />
                                {formErrors.address && <p id="addressError" className="text-red-600 text-sm mt-1">Please enter your address</p>}
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input 
                                    id="city" 
                                    placeholder="Enter your city" 
                                    value={formValues.city} 
                                    onChange={handleInputChange} 
                                    aria-invalid={formErrors.city ? "true" : "false"}
                                    aria-describedby="cityError"
                                />
                                {formErrors.city && <p id="cityError" className="text-red-600 text-sm mt-1">Please enter your city</p>}
                            </div>
                            <div>
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input 
                                    id="zipCode" 
                                    placeholder="Enter your zip code" 
                                    value={formValues.zipCode} 
                                    onChange={handleInputChange} 
                                    aria-invalid={formErrors.zipCode ? "true" : "false"}
                                    aria-describedby="zipCodeError"
                                />
                                {formErrors.zipCode && <p id="zipCodeError" className="text-red-600 text-sm mt-1">Please enter your zip code</p>}
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input 
                                    id="phone" 
                                    placeholder="Enter your phone number" 
                                    value={formValues.phone} 
                                    onChange={handleInputChange} 
                                    aria-invalid={formErrors.phone ? "true" : "false"}
                                    aria-describedby="phoneError"
                                />
                                {formErrors.phone && <p id="phoneError" className="text-red-600 text-sm mt-1">Please enter your phone number</p>}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    placeholder="Enter your email address" 
                                    value={formValues.email} 
                                    onChange={handleInputChange} 
                                    aria-invalid={formErrors.email ? "true" : "false"}
                                    aria-describedby="emailError"
                                />
                                {formErrors.email && <p id="emailError" className="text-red-600 text-sm mt-1">Please enter your email address</p>}
                            </div>
                        </div>

                        {/* Discount Code Section */}
                        <div className="flex gap-2 mt-4">
                            <Input 
                                id="discountCode" 
                                placeholder="Enter discount code" 
                                value={discountCode} 
                                onChange={(e) => setDiscountCode(e.target.value)} 
                            />
                            <Button 
                                className="bg-blue-500 hover:bg-blue-700 text-white"
                                onClick={applyDiscount}
                            >
                                Apply
                            </Button>
                        </div>

                        {/* Order Summary */}
                        <div className="flex flex-col gap-6 justify-between py-3 text-sm sm:text-base">
                            <div className="flex justify-between py-3 border-b text-sm sm:text-base">
                                <span>Subtotal:</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b text-sm sm:text-base">
                                <span>Discount:</span>
                                <span>-${discount}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b text-sm sm:text-base">
                                <span>Shipping:</span>
                                <span className="text-[#666666]">Free</span>
                            </div>
                            <div className="flex justify-between py-3 border-b text-sm sm:text-base">
                                <span>Total:</span>
                                <span>${total}</span>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <Button 
                            className="w-full h-10 sm:h-12 bg-green-500 hover:bg-green-700 rounded-lg mt-4 text-sm sm:text-base text-white"
                            onClick={handlePlaceOrder}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Placing Order...' : 'Place Order'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}