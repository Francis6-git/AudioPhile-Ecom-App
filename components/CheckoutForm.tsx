"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/currency";
import { createOrder } from "@/lib/ordersClient";
import { sendOrderConfirmation } from "@/lib/emailService";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const checkoutSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    paymentMethod: z.enum(["e-money", "cash-on-delivery"]),
    eMoneyNumber: z.string().optional(),
    eMoneyPin: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "e-money") {
        return data.eMoneyNumber && data.eMoneyNumber.length > 0;
      }
      return true;
    },
    {
      message: "e-Money number is required",
      path: ["eMoneyNumber"],
    }
  )
  .refine(
    (data) => {
      if (data.paymentMethod === "e-money") {
        return data.eMoneyPin && data.eMoneyPin.length === 4;
      }
      return true;
    },
    {
      message: "e-Money PIN must be 4 digits",
      path: ["eMoneyPin"],
    }
  );

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = 5000; // $50 in cents
  const taxes = Math.round(total * 0.2); // 20% tax
  const grandTotal = total + shippingFee + taxes;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: "e-money",
      eMoneyNumber: "",
      eMoneyPin: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      router.push("/");
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createOrder({
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        shipping: {
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
        },
        paymentMethod: data.paymentMethod,
        paymentDetails:
          data.paymentMethod === "e-money"
            ? {
                eMoneyNumber: data.eMoneyNumber,
                eMoneyPin: data.eMoneyPin,
              }
            : undefined,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingFee,
        taxes,
        subtotal: total,
        total: grandTotal,
      });

      await sendOrderConfirmation(order);
      clearCart();
      router.push(`/order/${order.id}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to complete order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <p className="text-black/50 mb-4">Your cart is empty</p>
        <Button
          onClick={() => router.push("/")}
          className="bg-primary hover:bg-primary-light text-white"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-[30px]">
      <div className="lg:col-span-2 bg-white rounded-lg p-6 md:p-8 lg:p-12">
        <h1 className="text-[28px] md:text-[32px] font-bold tracking-[1px] md:tracking-[1.1px] uppercase mb-8 md:mb-10">
          Checkout
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 md:space-y-[53px]"
          >
            {/* Billing Details */}
            <div>
              <h2 className="text-[13px] font-bold tracking-[0.93px] uppercase text-primary mb-4">
                Billing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-bold">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Alexei"
                          {...field}
                          className="h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-bold">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ward" {...field} className="h-14" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-bold">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="alexei@mail.com"
                          {...field}
                          className="h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-bold">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 202-555-0136"
                          {...field}
                          className="h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <h2 className="text-[13px] font-bold tracking-[0.93px] uppercase text-primary mb-4">
                Shipping Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-[12px] font-bold">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1137 Williams Avenue"
                          {...field}
                          className="h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-bold">
                        ZIP Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10001"
                          {...field}
                          className="h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-bold">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New York"
                          {...field}
                          className="h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-bold">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="United States"
                          {...field}
                          className="h-14"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-[13px] font-bold tracking-[0.93px] uppercase text-primary mb-4">
                Payment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-[12px] font-bold">
                        Payment Method
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-4"
                        >
                          <div className="flex items-center space-x-4 border border-input rounded-lg p-4 h-14 cursor-pointer hover:border-primary">
                            <RadioGroupItem value="e-money" id="e-money" />
                            <Label
                              htmlFor="e-money"
                              className="text-[14px] font-bold cursor-pointer flex-1"
                            >
                              e-Money
                            </Label>
                          </div>
                          <div className="flex items-center space-x-4 border border-input rounded-lg p-4 h-14 cursor-pointer hover:border-primary">
                            <RadioGroupItem
                              value="cash-on-delivery"
                              id="cash-on-delivery"
                            />
                            <Label
                              htmlFor="cash-on-delivery"
                              className="text-[14px] font-bold cursor-pointer flex-1"
                            >
                              Cash on Delivery
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {paymentMethod === "e-money" && (
                  <>
                    <FormField
                      control={form.control}
                      name="eMoneyNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[12px] font-bold">
                            e-Money Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="238521993"
                              {...field}
                              className="h-14"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="eMoneyPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[12px] font-bold">
                            e-Money PIN
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="6891"
                              maxLength={4}
                              {...field}
                              className="h-14"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:hidden bg-primary hover:bg-primary-light text-white h-12 text-[13px] font-bold tracking-[1px] uppercase"
            >
              {isSubmitting ? "Processing..." : "Continue & Pay"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg p-6 md:p-8 h-fit">
        <h2 className="text-[18px] font-bold tracking-[1.3px] uppercase mb-8">
          Summary
        </h2>

        <div className="space-y-6 mb-8">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-[15px] font-bold">{item.name}</h4>
                <p className="text-[14px] text-black/50 font-bold">
                  {formatCurrency(item.price)}
                </p>
              </div>
              <span className="text-[15px] text-black/50 font-bold">
                x{item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-black/50 uppercase">Total</span>
            <span className="text-[18px] font-bold">
              {formatCurrency(total)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-black/50 uppercase">
              Shipping
            </span>
            <span className="text-[18px] font-bold">
              {formatCurrency(shippingFee)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-black/50 uppercase">
              VAT (Included)
            </span>
            <span className="text-[18px] font-bold">
              {formatCurrency(taxes)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <span className="text-[15px] text-black/50 uppercase">
            Grand Total
          </span>
          <span className="text-[18px] font-bold text-primary">
            {formatCurrency(grandTotal)}
          </span>
        </div>

        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full hidden md:block bg-primary hover:bg-primary-light text-white h-12 text-[13px] font-bold tracking-[1px] uppercase"
        >
          {isSubmitting ? "Processing..." : "Continue & Pay"}
        </Button>
      </div>
    </div>
  );
}
