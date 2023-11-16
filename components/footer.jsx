import Link from "next/link";
import { Fragment } from "react";
import { Separator } from "./ui/separator";
import { InstagramIcon } from "lucide-react";
import { generatedContentSlugs } from "@/config/constants";

const footterMenu = [
  {
    title: "Descubrir",
    items: [
      { label: "Tatuadores", url: "/tatuadores" },
      { label: "Tatuajes", url: "/tatuajes" },
      { label: "Nuestro Blog", url: "/blog" },
    ],
  },
  {
    title: "Sobre Tattuo",
    items: [
      // { label: "Colaboraciones", url: "/colaboraciones" },
      // { label: "Quiénes somos", url: "/quienes-somos" },
      // { label: "Preguntas frecuentes", url: "/preguntas-frecuentes" },
      { label: "Contacto", url: "/contacto" },
      // { label: "Soy Tatuador", url: "/?artistregister=true" },
      { label: "Estamos contratando 🤙", url: "/careers" },
    ],
  },
  {
    title: "Tatuadores en tu ciudad",
    items: [
      { label: "Tatuadores en Madrid", url: "/tatuadores/madrid" },
      { label: "Tatuadores en Barcelona", url: "/tatuadores/barcelona" },
      { label: "Tatuadores en Valencia", url: "/tatuadores/valencia" },
      { label: "Tatuadores en Zaragoza", url: "/tatuadores/zaragoza" },
    ],
  },
  {
    title: "Principales temáticas",
    items: (() => {
      const object = generatedContentSlugs.map((item) => ({
        label: `Tatuajes de ${item.content}`,
        url: `/tatuajes/${item.content}`,
      }));
      return object;
    })(),
  },
];

const Footer = (props) => {
  return (
    <footer className="relative isolate border-t-[1px]  border-border py-8 shadow-sm lg:py-12">
      <div className="mx-auto w-[calc(100%_-_2.5rem)] max-w-5xl lg:w-[calc(100%_-_4rem)]">
        <nav>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 ">
            {footterMenu.map((submenu) => {
              return (
                <Fragment key={submenu.title}>
                  <li className="grid content-start gap-3 md:gap-2 lg:gap-3">
                    <h4>{submenu.title}</h4>
                    {submenu.items.map((item) => {
                      return (
                        <div key={item.url}>
                          <Link
                            href={item.url}
                            className="text-sm text-primary lg:text-base"
                          >
                            {item.label}
                          </Link>
                        </div>
                      );
                    })}
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </nav>
        <Separator className="my-5" />
        <div className="mt-12 flex flex-col gap-3 lg:mt-20">
          <div className="mt-3 flex justify-center lg:mt-5">
            <Link
              href="#0"
              className="mx-1 my-0 inline-block text-primary lg:mx-1.5"
              rel="nofollow"
            >
              <svg
                className="
                            icon inline-block h-[1em] w-[1em] shrink-0 fill-current leading-none text-inherit"
                viewBox="0 0 16 16"
              >
                <title>Follow us on Twitter</title>
                <g>
                  <path d="M16,3c-0.6,0.3-1.2,0.4-1.9,0.5c0.7-0.4,1.2-1,1.4-1.8c-0.6,0.4-1.3,0.6-2.1,0.8c-0.6-0.6-1.5-1-2.4-1 C9.3,1.5,7.8,3,7.8,4.8c0,0.3,0,0.5,0.1,0.7C5.2,5.4,2.7,4.1,1.1,2.1c-0.3,0.5-0.4,1-0.4,1.7c0,1.1,0.6,2.1,1.5,2.7 c-0.5,0-1-0.2-1.5-0.4c0,0,0,0,0,0c0,1.6,1.1,2.9,2.6,3.2C3,9.4,2.7,9.4,2.4,9.4c-0.2,0-0.4,0-0.6-0.1c0.4,1.3,1.6,2.3,3.1,2.3 c-1.1,0.9-2.5,1.4-4.1,1.4c-0.3,0-0.5,0-0.8,0c1.5,0.9,3.2,1.5,5,1.5c6,0,9.3-5,9.3-9.3c0-0.1,0-0.3,0-0.4C15,4.3,15.6,3.7,16,3z"></path>
                </g>
              </svg>
            </Link>

            <Link
              href="#0"
              className="mx-1 my-0 inline-block text-primary lg:mx-1.5"
              rel="nofollow"
            >
              <svg
                className="icon inline-block h-[1em] w-[1em] shrink-0 fill-current leading-none text-inherit"
                viewBox="0 0 16 16"
              >
                <title>Follow us on Youtube</title>
                <g>
                  <path d="M15.8,4.8c-0.2-1.3-0.8-2.2-2.2-2.4C11.4,2,8,2,8,2S4.6,2,2.4,2.4C1,2.6,0.3,3.5,0.2,4.8C0,6.1,0,8,0,8 s0,1.9,0.2,3.2c0.2,1.3,0.8,2.2,2.2,2.4C4.6,14,8,14,8,14s3.4,0,5.6-0.4c1.4-0.3,2-1.1,2.2-2.4C16,9.9,16,8,16,8S16,6.1,15.8,4.8z M6,11V5l5,3L6,11z"></path>
                </g>
              </svg>
            </Link>

            <Link
              href="#0"
              className="mx-1 my-0 flex flex-row items-center justify-center text-primary lg:mx-1.5"
              rel="nofollow"
            >
              <InstagramIcon width={15} height={15} />
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-center text-sm text-primary lg:text-xs">
            <p>&copy; by RicSala</p>

            <p className="flex justify-center gap-2 lg:gap-3">
              <Link href="/legal/aviso-legal" rel="nofollow">
                Legal
              </Link>
              <Link href="/legal/privacidad" rel="nofollow">
                Privacidad y Cookies
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
