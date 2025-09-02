"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/utils/url";

type Props = {
  route: string;
  placeholder: string;
  icon?: string | React.ReactElement;
  className?: string;
  inputClassName?: string;
  param?: string;
  navigateTo?: string;
  navigateParam?: string;
  onSearch?: (query: string) => void;
  isOnNavbar?: boolean;
  pathVariable?: string;
  onEmpty?: () => void;
};

const LocalSearch = ({
  route,
  placeholder,
  className,
  icon: Icon = <Search className="text-black-40" />,
  param = "query",
  inputClassName,
  navigateTo,
  navigateParam = "query",
  onSearch,
  isOnNavbar,
  pathVariable,
  onEmpty,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  let pathVariableValue: string | undefined;
  if (pathVariable) {
    const paramValue = params[pathVariable];
    const rawValue = Array.isArray(paramValue) ? paramValue[0] : paramValue;

    // Decode the URL parameter to handle special characters and spaces
    pathVariableValue = rawValue ? decodeURIComponent(rawValue) : undefined;
  }

  const query = pathVariableValue || searchParams.get(param) || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (navigateTo) return;

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: param,
          value: searchQuery,
        });

        if (pathname === route || isOnNavbar) {
          router.push(newUrl, { scroll: false });
        }
      } else {
        if (pathname === route || isOnNavbar) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: [param],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, pathname, route, router, searchParams, param, navigateTo]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      if (onSearch) {
        onSearch(searchQuery);
      } else if (navigateTo) {
        if (pathVariable) {
          router.push(`${navigateTo}/${searchQuery}`);
          return;
        }
        const queryParams = new URLSearchParams();
        queryParams.set(navigateParam, searchQuery);

        router.push(`${navigateTo}?${queryParams.toString()}`);
      }
    } else if (e.key === "Enter" && searchQuery.trim() === "" && onEmpty) {
      onEmpty();
    }
  };

  const getIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === "string") {
      return <Image src={Icon} alt={"search"} height={20} width={20} />;
    } else if (Icon && React.isValidElement(Icon)) {
      return <>{Icon}</>;
    }
    return null;
  };

  return (
    <div
      className={`flex min-h-[46px] grow items-center gap-1 rounded-10 border border-secondary-20 bg-white px-4 ${className}`}
    >
      {getIcon()}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`input-primary ${inputClassName}`}
      />
    </div>
  );
};

export default LocalSearch;