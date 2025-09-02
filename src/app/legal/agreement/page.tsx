import { Metadata } from "next";
import Image from "next/image";

import OfferProgram from "./offer-program";
export const metadata: Metadata = {
  title: "Fyndr Business Terms & Conditions",
};

const Agreement = () => {
  const textSize = "text-[1.2rem]";
  return (
    <div className="m-20">
      <div className="mb-5 flex w-full justify-center">
        <Image
          src={"/images/fyndr-logo-blue.png"}
          width={300}
          height={500}
          alt="Fyndr Logo"
        ></Image>
      </div>
      <div className="flex w-full justify-center">
        <span className="text-[2rem]">Fyndr Business Terms & Conditions</span>
      </div>
      <br />

      <div className={`${textSize}`}>
        <p>Effective date March 24th, 2024</p>
        <br />

        <p>
          A <strong>Business</strong> is an establishment, Non-Profit or For
          Profit that participates in tracking customer interaction based on
          customer disclosures (with or without knowing the customer identity)
          <strong>and/or</strong> Offers services &amp; products for
          consideration or purchase with or without money transaction
          <strong>and/or</strong> Presents the Terms of Service to the customers
          / consumers in order to obtain their electronic consent. Referred
          collectively as <strong>&ldquo;Business&rdquo;</strong> in the
          contract.
        </p>
      </div>
      <br />

      <div className={`${textSize}`}>
        <p>
          These Business Terms and Conditions
          <strong>(&ldquo;Terms and Conditions&rdquo;)</strong> govern and are
          incorporated into the Fyndr Business Agreement between Fyndr and
          Business (collectively, the&nbsp;
          <strong>&ldquo;Agreement&rdquo;</strong>). Fyndr, subject to the
          provisions of this paragraph, may amend the Terms and Conditions in
          its sole discretion and at any time. The most recent version of the
          Terms and Conditions (as may be amended by Fyndr from time to time)
          will be available: (i) in Fyndr&rsquo;s Business Center, and/or (ii)
          as part of the Fyndr website. Business agrees that either or both of
          these notification methods constitute adequate notice to inform
          Business of any amendments to the Agreement and Business further
          agrees to be bound by any such amendments to the Agreement upon such
          notification.
        </p>
      </div>
      <br />
      <OfferProgram />
    </div>
  );
};

export default Agreement;
