import Image from "next/image";

export default function MdxImage({
    src, alt, priority = false
}) {
    return (
        // <div className="w-full h-full">
        <Image
            className="
            h-20
            w-20
            "

            alt={alt}
            width={650}
            height={650}
            priority={priority}
            src={src}
        />
        // </div>
    );
}