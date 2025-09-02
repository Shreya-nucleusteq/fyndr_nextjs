import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FyndrUse from "./fyndr-use";
import FyndrUsesInfo from "./fyndr-uses-info";
import PrivacyStatement from "./privacy-statement";

export const metadata: Metadata = {
  title: "Fyndr Privacy Statement",
};

const Privacy = () => {
  const textSize = "text-[1.2rem]";
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
        <span className="text-[2rem]">Fyndr Privacy Statement</span>
      </div>
      <div>
        <div className="pb-10 text-[1.2rem]">
          Effective Date: March 24th, 2024
        </div>
        <p className="text-[1.2rem]">
          This Privacy Statement (&ldquo;<strong>Privacy Statement</strong>
          &rdquo;) explains how Fyndr, LLC., its affiliates, and its
          subsidiaries (&ldquo;<strong>Fyndr</strong>,&rdquo; &ldquo;
          <strong>us</strong>,&rdquo; &ldquo;<strong>our</strong>,&rdquo; and
          &ldquo;<strong>we</strong>&rdquo;) use your information that applies
          to all who use our websites and platforms &ndash; including mobile
          applications, touch technologies, electronic services, social
          networking sites, interactive features, online services or any of our
          described online activities we own or control (collectively, the
          &ldquo;<strong>Service</strong>&rdquo;). For terms that govern the use
          of the Service, please review the Service&rsquo;s Terms of Use on our
          website <Link href="http://www.fyndr.us">www.fyndr.us</Link> or on
          mobile app (Menu 🡪 Terms &amp; Privacy Policy)
        </p>
        <p className={`${textSize}`}>
          <strong>
            By using the Service, you acknowledge you have read the terms of
            this Privacy Statement. If you do not want your information handled
            as described in this Privacy Statement, please do not provide us
            with your information or interact with the Service.
          </strong>
        </p>
        <p className="text-[1.2rem]">
          We may modify this Privacy Statement at any time. If we make any
          material changes, we will notify you by email (sent to the email
          address specified in your account) or by means of notice on the
          Service prior to the change becoming effective. You can determine when
          this Privacy Statement was last revised by referring to the
          &rdquo;Effective Date&rdquo; above.
        </p>
        <p className="text-[1.2rem]">
          This Privacy Statement is organized as follows:
        </p>
      </div>
      <PrivacyStatement/>
      <FyndrUse/>
      <FyndrUsesInfo/>
      
    </div>
  );
};

export default Privacy;
