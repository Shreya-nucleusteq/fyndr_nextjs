"use client";


import { usePathname, useSearchParams ,useRouter} from 'next/navigation';
import React, { useState } from 'react'

import Select from '@/components/global/input/select/index'



const SelectDelivery = () => {

 const [selectedValues, setSelectedValues] = useState<string[]>([]);
      const statusOptions = [
    { label: "Processing", value: "PROCESSING" },
    { label: "Ready to Pick", value: "READY_TO_PICK" },
    { label: "Fulfilled", value: "FULFILLED" },
  ];

   const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    const STATUS_KEY = "deliverystatus";
  
    const handleChange = (newValues: string[]) => {
      setSelectedValues(newValues);
  
      const newSearchParams = new URLSearchParams(searchParams.toString());
  
      if (newValues.length > 0) {
        newSearchParams.set(STATUS_KEY, newValues.join(","));
      } else {
        newSearchParams.delete(STATUS_KEY);
      }
  
       router.push(`${pathname}?${newSearchParams.toString()}`,{
      scroll :false,
    });
    };
  return (
   <Select
     
      multi={true}
      placeholder="Delivery Status"
      options={statusOptions}
      value={selectedValues}
      onValueChange={handleChange}
      className="mr-6 w-60"
   />
  )
}

export default SelectDelivery