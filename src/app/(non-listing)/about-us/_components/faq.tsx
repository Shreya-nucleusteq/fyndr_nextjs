/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import HtmlContent from "@/components/global/html-content";
import LocalSearch from "@/components/global/search/local-search";
import { Tabs } from "@/components/ui/tabs";
import ROUTES from "@/constants/routes";
import { useFaqCategories, useFaqQA } from "@/hooks/faq";

type Props = {
  userType: "business" | "individual";
};

const Faq = ({ userType }: Props) => {
  const entityId = userType === "business" ? 2 : 1;
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { categories, selectedCategoryId, setSelectedCategoryId } =
    useFaqCategories(entityId);
  const {
    questions: faqQAList,
    refetch,
  } = useFaqQA(selectedCategoryId, query);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (query.length > 2) {
      refetch();
    }
  }, [query, searchParams]);

  return (
    <section
      id="faq"
      className="w-4/5 scroll-smooth rounded-10 border border-black-10 bg-white px-10 pb-24 shadow-md"
    >
      <div className="flex flex-col items-center justify-center py-6 text-[24px] font-semibold text-black">
        <h3>Frequently Asked Questions By {userType} (FAQs)</h3>
        <span className="mt-4 text-[16px] font-normal">
          Have question? We’re here to help you.
        </span>
        <div className="mb-4 mt-8 flex w-3/6 justify-center">
          <LocalSearch
            route={ROUTES.ABOUT_US}
            icon={"/images/aboutus/home-search-icon.svg"}
            placeholder="Type your question here..."
            className="h-[42px] rounded-10 border border-secondary-20 bg-primary-0.5 px-3"
            inputClassName="pl-2 text-sm text-gray-700"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Tabs className="flex w-full  border-b border-black-10 ">
            <TabsList>
              <div className="overflow-x-auto ">
                <div className="flex flex-nowrap">
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id.toString()}
                      className="relative mx-4 mt-4 whitespace-nowrap border-b-2 border-transparent pb-2 text-[2vw] font-normal text-[#7a8086] data-[state=active]:border-primary data-[state=active]:text-primary sm:text-[2vw] md:text-[2vw] lg:text-[1vw]"
                      onClick={() => setSelectedCategoryId(cat.id)}
                      data-state={
                        selectedCategoryId === cat.id ? "active" : "inactive"
                      }
                    >
                      {cat.name}
                    </TabsTrigger>
                  ))}
                </div>
              </div>
            </TabsList>
          </Tabs>
        </div>
        <div className="mt-10 flex w-full flex-col items-center justify-center">
          {selectedCategoryId &&
            faqQAList?.map((item, index) => (
              <div key={index} className="mb-4 w-full max-sm:mb-4">
                <div
                  className={`size-full border border-black-10 text-left text-[17px] leading-[30px] text-black-80 shadow-md`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "12px",
                    borderRadius:
                      activeIndex === index ? "10px 10px 0px 0px" : "10px",
                    background:
                      activeIndex === index ? "#EAF2FC" : "transparent",
                  }}
                  onClick={() => toggleAccordion(index)}
                >
                  <h2 className="text-left text-[17px] font-normal leading-[30px] text-black-80 max-sm:text-[12px] max-sm:font-medium max-sm:leading-[14.06px]">
                    {item?.question}
                  </h2>
                  <Image
                    src="/images/aboutus/Accordian.png"
                    alt="accordion"
                    width={24}
                    height={24}
                    style={{
                      transform:
                        activeIndex === index
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.5s",
                    }}
                  />
                </div>
                {activeIndex === index && (
                  <div
                    className="border border-t-0 border-black-10 bg-white p-3 text-left text-[15px] font-light leading-[30px] text-black-80 shadow-md max-sm:text-[12px] max-sm:font-medium max-sm:leading-[17px]"
                    style={{
                      borderRadius: "0px 0px 10px 10px",
                      background: "#EAF2FC",
                    }}
                  >
                    <div className="text-[14px] text-black-80">
                      <HtmlContent htmlString={item?.answer} />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
