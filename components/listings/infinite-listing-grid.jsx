'use client'

import CustomQueryClientProvider from "@/providers/query-client-provider";
import React from "react";
import { InfiniteScroll } from "./infinite-scroll";

// This is a wrapper component to render an infinite scroll
// its job is to create the grid, add the query client provider and pass the props to the infinite scroll component

/**
 * InfiniteListingGrid component
 *
 * @param {Object} props - The props for the InfiniteListingGrid component
 * @param {React.ComponentType} props.Component - The component to render
 * @param {string} props.endpoint - The endpoint for data fetching
 * @param {Object[]} props.initialData - The initial data for rendering
 * @param {number} props.sizePerPage - The size of each page
 * @param {string} props.keyProp - The key property for dynamic keys
 * @param {Object} props.currentUser - Information about the current user
 * @param {Object} [props.filter] - Optional filter for the listing
 *
 * @returns {React.ReactElement} The rendered InfiniteListingGrid component
 */
export default function InfiniteListingGrid({
    Component,
    endpoint,
    initialData,
    sizePerPage,
    keyProp, // new prop for the dynamic key
    currentUser,
    filter,

}) {

    return (

        <div className="
            grid
            grid-cols-1
            gap-8
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            "
        >
            <CustomQueryClientProvider>
                <InfiniteScroll
                    endpoint={endpoint}
                    initialData={initialData}
                    sizePerPage={sizePerPage}
                    keyProp={keyProp}
                    Component={Component}
                    currentUser={currentUser}
                    filter={filter}
                />
            </CustomQueryClientProvider>

        </div>


    )
}


