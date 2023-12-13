"use client";
import { APIProvider } from "@vis.gl/react-google-maps";

export function MapsProvider(props: any) {
  return (
    <APIProvider
      apiKey={"AIzaSyA60IfgEhUb9r0gMcYbkR0oKMFSAUTUR_I"}
      libraries={["places"]}
    >
      {props.children}
    </APIProvider>
  );
}
