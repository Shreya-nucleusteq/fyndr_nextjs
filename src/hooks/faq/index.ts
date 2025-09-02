import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  onGetFaqCategories,
  onGetFaqQuestions,
} from "@/actions/aboutus.action";

type FaqCategory = {
  id: number;
  name: string;
  entityId?: number;
};

export const useFaqCategories = (entityId: number) => {
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["faqCategories", entityId],
    queryFn: () => onGetFaqCategories({ params: { entityId } }),
  });

  useEffect(() => {
    if (!data?.data) return;

    const fetchedCategories = [...data.data];

    const desiredOrder = [
      "About Fyndr",
      "Registration",
      "Campaigns",
      "Using Fyndr",
    ];

    const getOrder = (name: string) =>
      desiredOrder.includes(name)
        ? desiredOrder.indexOf(name)
        : desiredOrder.length;

    fetchedCategories.sort((a, b) => getOrder(a.name) - getOrder(b.name));

    setCategories(fetchedCategories);

    if (fetchedCategories.length > 0) {
      setSelectedCategoryId(fetchedCategories[0].id);
    }
  }, [data]);

  return {
    categories,
    selectedCategoryId,
    setCategories,
    setSelectedCategoryId,
    isLoading,
  };
};

export const useFaqQA = (categoryId: number | null, searchStr = "") => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["faqQA", categoryId, searchStr],
    queryFn: () =>
      onGetFaqQuestions({
        params: {
          categoryId: categoryId!,
          searchStr,
        },
      }),
    // refetchOnWindowFocus: false,
    enabled: !!categoryId,
  });

  const questions = data?.success ? data.data : [];

  return {
    questions,
    isLoading,
    isError,
    refetch,
  };
};
