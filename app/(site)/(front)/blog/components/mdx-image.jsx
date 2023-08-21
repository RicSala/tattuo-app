import Image from "next/image";

export default function MdxImage({
    src,
    alt,
    priority = false,
    className
}) {
    return (
        // <div className="w-full h-full">
        <Image
            className={className}
            alt={alt}
            width={650}
            height={650}
            priority={priority}
            src={src}
        />
        // </div>
    );
}