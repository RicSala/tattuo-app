import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';


const ArtistSocials = ({
    artist,
    title
}) => {
    return (
        <div className='flex flex-col w-full gap-2'>
            {
                title &&
                <h2 className="
            text-2xl
            font-semibold
            text-primary
            mb-4
            ">{title}</h2>
            }

            <ul className='flex flex-col w-full gap-1'>
                {
                    artist.instagram &&
                    <li className="flex flex-row justify-between w-full gap-2">
                        <InstagramIcon size={20} />
                        <Link href={`https://instagram.com/${artist.instagram}`} target="_blank" rel="noopener noreferrer">
                            Instagram
                        </Link>
                    </li>
                }

                {
                    artist.facebook &&
                    <li className="flex flex-row justify-between w-full gap-2">
                        <FacebookIcon size={20} />
                        <Link href={`https://facebook.com/${artist.facebook}`} target="_blank" rel="noopener noreferrer">
                            Facebook
                        </Link>
                    </li>
                }


                {
                    artist.whatsapp &&
                    <li className="flex flex-row justify-between w-full gap-2">
                        <FacebookIcon size={20} />
                        <Link href={`https://wa.me/${artist.whatsapp}`} target="_blank" rel="noopener noreferrer">
                            Whatsapp
                        </Link>
                    </li>
                }

                {
                    artist.pinterest &&
                    <li className="flex flex-row justify-between w-full gap-2">
                        <FacebookIcon size={20} />
                        <Link href={`https://pinterest.com/${artist.pinterest}`} target="_blank" rel="noopener noreferrer">
                            Pinterest
                        </Link>
                    </li>
                }

                {/* twitter */}
                <li className="flex flex-row justify-between w-full gap-2">
                    <TwitterIcon size={20} />
                    <Link href={`https://twitter.com/${artist.twitter}`} target="_blank" rel="noopener noreferrer">
                        Twitter
                    </Link>
                </li>

                {/* Tiktok */}
                {
                    artist.tiktok &&
                    <li className="flex flex-row justify-between w-full gap-2">
                        <FacebookIcon size={20} />
                        <Link href={`https://tiktok.com/${artist.tiktok}`} target="_blank" rel="noopener noreferrer">
                            TikTok
                        </Link>
                    </li>
                }




            </ul>

        </div>
    )
};
export default ArtistSocials;