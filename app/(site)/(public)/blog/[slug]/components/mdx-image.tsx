import Image from "next/image";

type CustomImageProps = {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
};

export default function CustomImage({
    src,
    alt,
    priority = false,
    className,
}: CustomImageProps) {
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
