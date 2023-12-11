"use client";

import { FacebookIcon, InstagramIcon } from "lucide-react";
import {
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  InstagramShareButton,
} from "react-share";
import WhatsappIcon from "./icons/whatsapp";
import { usePathname } from "next/navigation";

const ShareButtons = ({
  title = undefined,
  url,
  facebookQuote = undefined,
  facebookHashtag = undefined,
  whatsappTitle = undefined,
  pinterestImage = undefined,
  pinterestDescription = undefined,
  iconsSize = 20,
}) => {
  const pathName = usePathname();

  return (
    <div>
      {title ? (
        <div className="mb-2 flex items-center justify-center">
          <p>Compártelo!</p>
        </div>
      ) : null}
      <div className="flex flex-row items-center justify-center gap-3 ">
        <FacebookShareButton
          // TODO: change to domain
          url={"https://tattuo-app.vercel.app$" + pathName}
          quote={"Check out this awesome article!"}
          hashtag={"#tattoo"}
        >
          <div className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/80">
            <FacebookIcon width={iconsSize} height={iconsSize} />
          </div>
        </FacebookShareButton>

        <WhatsappShareButton
          url={`https://tattuo-app.vercel.app${pathName}`}
          title={"Descubre los mejores Tatuadores en TATTUO"}
          separator="· "
        >
          <div className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/80">
            <WhatsappIcon width={iconsSize} height={iconsSize} />
          </div>
        </WhatsappShareButton>

        <PinterestShareButton
          media={pinterestImage}
          description={pinterestDescription}
        >
          <div className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/80">
            <InstagramIcon width={iconsSize} height={iconsSize} />
          </div>
        </PinterestShareButton>
      </div>
    </div>
  );
};
export default ShareButtons;
