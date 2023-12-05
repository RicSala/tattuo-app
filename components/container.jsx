"use client";

const Container = ({ children }) => {
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
