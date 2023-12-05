import { range } from "@mantine/hooks";
import { Star, StarHalf } from "lucide-react";

export function Rating({ value }) {
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

const RatingPoint = ({ status, fullIcon: FullIcon, halfIcon: HalfIcon }) => {
  return (
    <div className="relative">
      <FullIcon className="relative h-4 w-4" />
      {
        {
          full: (
            <FullIcon
              fill
              className="absolute left-0 top-0 h-4 w-4 overflow-hidden"
            />
          ),
          half: (
            <HalfIcon
              fill
              className="absolute left-0 top-0 h-4 w-4 overflow-hidden"
            />
          ),
          empty: null,
        }[status]
      }
    </div>
  );
};
