/* eslint-disable tailwindcss/no-custom-classname */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import UseSite from "./use-site";

export const metadata: Metadata = {
  title: "Fyndr Terms of Use",
};

const Terms = () => {
  return (
    <div className="m-20">
      <div className="mb-5 flex w-full justify-center">
        {/* <object type="image/svg+xml" data="logo.svg" width="150"></object> */}
        <Image
          src={"/images/fyndr-logo-blue.png"}
          width={300}
          height={500}
          alt="Fyndr Logo"
        ></Image>
      </div>
      <div className="flex w-full justify-center">
        <span className="text-[2rem]">Fyndr Terms of Use</span>
      </div>
      <br />
      <div className="text-[1.2rem]">
        These Terms of Use were last updated on March 24th, 2024.
      </div>
      <br />
      <div className="text-[1.2rem]">
        Welcome to Fyndr Site (defined below). By using it, you are agreeing to
        these Terms of Use (defined below). Please read them carefully.
      </div>
      <br />
      <div>ACCEPTANCE OF TERMS OF USE</div>
      <br />
      <div className="text-[1.2rem]">
        Fyndr, LLC. (&quot;<strong>Fyndr</strong>&quot; &quot;
        <strong>&nbsp;we</strong>&nbsp;&quot; or &quot;<strong>&nbsp;us</strong>
        &quot; or &quot;<strong>&nbsp;our</strong>&quot;) owns and operates the
        website,
        <Link href="https://www.fyndr.us" className="text-blue-600">
          www.fyndr.us
        </Link>
        , the mobile and touch versions and any sites we have now or in the
        future that reference these Terms of Use (collectively, &quot; Site
        &quot;). By: <br />
        (a) using the Site and Fyndr’s services through the Site, <br />
        (b) signing up for an account and/or
        <br />
        (c) completing a purchase on the Site, <br />
        <br />
        <span className="text-[1.2rem]">
          you agree to these Terms of Use (defined below) and any additional
          terms applicable to certain programs in which you may elect to
          participate. You also agree to our Privacy Statement, incorporated
          herein by reference and located at our website
          <Link href="https://www.fyndr.us" className="text-blue-600">
            www.fyndr.us
          </Link>
          or Mobile App (Menu - Terms & Privacy Policy section), and acknowledge
          that you will regularly visit the Terms of Use (defined below) to
          familiarize yourself with any updates. The Privacy Statement, together
          with these terms of use, and any other terms contained herein or
          incorporated herein by reference, are collectively referred to as the
          &quot;<strong>Terms of Use</strong>&quot;. The term using also
          includes any person or entity that accesses or uses the Site with
          crawlers, robots, data mining, or extraction tools or any other
          functionality.
          <br /> <br />
          By entering your email, signing into your Fyndr account, checking-in
          with businesses and individuals, accepting notifications and offers,
          You agree to share your interaction through QR codes, Your first Name
          and first letter of Last name and/or any information such as location
          etc to establish the interaction. Additionally, you agree to share
          your Information with Businesses while Checking-in & Accepting or
          Declining business terms in order to review/consider/avail their
          goods, services, experiences, facility in person or online through the
          Fyndr platform, website and / or mobile app.
          <br />
          <br />
          By entering your mobile number during signup on Fyndr, you agree to
          receive messages from Fyndr platform. These messages may contain
          one-time passwords, links to the invoice or campaigns.
          <br /> <br />
          IF YOU DO NOT AGREE TO THESE TERMS OF USE, IMMEDIATELY STOP USING THE
          SITE AND DO NOT USE ANY FYNDR SERVICE, PARTICIPATE IN ANY PROGRAM OR
          PURCHASE ANY OFFER, PRODUCT, OR OTHER GOODS OR SERVICE OFFERED THROUGH
          THE SITE, PLATFORM OR MOBILE APP. PLEASE REVIEW THE FOLLOWING SECTIONS
          OF THESE TERMS OF USE CAREFULLY: (Section 22){" "}
          <strong>DISPUTE RESOLUTION/ARBITRATION AGREEMENT</strong>, INCLUDING
          THE <strong>CLASS ACTION WAIVER</strong> DESCRIBED THEREIN,{" "}
          <Link href="#liability" className="text-blue-600">
            (Section 14)
            <strong>LIMITATION OF LIABILITY</strong>
          </Link>
          , AND{" "}
          <Link href="#indemnification" className="text-blue-600">
            (Section 17) <strong>INDEMNIFICATION/RELEASE</strong>
          </Link>
          .
        </span>
        <br /> <br />
        <h3 className="text-[1.5rem]">Table of Contents</h3>
        <ol className="list-decimal pl-9 text-[1.3rem]">
          <li>
            <Link href="#about" className="text-blue-600">
              ABOUT THE SITE
            </Link>
          </li>
          <li>
            <Link href="#ownership" className="text-blue-600">
              OWNERSHIP OF THE SITE
            </Link>
          </li>
          <li>
            <Link href="#use" className="text-blue-600">
              USE OF THE SITE
            </Link>
          </li>
          <li>
            <Link href="#access" className="text-blue-600">
              ACCESS TO THE SITE
            </Link>
          </li>
          <li>
            <Link href="#modification" className="text-blue-600">
              MODIFICATION
            </Link>
          </li>
          <li>
            <Link href="#account" className="text-blue-600">
              YOUR ACCOUNT
            </Link>
          </li>
          <li>
            <Link href="#conduct" className="text-blue-600">
              YOUR CONDUCT
            </Link>
          </li>
          <li>
            <Link href="#privacy" className="text-blue-600">
              YOUR PRIVACY
            </Link>
          </li>
          <li>
            <Link href="#copyright" className="text-blue-600">
              COPYRIGHT AND TRADEMARKS
            </Link>
          </li>
          <li>
            <Link href="#content" className="text-blue-600">
              USER CONTENT
            </Link>
          </li>
          <li>
            <Link href="#unsolicited" className="text-blue-600">
              UNSOLICITED IDEAS
            </Link>
          </li>
          <li>
            <Link href="#reporting" className="text-blue-600">
              INFRINGEMENT REPORTING PROCEDURES AND DIGITAL MILLENNIUM COPYRIGHT
              ACT (DMCA) PROCEDURES
            </Link>
          </li>
          <li>
            <Link href="#disclaimer" className="text-blue-600">
              DISCLAIMER OF WARRANTY
            </Link>
          </li>
          <li>
            <Link href="#liability" className="text-blue-600">
              LIMITATION OF LIABILITY
            </Link>
          </li>
          <li>
            <Link href="#communications" className="text-blue-600">
              ELECTRONIC COMMUNICATIONS
            </Link>
          </li>
          <li>
            <Link href="#others" className="text-blue-600">
              WEBSITES OF OTHERS
            </Link>
          </li>
          <li>
            <Link href="#indemnification" className="text-blue-600">
              INDEMNIFICATION/RELEASE
            </Link>
          </li>
          <li>
            <Link href="#force" className="text-blue-600">
              FORCE MAJEURE
            </Link>
          </li>
          <li>
            <Link href="#assignment" className="text-blue-600">
              ASSIGNMENT
            </Link>
          </li>
          <li>
            <Link href="#agreement" className="text-blue-600">
              ENTIRE AGREEMENT
            </Link>
          </li>
          <li>
            <Link href="#law" className="text-blue-600">
              CHOICE OF LAW
            </Link>
          </li>
          <li>
            <Link href="#dispute" className="text-blue-600">
              DISPUTE RESOLUTION/ARBITRATION AGREEMENT
            </Link>
          </li>
          <li>
            <Link href="#disclosers" className="text-blue-600">
              ADDITIONAL DISCLOSURES
            </Link>
          </li>
        </ol>
        <div className="pt-10 text-[1.5rem]">
          These Terms of Use are as follows:
        </div>
        <br />
        <br />
        <h3 className="text-[1.2rem]">
          <Link href="" className="text-black-600 text-[1.6rem] font-semibold">
            1. About the Site
          </Link>
        </h3>
        <span className="text-[1.2rem] ">
          The “Site” is a platform through which an individual can track their
          interactions & notify their interactions without sharing their contact
          details or identity in order to caution their interactions about the
          potential exposure to any health hazard such as Covid-19. The users
          can also chose to check-in with certain business (“ Business ”) by
          providing their consent to Business’s terms & conditions(“Business
          Terms” or “Business Agreement”) as requested by the business in rder
          to review/avail/purchase proposed goods, services, access to facility
          or experiences (“ Offers ”). Businesses are the owners, sellers and
          issuers of the “Business Terms” and “Offers” and are solely
          responsible to you for the care, quality, and delivery of the goods
          and services provided. In addition, the Site & mobile app also
          provides a platform through which you can purchase products from Fyndr
          (“ Products ”) and participate in other available programs. Certain
          Business Offerings, Products, other available programs and pricing on
          the Site may change at any time in Fyndr’s sole discretion, without
          notice.
        </span>
        <br />
        <br />
        <h3>
          <Link href="" className="text-black-600 text-[1.6rem] font-semibold">
            2. Ownership of the Site
          </Link>
        </h3>
        <span className="text-[1.2rem]">
          {" "}
          The Site and mobile app, any content on the Site, and the
          infrastructure used to provide the Site are proprietary to us, our
          affiliates, Businesss, and other content providers. <br />
          By using the Site and accepting these Terms of Use: <br />
          (a) Fyndr grants you a limited, personal, nontransferable,
          nonexclusive, revocable license to use the Site pursuant to these
          Terms of Use and to any additional terms and policies set forth by
          Fyndr; and <br />
          (b) you agree not to reproduce, distribute, create derivative works
          from, publicly display, publicly perform, license, sell, or re-sell
          any content, software, products, or services obtained from or through
          the Site without the express permission of Fyndr.
        </span>
        <br />
        <br />
        <UseSite />
      </div>
    </div>
  );
};

export default Terms;
