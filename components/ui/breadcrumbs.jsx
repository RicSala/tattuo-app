import Link from "next/link";


export default function Breadcrumbs({
    // items
}) {

    //TODO: how can I generate the crumbs server side?? Not sure client side are that useful for SEO
    const items = [
        {
            label: "Home",
            path: "/",
        },
        {
            label: "Development",
            path: "/courses/development",
        },
        {
            label: "Programming Languages",
            path: "/courses/development/programming-languages",
        },
        {
            label: "Python",
            path: "/topic/python",
        },
    ]
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm text-gray-600">

                {
                    items.map((crumb, i) => {
                        const isFirstItem = i === 0
                        const isLastItem = i === items.length - 1;
                        if (isFirstItem) return (
                            <li key={crumb.label}>
                                <Link href={items[i].path} className="block transition hover:text-primary/70 text-primary">
                                    <span className="sr-only"> {items[i].label} </span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </Link>
                            </li>
                        )

                        if (!isLastItem) {
                            return (
                                <>

                                    <li className="text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </li>

                                    <li>
                                        <Link href={items[i].path} className="block transition hover:text-primary/70 text-primary"> {items[i].label} </Link>
                                    </li>

                                </>

                            )
                        } else {
                            return (
                                <>

                                    <li className="text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </li>

                                    <li>
                                        <p className="block transition text-primary"> {items[i].label} </p>
                                    </li>
                                </>

                            )
                        }
                    })
                }


            </ol>
        </nav >

    );
}
