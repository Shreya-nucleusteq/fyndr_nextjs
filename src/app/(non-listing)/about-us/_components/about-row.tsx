import Image from "next/image";
import React from "react";

interface Props {
  imgURL: string;
  title: string;
  content: string;
  imgDir?: "left" | "right";
  imageClassName?: string;
  textClassName?: string;
  titleClassName?: string;
  symbol?: boolean;
}

const AboutRow = ({
  imgDir = "left",
  title,
  content,
  imgURL,
  imageClassName = "",
  textClassName = "",
  titleClassName = "",
  symbol,
}: Props) => {
  return (
    <div
      className={`flex flex-col-reverse gap-8 md:flex-row ${imgDir === "right" ? "md:flex-row-reverse" : ""}`}
    >
      <Image
        src={imgURL}
        alt={title}
        width={300}
        height={300}
        className={`mx-auto block object-contain ${
          imageClassName || (imgDir === "left" ? "max-w-80" : "max-w-64")
        }`}
      />
      <div className=" relative flex flex-col space-y-2">
        {symbol && (
          <div className="absolute left-[-14px] top-[-10px] rotate-45 text-[1rem] font-bold text-[#1e90ff]">
            &#9886;
          </div>
        )}
        <h1
          className={`text-[30px] font-normal leading-[42px] text-primary ${titleClassName}`}
        >
          {title}
        </h1>
        <p
          className={`paragraph-regular max-w-4xl first-letter:text-2xl ${textClassName}`}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default AboutRow;
