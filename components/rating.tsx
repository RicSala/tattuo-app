import { range } from "@mantine/hooks";
import { Star, StarHalf } from "lucide-react";

type status = "full" | "half" | "empty";

export function Rating({ value }: { value: number }) {
    return (
        <div className="flex items-center">
            {range(1, 5).map((i) => {
                const status =
                    value >= i ? "full" : value >= i - 0.5 ? "half" : "empty";
                return (
                    <RatingPoint
                        key={i}
                        status={status}
                        fullIcon={Star}
                        halfIcon={StarHalf}
                    />
                );
            })}
        </div>
    );
}

const RatingPoint = ({
    status,
    fullIcon: FullIcon,
    halfIcon: HalfIcon,
}: {
    status: status;
    fullIcon: any;
    halfIcon: any;
}) => {
    return (
        <div className="relative">
            <FullIcon className="relative h-3 w-3" />
            {status === "half" && (
                <HalfIcon
                    fill="true"
                    className="absolute left-0 top-0 h-3 w-3  fill-primary text-transparent"
                />
            )}
            {status === "empty" && (
                <FullIcon className="absolute left-0 top-0 h-3 w-3" />
            )}
            {status === "full" && (
                <FullIcon
                    fill="true"
                    className="absolute left-0 top-0 h-3 w-3 fill-current"
                />
            )}
        </div>
    );
};
