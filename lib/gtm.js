export const GTM_ID = process.env.NEXT_PUBLIC_GTM

export const pageview = (url) => {
    if (typeof window.dataLayer !== "undefined") {
        window.dataLayer.push({
            event: "pageview",
            page: url,
        })
    } else {
        console.log({
            event: "pageview",
            page: url,
        })
    }
}