"use client";
import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className="
        mx-auto
        max-w-[2520px]
        px-4
        md:px-10
        xl:px-20
        "
        >
            {children}
        </div>
    );
};

export default Container;
