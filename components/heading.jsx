'use client'

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"


const Heading = ({ title, subtitle, center = false, buttonLabel, url }) => {

    const router = useRouter()

    return (
        <div className="flex flex-row justify-between">
            <div>
                <h1>{title}</h1>
                <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">{subtitle}</p>
            </div>
            {
                buttonLabel ?
                    <Button
                        onClick={() => {
                            console.log("ehllo")
                            router.push(url)
                        }}
                    >
                        {buttonLabel}
                    </Button>
                    :
                    null
            }
        </div>
    )
}

export default Heading
