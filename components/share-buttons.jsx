'use client'

import { FacebookIcon, InstagramIcon } from 'lucide-react';
import { FacebookShareButton, PinterestShareButton, WhatsappShareButton, InstagramShareButton } from 'react-share';
import WhatsappIcon from './icons/whatsapp';
import { usePathname } from 'next/navigation';

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


    const pathName = usePathname()

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
                    // TODO: change to domain
                    url={"ttps://tattuo-app.vercel.app$" + pathName}
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
                    url={`https://tattuo-app.vercel.app${pathName}`}
                    title={"Descubre los mejores Tatuadores en TATTUO"}
                    separator='· '
                >
                    <div className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/80">
                        <WhatsappIcon
                            width={iconsSize}
                            height={iconsSize}
                        />
                    </div>
                </WhatsappShareButton>

                <PinterestShareButton
                    media={pinterestImage}
                    description={pinterestDescription}
                >
                    <div className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/80">
                        <InstagramIcon
                            width={iconsSize}
                            height={iconsSize}
                        />
                    </div>
                </PinterestShareButton>



            </div>
        </div >
    )
};
export default ShareButtons;