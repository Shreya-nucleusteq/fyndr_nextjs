import Image from "next/image";
import React from "react";

const Download = () => {
  const handlePlayStoreClick = () => {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.fyndr.us";
  };

  const handleAppStoreClick = () => {
    window.location.href = "https://apps.apple.com/in/app/fyndr/id1528140419";
  };
  return (
    <div className="w-full bg-white py-6">
      <div className="hidden sm:block">
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
          <div className="flex items-center justify-center rounded-lg bg-primary p-12">
            <Image
              src="/images/aboutus/downloadUsQr.png"
              width={120}
              height={120}
              alt="QR Code"
              className="h-44 w-auto"
            />
          </div>

          <div className="flex w-3/5 justify-between  rounded-lg bg-[linear-gradient(90deg,_#b6d9ff_-63.27%,_#fff)] pb-16 pl-6 pt-4">
            <div>
              <span className="text-[18px] font-normal leading-[32px] lg:text-[20px] lg:leading-[36px]">
                Explore Your City & Make Life Easier with the Fyndr App.
              </span>

              <div className="flex flex-col gap-2 text-[18px] leading-[34px] lg:text-[20px] lg:leading-[46px]">
                <span className="flex items-center gap-2  font-normal ">
                  • Book appointments effortlessly.
                </span>
                <span className="flex items-center gap-2 font-normal">
                  • Unlock real-time deals near you.
                </span>
                <span className="flex items-center gap-2 font-normal">
                  • Discover tailored campaigns and exclusive offers.
                </span>
              </div>
            </div>

            <div>
              <Image
                src={"/images/aboutus/Transparent-backgroud-fyndr-logo.png"}
                alt="Fyndr Logo"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex  justify-center">
          <div className=" flex w-4/5 flex-col  justify-between gap-8 rounded-lg bg-[#f9f9f9] p-6 md:flex-row">
            <div className="">
              <div className="mb-2 flex items-center gap-2">
                <Image
                  src="/images/aboutus/Transparent-backgroud-fyndr-logo.png"
                  alt="fyndr"
                  width={30}
                  height={30}
                />
                <span className="title-5  text-primary underline">
                  Save Big
                </span>
              </div>
              <div className="body-1 ml-10">
                <span className="text-base font-normal text-gray-700">
                  Save up to 70% on local services, events, and activities with
                  exclusive offers and discounts.
                </span>
                <div className="title-6 mt-4 flex flex-col gap-10 text-[#7F7F7F]">
                  <span className="">Amazing Deals</span>
                  <span className="">Effortless Bookings</span>
                  <span className="">Discover Events</span>
                  <span className="">Easy Navigation</span>
                  <span className="">Personalized Experience</span>
                </div>
              </div>
            </div>

            <div className="flex  justify-center">
              <Image
                src={"/images/aboutus/mobileImageBottom.png"}
                alt="Download Fyndr App and save upto 70% on local services"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[linear-gradient(90deg,_#f0592a_0%,_#253c77_0.01%,_#255577_46.67%)] px-4 py-10 text-white sm:hidden">
        {/* Title */}

        <div className="gap-0">
          <div className="text-center text-[10px] font-semibold leading-[50px] sm:text-[12px] sm:leading-[20px] md:text-[16px]">
            DOWNLOAD THE APP NOW
          </div>

          {/* Play Store + App Store Buttons */}
          <div className="flex flex-col items-center justify-center sm:flex-col  md:flex-row">
            <div className="h-12 cursor-pointer" onClick={handlePlayStoreClick}>
              <Image
                className=""
                src={"/images/aboutus/GooglePlayStoreButton.webp"}
                alt="play store"
                width={100}
                height={100}
              />
            </div>
            <div
              className="h-12 cursor-pointer sm:ml-0 sm:mt-4 md:ml-8"
              onClick={handleAppStoreClick}
            >
              <Image
                className=""
                src={"/images/aboutus/AppStoreButton.webp"}
                alt="app store"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        {/* QR Code Image */}
        <div className="flex items-center justify-center">
          <Image
            src={"/images/aboutus/downloadUsQr.png"}
            alt="QR Code"
            width={150}
            height={150}
            className="w-1/2 object-contain sm:w-1/3"
          />
        </div>
      </div>
    </div>
  );
};

export default Download;
