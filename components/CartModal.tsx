"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/currency";
import { QuantityInput } from "./QuantityInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

export function CartModal({ open, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } =
    useCart();
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[377px] bg-white">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[18px] font-bold tracking-[1.3px] uppercase">
              Cart ({itemCount})
            </DialogTitle>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[15px] text-black/50 underline hover:text-primary transition-colors"
              >
                Remove all
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="text-center text-black/50 py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-6 max-h-[300px] overflow-y-auto">
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
                    <QuantityInput
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.id, qty)}
                      min={0}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-black/50 uppercase">
                    Total
                  </span>
                  <span className="text-[18px] font-bold">
                    {formatCurrency(total)}
                  </span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary-light text-white h-12 text-[13px] font-bold tracking-[1px] uppercase"
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
