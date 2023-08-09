'use client'

import { FacebookIcon } from 'lucide-react';
import { FacebookShareButton, PinterestShareButton, WhatsappShareButton } from 'react-share';

const ShareButtons = ({
    url,
    facebookQuote,
    facebookHashtag,
    whatsappTitle,
    pinterestImage,
    pinterestDescription,
}) => {
    return (
        <div>

            <div className='flex justify-center items-center mb-2'>
                <p>
                    Compártelo!
                </p>
            </div>
            <div className='
        flex flex-row justify-center items-center gap-3
        '>
                <FacebookShareButton
                    url={url}
                    quote={"Check out this awesome article!"}
                    hashtag={"#tattoo"}
                >
                    <div className="rounded-full bg-primary text-primary-foreground p-2 hover:bg-primary/80">
                        <FacebookIcon
                        />
                    </div>

                </FacebookShareButton>

                <WhatsappShareButton
                    url={url}
                    title={whatsappTitle}
                    separator=':: '
                >
                    <div className="rounded-full bg-primary text-primary-foreground p-2 hover:bg-primary/80">
                        <FacebookIcon
                        />
                    </div>
                </WhatsappShareButton>

                <PinterestShareButton
                    media={pinterestImage}
                    description={pinterestDescription}
                >
                    <div className="rounded-full bg-primary text-primary-foreground p-2 hover:bg-primary/80">
                        <FacebookIcon
                        />
                    </div>
                </PinterestShareButton>



            </div>
        </div>
    )
};
export default ShareButtons;