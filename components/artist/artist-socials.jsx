import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';


const ArtistSocials = ({
    artist,
    title
}) => {
    return (
        <div className='flex flex-col w-full gap-3'>
            {
                title &&
                <h2 className="
            text-2xl
            font-semibold
            text-primary
            mb-4
            ">{title}</h2>
            }

            <ul className='flex flex-col w-full gap-2'>
                {
                    artist.instagram &&
                    <li className="">
                        <Link
                            className='flex flex-row justify-between w-full gap-2
                            rounded-md hover:bg-muted
                            '
                            href={`https://instagram.com/${artist.instagram}`} target="_blank" rel="noopener noreferrer">
                            <InstagramIcon size={20} />
                            Instagram
                        </Link>
                    </li>
                }

                {
                    artist.facebook &&
                    <li className="">
                        <Link
                            className='flex flex-row justify-between w-full gap-2
                            rounded-md hover:bg-muted
'

                            href={`https://facebook.com/${artist.facebook}`} target="_blank" rel="noopener noreferrer">
                            <FacebookIcon size={20} />
                            Facebook
                        </Link>
                    </li>
                }


                {
                    artist.whatsapp &&
                    <li >
                        <Link
                            className="flex flex-row justify-between w-full gap-2
                            rounded-md hover:bg-muted
"
                            href={`https://wa.me/${artist.whatsapp}`} target="_blank" rel="noopener noreferrer">
                            <FacebookIcon size={20} />
                            Whatsapp
                        </Link>
                    </li>
                }

                {
                    artist.pinterest &&
                    <li >
                        <Link
                            className="flex flex-row justify-between w-full gap-2
                            rounded-md hover:bg-muted
"
                            href={`https://pinterest.com/${artist.pinterest}`} target="_blank" rel="noopener noreferrer">
                            <FacebookIcon size={20} />
                            Pinterest
                        </Link>
                    </li>
                }

                {/* twitter */}
                <li >
                    <Link
                        className="flex flex-row justify-between w-full gap-2
                        rounded-md hover:bg-muted
"
                        href={`https://twitter.com/${artist.twitter}`} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon size={20} />
                        Twitter
                    </Link>
                </li>

                {/* Tiktok */}
                {
                    artist.tiktok &&
                    <li>
                        <Link
                            className="flex flex-row justify-between w-full gap-2
                            rounded-md hover:bg-muted
"
                            href={`https://tiktok.com/${artist.tiktok}`} target="_blank" rel="noopener noreferrer">
                            <FacebookIcon size={20} />
                            TikTok
                        </Link>
                    </li>
                }




            </ul>

        </div>
    )
};
export default ArtistSocials;