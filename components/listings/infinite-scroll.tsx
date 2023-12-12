"use client";

import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { apiClient } from "@/lib/apiClient";
import { useSession } from "next-auth/react";

type TInfiniteScrollProps = {
  initialData: any;
  sizePerPage: number;
  hasMore: boolean;
  endpoint: string;
  keyProp: string;
  Component: FC<any>;
};

export function InfiniteScroll({
  initialData, // these will be send from the server, but also rendered in the client, they have to be exactly the same
  sizePerPage, // the number of items each request will load
  hasMore, // just in case there are no more (just those shown by the server)
  endpoint, // api endpoing to get more data
  keyProp, // will be use to create the query key, so cache is not shared between "consumers" of this component
  Component, // component that will be rendered with the "data"
}: TInfiniteScrollProps) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.toString());

  const { data: session } = useSession();
  const currentUser = session?.user;

  // initialize the search params
  useEffect(() => {
    setSearch(searchParams.toString());
  }, [searchParams]);

  // intersection hook entry is true when the user
  const { ref, entry } = useIntersection({
    rootMargin: "500px",
    threshold: 0,
  });

  // ### CREATE THE INITIAL DATA ###
  // We need to format the initial data as the infinite scroll expects it
  const formattedInitialData = {
    // the initial data
    pages: Array.from(
      // 'pages' is an array created by dividing the 'initialData' into chunks (pages) of data
      // based on the specified 'sizePerPage'.
      // Array.from creates an array from an array-like or iterable object, that EXPECTS A LENGTH PROPERTY
      { length: Math.ceil(initialData.length / sizePerPage) }, // total number of pages needed (elements in the array)

      (_, index) => {
        return {
          // map function, creating each page
          data: initialData.slice(
            sizePerPage * index,
            sizePerPage * (index + 1),
          ), // take the elements for each page
          pageParam: index + 1, // the page number we are in
          // + info about the pagination
          pagination: {
            nextPage: hasMore ? index + 2 : false,
            hasMorePages: hasMore,
          },
        };
      },
    ),

    // The page param in our case is the page number
    pageParams: Array.from(
      { length: Math.ceil(initialData.length / sizePerPage) },
      (_, index) => index + 1,
    ),
  };
  //   So we build two arrays:
  //  - pages: an array of objects, each object is a page, with the data, the page number and the pagination info
  //  - pageParams: an array of page params (page numbers in our case)
  // ### END CREATE THE INITIAL DATA ###

  //   ### FETCH DATA ###
  // We need to define the way to get more data on the client (we will use the pageparam)
  const fetchData = async (page = 1) => {
    const response = await apiClient
      .get(
        `${endpoint}?page=${page}&pageSize=${sizePerPage}&${searchParams.toString()}`,
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
    return response;
  };
  //   ### END FETCH DATA ###

  // ### USE INFINITE QUERY ###
  // Now we have the initial data and the way to get more data, we can use the infinite query hook
  const {
    error,
    data, // Data accumulated from all pages: InfiniteData<...>
    fetchNextPage, // fetches the next page
    fetchPreviousPage, // fetches the previous page
    isFetchingNextPage, // is the next page currently being fetched?
    isFetchingPreviousPage, // is the previous page currently being fetched?
    hasNextPage, // is there a next page?
    hasPreviousPage, // is there a previous page?
    isLoading, // is the first page currently being fetched?
    isFetching,
    status, // 'error' | 'loading' | 'success' - the status of the hook
    isInitialLoading,
  } = useInfiniteQuery({
    queryKey: [keyProp, search], // the query key, which is used to determine if the query is fresh or if it should use cached data

    // 1. Provide the initial data
    initialData: () => {
      return formattedInitialData;
    },

    // 2. Provide the way to get more data (the query function)
    // Given the pageparam (the context), should return: { data: any, pageParam?: any, pagination?: any }
    queryFn: async (
      { pageParam = 1 }, // query function. receives a queryFunctionContext object (wich I guess includes pageParam -> in our case the page number): https://tanstack.com/query/v4/docs/react/guides/query-functions#queryfunctioncontext
    ) => {
      const response = await fetchData(pageParam);
      const { pagination } = response;
      return { data: response.data, pageParam, pagination }; // this will be lastpage in getNextPageParam
    },

    // 3. Provide the way to get the next page param so it can be used in the queryFn
    // stablish the next page param (in our case, the next page number)
    // if it returns false, hasNextPage will be false and we can stop fetching
    getNextPageParam: (lastPage, allPages) => {
      //   if (lastPage?.pagination.hasMorePages === false) return false;
      if (lastPage?.pagination.hasMorePages === false) return undefined;
      return lastPage?.pagination.nextPage; // this will be the next page number in the previous function (the queryFn)
    },

    // 4. Provide config options
    refetchOnWindowFocus: false, // by default, when the window gets focused, the query will refetch
    refetchOnMount: false, // by default, when the query mounts, it will refetch
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      // if the last post is intersecting
      if (hasNextPage) fetchNextPage(); // and tere is a next page, then fetch
    }
  }, [entry, fetchNextPage, hasNextPage]);

  if (error) {
    return <div>Something went wrong</div>;
  }

  const allElements = data?.pages.flatMap((page) => page.data); // get all the elements from all the pages

  return (
    <>
      {allElements.map((element, i) => {
        // Create a new props object with the dynamic key and the data
        const childProps = {
          data: element,
          currentUser: currentUser,
          imagePriority: true,
        };

        return (
          // if it's the last post of the last page, we set the ref
          <div
            key={element.id}
            ref={i === allElements.length - 1 ? ref : null}
            className={"inline"}
          >
            <Component {...childProps} />
          </div>
        );
      })}

      {isFetchingNextPage &&
        Array.from({ length: sizePerPage }, (_, index) => (
          <Skeleton key={index} className={`h-full`}></Skeleton>
        ))}
    </>
  );
}
