'use client'

export default function GlobalError({ error, reset }) {

    // In server components, the message will be a generic one to avoid leaking sensitive details
    const { message } = error

    return (
        <html>
            <body>
                <h2>Something went wrong!</h2>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    )
}