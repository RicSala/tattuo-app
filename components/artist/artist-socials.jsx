'use client'

import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';
import { PinterestIcon, WhatsappIcon } from 'react-share';
import TiktokIcon from '../icons/tiktok-icon';


const ArtistSocials = ({
    artist,
    title
}) => {

    const social_icons = {
        instagram: InstagramIcon,
        facebook: FacebookIcon,
        twitter: TwitterIcon,
        tiktok: TiktokIcon,
        pinterest: PinterestIcon,
        whatsapp: WhatsappIcon
    }

    return (
        <div className='flex flex-col w-full gap-3'>
            {
                title &&
                <h2 className="mb-4 text-2xl font-semibold  text-primary">{title}</h2>
            }

            <ul className='flex flex-col w-full gap-2'>
                {
                    artist.socials.map((item) => {
                        const IconComponent = social_icons[item.network];
                        if (IconComponent === undefined || item.profile === "") return;
                        return (

                            <li className="" key={item.network}>
                                <Link
                                    className='flex flex-row justify-between w-full gap-2 rounded-md hover:bg-muted '
                                    href={`${item.profile}`} target="_blank" rel="noopener noreferrer">
                                    <IconComponent />
                                    {item.network}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
};
export default ArtistSocials;