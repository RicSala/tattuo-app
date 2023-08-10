'use client'


const Heading = ({ title, subtitle, center = false }) => {

    return (
        <div className="">
            <h1>{title}</h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">{subtitle}</p>
        </div>
    )
}

export default Heading
