"use client";

import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { apiClient } from "@/lib/apiClient";

export function InfiniteScroll({
  initialData, // these will be send from the server, but also rendered in the client, they have to be exactly the same
  sizePerPage, // the number of items each request will load
  hasMore, // just in case there are no more (just those shown by the server)
  endpoint, // api endpoing to get more data
  keyProp,
  Component, // component that will be rendered with the "data"
  currentUser, // to ad functionality like "like" or add to board
  filter, // TODO: I think this one is not necesary anymore...we are solving it with the searchparams already
}) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.toString());

  // initialize the search params
  useEffect(() => {
    setSearch(searchParams.toString());
  }, [searchParams]);

  // intersection hook entry is true when the user
  const { ref, entry } = useIntersection({
    margin: "100px",
    threshold: 0,
  });

  // We need to format the initial data as the infinite scroll expects it
  const formattedInitialData = {
    // the initial data
    pages: Array.from(
      // 'pages' is an array created by dividing the 'initialData' into chunks (pages) of data
      // based on the specified 'sizePerPage'.
      { length: Math.ceil(initialData.length / sizePerPage) }, // total number of pages needed (elements in the array)

      (_, index) => ({
        // map function, creating each page
        data: initialData.slice(sizePerPage * index, sizePerPage * (index + 1)),
        pageParam: index + 1,
        pagination: {
          nextPage: hasMore ? index + 2 : false,
        },
      }),
    ),

    pageParams: Array.from(
      { length: Math.ceil(initialData.length / sizePerPage) },
      (_, index) => index + 1,
    ),
  };

  const fetchData = async (page = 1) => {
    const response = await apiClient
      .get(
        `${endpoint}?page=${page}&pageSize=${sizePerPage}&${searchParams.toString()}${
          filter ? `&contentSlug=${filter.contentSlug}` : ""
        }
        `,
      )
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
    return response;
  };

  const {
    error,
    data,
    fetchNextPage, // fetches the next page
    isFetchingNextPage, // is the next page currently being fetched?
    isFetchingPreviousPage, // is the previous page currently being fetched?
    hasNextPage, // is there a next page?
    hasPreviousPage, // is there a previous page?
    isLoading, // is the first page currently being fetched?
    isFetching,
    isInitialLoading,
  } = useInfiniteQuery({
    queryKey: [keyProp, search], // the query key, which is used to determine if the query is fresh or if it should use cached data

    queryFn: async (
      { pageParam = 1 }, //mockFetch(pageParam), // query function. receives a queryFunctionContext object: https://tanstack.com/query/v4/docs/react/guides/query-functions#queryfunctioncontext
    ) => {
      const response = await fetchData(pageParam);
      const { pagination } = response;
      return { data: response.data, pageParam, pagination }; // this will be lastpage in getNextPageParam
    },

    // stablish the next page param (in our case, the next page number)
    // if it returns false, hasNextPage will be false and we can stop fetching
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.pagination.hasMorePages === false) return false;
      return lastPage?.pagination.nextPage; // this will be the next page number in the previous function (the queryFn)
    },
    refetchOnWindowFocus: false, // by default, when the window gets focused, the query will refetch

    initialData: () => {
      return formattedInitialData;
    },
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
        const childProps = { data: element };
        // add the currrnt user to the props
        childProps.currentUser = currentUser;
        childProps.imagePriority = true;

        {
        }

        return (
          // if it's the last post of the last page, we set the ref
          <div
            key={element.id}
            ref={i === allElements.length - 1 ? ref : null}
            className="inline"
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
