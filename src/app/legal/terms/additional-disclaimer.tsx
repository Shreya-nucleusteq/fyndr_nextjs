/* eslint-disable tailwindcss/no-custom-classname */
import Link from "next/link";
import React from "react";

const AdditionalDisclaimer = () => {
  return (
    <>
      <h3>
        {" "}
        <Link href="" className="text-black-600 text-[1.4rem] font-bold">
          23. Additional Disclosures
        </Link>
      </h3>
      <span className="text-[1.2rem]">
        {" "}
        No waiver by either you or Fyndr of any breach or default or failure to
        exercise any right allowed under these Terms of Use is a waiver of any
        preceding or subsequent breach or default or a waiver or forfeiture of
        any similar or future rights under our Terms of Use. The section
        headings used herein are for convenience only and shall be of no legal
        force or effect. If a court of competent jurisdiction holds any
        provision of our Terms of Use invalid, such invalidity shall not affect
        the enforceability of any other provisions contained in these Terms of
        Use, and the remaining portions of our Terms of Use shall continue in
        full force and effect.
        <br />
        <br />
        You are contracting with Fyndr, LLC. Correspondence should be directed
        to: Fyndr, LLC. 3793 E Covey lane Phoenix, AZ, 85050.
        <br />
        <br />
        If you are a California resident, you may report complaints to the
        Complaint Assistance Unit of the Division of Consumer Services of the
        California Department of Consumer Affairs by contacting them in writing
        at 1625 North Market Blvd., Suite N-112, Sacramento, California 95834,
        or by telephone at (800) 952-5210.
        <br />
        <br />
        The provisions of these Terms of Use apply equally to, and are for the
        benefit of, Fyndr, its subsidiaries, affiliates, Business, and its
        third-party content providers and licensors, and each shall have the
        right to assert and enforce such provisions directly.
      </span>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default AdditionalDisclaimer;
