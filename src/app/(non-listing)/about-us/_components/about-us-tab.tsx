"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AboutUsMap from "./about-us-map";
import Download from "./download";
import Faq from "./faq";
import ForFyndrBusiness from "./for-fyndr-business";
import ForFyndrIndv from "./for-fyndr-Indv";

const AboutUsTab = () => {
  const [activeTab, setActiveTab] = useState<"business" | "individual">(
    "business"
  );

  return (
    <div className="w-full bg-white ">
      <div className="">
        <Tabs defaultValue="business" className="w-full ">
          <TabsList>
            <TabsTrigger
              value="business"
              className="title-4 relative  text-[#7a8086]
               after:absolute
                after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary
                after:transition-all after:duration-0 data-[state=active]:text-primary
                data-[state=active]:after:w-full sm:text-[2vw]
    md:text-[2vw] lg:text-[1.5vw]"
              onClick={() => setActiveTab("business")}
            >
              As a Business Owner
            </TabsTrigger>
            <TabsTrigger
              value="individual"
              className="title-4 relative  text-[#7a8086] after:absolute after:bottom-0
    after:left-0
    after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-0
    data-[state=active]:text-primary data-[state=active]:after:w-full sm:text-[2vw]
    md:text-[2vw] lg:text-[1.5vw]"
              onClick={() => setActiveTab("individual")}
            >
              As an Individual
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="business"
            className="mt-3  pl-16 pr-6 text-[1.7vw] font-normal text-[#7a8086]"
          >
            <ForFyndrBusiness />
          </TabsContent>
          <TabsContent
            value="individual"
            className="mt-3 pl-16 pr-6 text-[1.7vw] font-normal text-[#7a8086]"
          >
            <ForFyndrIndv />
          </TabsContent>
        </Tabs>
      </div>
      <section className="flex justify-center  bg-black py-12">
        <AboutUsMap />
      </section>

      <section className="flex justify-center">
        <Download />
      </section>

      <section className="flex justify-center">
        <Faq userType={activeTab} />
      </section>
    </div>
  );
};

export default AboutUsTab;
