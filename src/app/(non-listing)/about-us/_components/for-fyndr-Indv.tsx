import React from "react";

import { SITE_ABOUT } from "@/constants/site";

import AboutRow from "./about-row";

const ForFyndrIndividual = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-4 py-10">
      {SITE_ABOUT.howToUse.individual.map((item, index) => (
        <AboutRow
          key={index}
          title={item.title}
          content={item.content}
          imgURL={item.imgURL}
          imgDir={item.imgDir}
          imageClassName="w-full sm:w-[30%]"
          textClassName="text-[1rem] font-bold text-black-80"
          titleClassName="text-[35px] font-[600] text-primary"
          symbol={true}
        />
      ))}
    </div>
  );
};

export default ForFyndrIndividual;
