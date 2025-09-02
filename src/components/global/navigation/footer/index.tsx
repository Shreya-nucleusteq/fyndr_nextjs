import { LucideIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { FOOTER_MENU } from "@/constants/menu";

import ContactUsModal from "./ContactUsModal";
import SocialLinks from "./social-links";

const Footer = () => {
  const renderIcon = (
    icon: string | LucideIcon | StaticImageData,
    label: string,
    className: string
  ) => {
    if (typeof icon === "string") {
      return <Image src={icon} width={20} height={20} alt={label} />;
    }

    if (typeof icon === "object" && "src" in icon) {
      // This is StaticImageData
      return <Image src={icon} width={20} height={20} alt={label} />;
    }

    // This is a LucideIcon component
    return React.createElement(icon as LucideIcon, {
      className,
    });
  };

  return (
    <footer className="w-full bg-black-90 px-4 py-6 text-black-10">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <SocialLinks />

        <div className="flex gap-4 xs:flex-wrap md:flex-nowrap md:gap-4 lg:ml-2 lg:justify-around lg:gap-2 xl:ml-10 xl:gap-10 2xl:gap-14">
          {FOOTER_MENU.map(({ icon, url, label }, index) => (
            <React.Fragment key={label}>
              {label !== "Contact Us" ? (
                <Link href={url} className="flex items-center gap-2">
                  {renderIcon(
                    icon,
                    label,
                    "w-5 h-5 text-secondary-20 hidden lg:flex"
                  )}
                  <span className="text-sm text-black-10 sm:text-base md:text-[0.8rem] lg:text-base">
                    {label}
                  </span>
                </Link>
              ) : (
                <ContactUsModal>
                  <div className="flex cursor-pointer items-center gap-1">
                    {renderIcon(
                      icon,
                      label,
                      "w-5 h-5 text-light-700 hidden lg:flex"
                    )}
                    <span className="text-sm text-black-10 sm:text-base md:text-[0.8rem] lg:text-base">
                      {label}
                    </span>
                  </div>
                </ContactUsModal>
              )}

              {index < FOOTER_MENU.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="hidden h-6 sm:block"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
