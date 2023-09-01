import Link from "next/link";
import { Fragment } from "react";
import { Separator } from "./ui/separator";

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
            { label: "Soy Tatuador", url: "/?loginmodal=true" },
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
        items: [
            { label: "Tatuajes de Mariposas", url: "/tatuajes/mariposa" },
            { label: "Tatuajes de Tribales", url: "/tatuajes/tribal" },
            { label: "Tatuajes de Estrellas", url: "/tatuajes/estrella" },
            { label: "Tatuajes de Goku", url: "/tatuajes/goku" },
            { label: "Tatuajes de Árbol", url: "/tatuajes/arbol" },
        ],

    },
]


const Footer = (props) => {

    return (
        <footer className="relative py-8 lg:py-12  border-t-[1px] border-border shadow-sm isolate -z-10">
            <div className="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-5xl">
                <nav>
                    <ul className="grid gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-4 ">


                        {
                            footterMenu.map((submenu) => {

                                return (
                                    <Fragment
                                        key={submenu.title}
                                    >

                                        <li
                                            className="grid content-start gap-3 md:gap-2 lg:gap-3">
                                            <h4>{submenu.title}</h4>
                                            {
                                                submenu.items.map((item) => {

                                                    return (
                                                        <div key={item.url}>
                                                            <Link href={item.url}
                                                                className="text-sm text-primary lg:text-base"
                                                            >{item.label}</Link>
                                                        </div>

                                                    )
                                                })
                                            }
                                        </li>
                                    </Fragment>

                                )
                            })


                        }


                    </ul>
                </nav>
                <Separator className="my-5" />
                <div className="flex flex-col gap-3 mt-12 lg:mt-20">
                    <div className="flex justify-center mt-3 lg:mt-5">
                        <a href="#0"
                            className="inline-block my-0 mx-1 lg:mx-1.5 text-primary"
                        >
                            <svg className="
                            icon h-[1em] w-[1em] inline-block text-inherit fill-current leading-none shrink-0" viewBox="0 0 16 16"><title>Follow us on Twitter</title><g><path d="M16,3c-0.6,0.3-1.2,0.4-1.9,0.5c0.7-0.4,1.2-1,1.4-1.8c-0.6,0.4-1.3,0.6-2.1,0.8c-0.6-0.6-1.5-1-2.4-1 C9.3,1.5,7.8,3,7.8,4.8c0,0.3,0,0.5,0.1,0.7C5.2,5.4,2.7,4.1,1.1,2.1c-0.3,0.5-0.4,1-0.4,1.7c0,1.1,0.6,2.1,1.5,2.7 c-0.5,0-1-0.2-1.5-0.4c0,0,0,0,0,0c0,1.6,1.1,2.9,2.6,3.2C3,9.4,2.7,9.4,2.4,9.4c-0.2,0-0.4,0-0.6-0.1c0.4,1.3,1.6,2.3,3.1,2.3 c-1.1,0.9-2.5,1.4-4.1,1.4c-0.3,0-0.5,0-0.8,0c1.5,0.9,3.2,1.5,5,1.5c6,0,9.3-5,9.3-9.3c0-0.1,0-0.3,0-0.4C15,4.3,15.6,3.7,16,3z"></path></g></svg>
                        </a>

                        <a href="#0"
                            className="inline-block my-0 mx-1 lg:mx-1.5 text-primary"

                        >
                            <svg className="icon h-[1em] w-[1em] inline-block text-inherit fill-current leading-none shrink-0" viewBox="0 0 16 16"><title>Follow us on Youtube</title><g><path d="M15.8,4.8c-0.2-1.3-0.8-2.2-2.2-2.4C11.4,2,8,2,8,2S4.6,2,2.4,2.4C1,2.6,0.3,3.5,0.2,4.8C0,6.1,0,8,0,8 s0,1.9,0.2,3.2c0.2,1.3,0.8,2.2,2.2,2.4C4.6,14,8,14,8,14s3.4,0,5.6-0.4c1.4-0.3,2-1.1,2.2-2.4C16,9.9,16,8,16,8S16,6.1,15.8,4.8z M6,11V5l5,3L6,11z"></path></g></svg>
                        </a>

                        <a href="#0"
                            className="inline-block my-0 mx-1 lg:mx-1.5 text-primary"

                        >
                            <svg className="icon h-[1em] w-[1em] inline-block text-inherit fill-current leading-none shrink-0" viewBox="0 0 16 16"><title>Follow us on Github</title><g><path d="M8,0.2c-4.4,0-8,3.6-8,8c0,3.5,2.3,6.5,5.5,7.6 C5.9,15.9,6,15.6,6,15.4c0-0.2,0-0.7,0-1.4C3.8,14.5,3.3,13,3.3,13c-0.4-0.9-0.9-1.2-0.9-1.2c-0.7-0.5,0.1-0.5,0.1-0.5 c0.8,0.1,1.2,0.8,1.2,0.8C4.4,13.4,5.6,13,6,12.8c0.1-0.5,0.3-0.9,0.5-1.1c-1.8-0.2-3.6-0.9-3.6-4c0-0.9,0.3-1.6,0.8-2.1 c-0.1-0.2-0.4-1,0.1-2.1c0,0,0.7-0.2,2.2,0.8c0.6-0.2,1.3-0.3,2-0.3c0.7,0,1.4,0.1,2,0.3c1.5-1,2.2-0.8,2.2-0.8 c0.4,1.1,0.2,1.9,0.1,2.1c0.5,0.6,0.8,1.3,0.8,2.1c0,3.1-1.9,3.7-3.7,3.9C9.7,12,10,12.5,10,13.2c0,1.1,0,1.9,0,2.2 c0,0.2,0.1,0.5,0.6,0.4c3.2-1.1,5.5-4.1,5.5-7.6C16,3.8,12.4,0.2,8,0.2z"></path></g></svg>
                        </a>
                    </div>

                    <div className="flex flex-col gap-3 text-sm text-center lg:text-xs text-primary">
                        <p>&copy; by RicSala</p>

                        <p className="flex justify-center gap-2 lg:gap-3">
                            <a href="#0">Legal</a>
                            <a href="#0">Privacidad</a>
                            <a href="#0">Cookies</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )

};



export default Footer;