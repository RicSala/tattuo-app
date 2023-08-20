// Basic middlware configuration (prevents access to the pages in the matcher if the user is not logged in)
// export { default } from "next-auth/middleware"

// // Applies next-auth only to matching routes - can be regex
// // Ref:
// export const config = {
//     matcher: ['/tatuadores/saved', '/tatuajes/boards', '/settings']
// }



import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// withAuth auments the rquest and puts the user token in the request object
export default withAuth(
    function middleware(request) {
        // console.log(request.nextUrl.pathname)
        // console.log("TOKEN!!!", request.nextauth.token) // we have now the token available in the request!

        // protect the paths of the users
        if ((request.nextUrl.pathname.includes("/tatuadores/saved")
            || request.nextUrl.pathname.includes("/tatuajes/boards")
            || request.nextUrl.pathname.includes("/settings"))
            && !request.nextauth.token
        ) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }


        // protect the paths of the artists
        if (request.nextUrl.pathname.includes("/admin")
            && request.nextauth.token.role !== 'ARTIST'
        ) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }


    }, {

    callbacks: {

        // the middleware funtion will execute only if this functio returns true
        authorized: ({ token }) => {
            // console.log({ token })
            // return !!token // we are gonna let them in, and separate cases in the middleware function
            return true
        }
    }
})

export const config = {
    matcher: ['/tatuadores/saved', '/tatuajes/boards', '/settings', '/admin/:path*']
}

// export const confing = { matcher: ["tatuadores/profile/*"] }