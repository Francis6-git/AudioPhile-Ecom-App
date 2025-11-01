"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getOrderById } from "@/lib/ordersClient";
import { Order } from "@/lib/types";
import { formatCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmation() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId)
        .then((data) => setOrder(data))
        .finally(() => setLoading(false));
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F1F1]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F1F1]">
        <div className="text-center">
          <p className="text-xl mb-4">Order not found</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary-light text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const firstItem = order.items[0];
  const otherItemsCount = order.items.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F1F1] p-6">
      <div className="bg-white rounded-lg p-8 md:p-12 max-w-[540px] w-full text-center">
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-primary mb-6" />
          <h1 className="text-[24px] md:text-[32px] font-bold tracking-[1.1px] uppercase mb-4">
            Thank you
            <br />
            for your order
          </h1>
          <p className="text-[15px] text-black/50 mb-6">
            You will receive an email confirmation shortly.
          </p>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg overflow-hidden mb-8">
          <div className="bg-[#F1F1F1] p-6">
            <div className="flex items-center gap-4 mb-3">
              <img
                src={firstItem.image}
                alt={firstItem.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 text-left">
                <h4 className="text-[15px] font-bold">{firstItem.name}</h4>
                <p className="text-[14px] text-black/50 font-bold">
                  {formatCurrency(firstItem.price)}
                </p>
              </div>
              <span className="text-[15px] text-black/50 font-bold">
                x{firstItem.quantity}
              </span>
            </div>

            {otherItemsCount > 0 && (
              <>
                <hr className="border-black/10 my-3" />
                <p className="text-[12px] text-black/50 font-bold text-center">
                  and {otherItemsCount} other item
                  {otherItemsCount > 1 ? "s" : ""}
                </p>
              </>
            )}
          </div>

          <div className="bg-[#000] text-white p-6 text-left">
            <p className="text-[15px] text-white/50 uppercase mb-2">
              Grand Total
            </p>
            <p className="text-[18px] font-bold">
              {formatCurrency(order.total)}
            </p>
          </div>
        </div>

        <Link href="/">
          <Button className="w-full bg-primary hover:bg-primary-light text-white h-12 text-[13px] font-bold tracking-[1px] uppercase cursor-pointer">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
