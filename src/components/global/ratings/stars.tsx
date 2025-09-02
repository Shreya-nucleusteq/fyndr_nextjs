import React from "react";

import Star from "@/components/icons/star";

type Props = {
  outOf?: number;
  ratings: number;
};

const Stars = ({ ratings = 0, outOf = 5 }: Props) => {
  if (ratings > outOf) ratings = outOf;



  return (
    <div className="flex">
     {Array.from({ length: outOf }, (_, index) => {
        if (index + 1 <= ratings) {
          return <Star key={index} varient="filled" />;
        } else if (index < ratings && ratings % 1 !== 0 && index + 1 > Math.floor(ratings)) {
          return <Star key={index} varient="half" />;
        } else {
          return <Star key={index} varient="empty" />;
        }
      })}
    </div>
  );
};

export default Stars;
