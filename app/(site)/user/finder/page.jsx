import { getCurrentUser } from "@/services/db/getCurrentUser";
import Heading from "@/components/heading";
import FinderClient from "./finder-client";

export default function FinderPage({ children, ...props }) {
  const currentUser = getCurrentUser();

  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <Heading
        title="Encuentra tu tatuador@"
        subtitle="Encuentra y guarda lxs artistas que más te gustan"
      />
      <FinderClient currentUser={currentUser} />
    </div>
  );
}
