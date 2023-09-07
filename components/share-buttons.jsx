'use client'

import { FacebookIcon, InstagramIcon } from 'lucide-react';
import { FacebookShareButton, PinterestShareButton, WhatsappShareButton, InstagramShareButton } from 'react-share';
import Whatsapp from './icons/whatsapp';

const ShareButtons = ({
    title,
    url,
    facebookQuote,
    facebookHashtag,
    whatsappTitle,
    pinterestImage,
    pinterestDescription,
    iconsSize = 20
}) => {
    return (
        <div>
            {title ?
                <div className='flex items-center justify-center mb-2'>
                    <p>
                        Compártelo!
                    </p>
                </div> : null
            }
            <div className='flex flex-row items-center justify-center gap-3 '>
                <FacebookShareButton
                    url={url}
                    quote={"Check out this awesome article!"}
                    hashtag={"#tattoo"}
                >
                    <div className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/80">
                        <FacebookIcon
                            width={iconsSize}
                            height={iconsSize}
                        />
                    </div>

                </FacebookShareButton>

                <WhatsappShareButton
                    url={url}
                    title={whatsappTitle}
                    separator=':: '
                >
                    <div className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/80">
                        <Whatsapp
                            width={iconsSize}
                            height={iconsSize}
                        />
                    </div>
                </WhatsappShareButton>

                <WhatsappShareButton
                    media={pinterestImage}
                    description={pinterestDescription}
                >
                    <div className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/80">
                        <InstagramIcon
                            width={iconsSize}
                            height={iconsSize}
                        />
                    </div>
                </WhatsappShareButton>



            </div>
        </div >
    )
};
export default ShareButtons;