'use client'


import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'


export function InfiniteScroll({
    initialData, // these will be send from the server, but also rendered in the client, they have to be exactly the same
    sizePerPage, // the number of items each request will load
    hasMore, // just in case there are no more (just those shown by the server)
    endpoint, // api endpoing to get more data
    Component, // component that will be rendered with the "data"
    currentUser, // to ad functionality like "like" or add to board
    filter, // TODO: I think this one is not necesary anymore...we are solving it with the searchparams already
}) {

    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.toString());


    useEffect(() => {
        setSearch(searchParams.toString());
    }, [searchParams]);

    const formattedInitialData = { // the initial data
        pages:
            Array.from({ length: Math.ceil(initialData.length / sizePerPage) }, (_, index) => ({
                data: initialData.slice(sizePerPage * index, sizePerPage * index + sizePerPage),
                pageParam: index + 1,
                pagination: {
                    nextPage: hasMore ? index + 2 : false,
                }
            })),
        pageParams: [Math.ceil(initialData.length / sizePerPage)],
    }

    console.log({ initialData })

    const realFetch = async (page = 1) => {
        const response = await axios.get(`${endpoint}?page=${page}&pageSize=${sizePerPage}&${searchParams.toString()}${filter ? `&contentSlug=${filter.contentSlug}` : ""}
        `)
            .then(res => res.data)
            .catch(err => {
                console.log(err)
                throw err
            }
            )
        return response
    }

    const { ref, entry } = useIntersection({
        margin: '100px',
        threshold: 0,
    })

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

        queryKey: ['posts',
            search
        ], // the query key, which is used to determine if the query is fresh or if it should use cached data
        queryFn: async ({ pageParam = 1 }) => //mockFetch(pageParam), // query function. receives a queryFunctionContext object: https://tanstack.com/query/v4/docs/react/guides/query-functions#queryfunctioncontext
        {
            const response = await realFetch(pageParam)
            const { pagination } = response
            return { data: response.data, pageParam, pagination } // this will be lastpage in getNextPageParam
        },

        // stablish the next page param (in our case, the next page number)
        // if it returns false, hasNextPage will be false and we can stop fetching
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.pagination.hasMorePages === false) return false
            return lastPage?.pagination.nextPage // this will be the next page number in the previous function (the queryFn)
        },
        refetchOnWindowFocus: false, // by default, when the window gets focused, the query will refetch

        initialData: formattedInitialData,

    })


    useEffect(() => {
        if (entry?.isIntersecting) { // if the last post is intersecting
            if (hasNextPage) fetchNextPage() // and tere is a next page, then fetch
        }
    }, [entry, fetchNextPage, hasNextPage])



    if (error) {
        console.log("ERROR - INFINITE SCROLL", error)

        return (
            <div>Something went wrong</div>)
    }


    const allElements = data?.pages.flatMap(page => page.data) // get all the elements from all the pages


    return (
        <>
            {
                allElements.map((element, i) => {
                    // Create a new props object with the dynamic key and the data
                    const childProps = { data: element };
                    // add the currrnt user to the props
                    childProps.currentUser = currentUser;

                    console.log({ childProps })

                    return (
                        // if it's the last post of the last page, we set the ref
                        <div key={element.id} ref={i === allElements.length - 1 ? ref : null}
                            className="inline">
                            <Component {...childProps} />
                        </div>

                    )
                })
            }

            {isFetchingNextPage && <div>Loading more...</div>}
        </>
    );
}
