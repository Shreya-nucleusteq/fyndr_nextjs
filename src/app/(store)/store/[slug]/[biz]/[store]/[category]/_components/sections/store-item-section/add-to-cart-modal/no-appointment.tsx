"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";

import Button from "@/components/global/buttons";
import ROUTES from "@/constants/routes";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

type Props = {
  onAddToCart: (mode: "NO_APPOINTMENT") => void;
};

const NoAppointment = ({ onAddToCart }: Props) => {
  const [transition, startTransition] = useTransition();
  const { items } = useStoreCartStore();

  const handleAddToCart = () => {
    startTransition(async () => {
      onAddToCart("NO_APPOINTMENT");
    });
  };

  return (
    <div className="flex-between relative z-20 gap-4 rounded-b-10 border-t border-secondary-20 bg-white p-4">
      {items.length > 0 ? (
        <Button variant="primary" stdHeight stdWidth asChild>
          <Link href={ROUTES.STORE_CART}>Checkout</Link>
        </Button>
      ) : (
        <div></div>
      )}
      <Button
        variant="primary-outlined"
        stdHeight
        stdWidth
        onClick={handleAddToCart}
        disabled={transition}
      >
        <ShoppingCart size={20} className="!size-5" />{" "}
        {transition ? "Adding to cart" : "Add to cart"}
      </Button>
    </div>
  );
};

export default NoAppointment;
