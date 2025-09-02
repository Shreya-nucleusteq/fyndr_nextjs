import Image from "next/image";
import React from "react";

import { onGetWalletTransactions } from "@/actions/wallet.action";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

import RedeemPromocodeDialog from "./redeem-promocode-dialog";
import ReferralCode from "./referral-code";

type Props = {
  className?: string;
};

const WalletBalance = async ({ className }: Props) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const { success, data } = await onGetWalletTransactions({
    params: {
      userId: Number(session.user.id),
      pgStart: 1,
      pgSize: 10,
    },
  });

  if (!success || !data) {
    return null;
  }

  return (
    <div
      className={`flex flex-col gap-4 rounded-10 bg-secondary p-6 text-white ${className}`}
    >
      <div className="md:flex-between flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 self-start">
          <div className="flex gap-4">
            <Image
              src={"/images/wallet-coin.svg"}
              alt="wallet-coin"
              height={50}
              width={50}
            />
            <h3 className="flex items-center justify-center text-xl">
              Total Wallet Balance
            </h3>
          </div>
          <div className="text-4xl font-semibold">${data.balance}</div>
          <ReferralCode />
        </div>
        <div className="flex flex-col items-center md:items-end">
          <Image
            src={"/images/wallet-page-img.svg"}
            alt="wallet-page-img"
            height={150}
            width={150}
            className=""
          />
          <p className="body-regular">*Terms and Conditions Apply</p>
        </div>
      </div>
      <p className="body-regular mt-4">
        Refer an individual and receive $5, or refer a business and receive $20
        once they complete their Stripe integration!
      </p>

      <RedeemPromocodeDialog>
        <Button className="h-[46px] self-start !rounded-10 bg-white text-black hover:bg-white">
          Redeem Promo Code
        </Button>
      </RedeemPromocodeDialog>
    </div>
  );
};

export default WalletBalance;
