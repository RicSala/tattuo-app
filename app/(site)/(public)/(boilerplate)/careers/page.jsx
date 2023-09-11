import Heading from "@/components/heading";
import ContactForm from "@/components/landing/contact-form";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Computer, HeartPulse, PaletteIcon } from "lucide-react";


export default async function page({

}) {



    return (
        <div>
            <Heading
                title="¿Te unes a TATTUO?"

                subtitle="Estamos revolucionando el día a día de los tatuadores, incorporando tecnología y marketing digital a su forma de trabajar · ¿Te apasionan el mundo digital? ¡Únete al equipo TATTUO!" />
            <Separator className="my-5" />

            <div className="flex flex-col gap-5 md:gap-10">

                <h2>Actualmente buscamos:</h2>

                <Accordion type="single" collapsible className="w-full mx-auto md:w-2/3 lg:w-1/2">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="flex justify-start gap-5"> <PaletteIcon />UX Designer</AccordionTrigger>
                        <AccordionContent>
                            <p>¡Ayúdanos a mejorar nuestra web! Sabemos que mola, pero también que hay talentazo ahí fuera que puede hacer que mole mucho más y que lleguemos a muchos más artistas.</p>
                            <p>¿Quieres darle una vuelta a la web que estás implementando? ¿Aprender los últimos recursos y tendencias?</p>
                            <p>¡Únete al equipo de UX!</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="flex justify-start gap-5"><Computer />Front End Developer</AccordionTrigger>
                        <AccordionContent>
                            <p>Te flipa React. Lo sabemos. Es normal (a nosotros también!)</p>
                            <p>Pero ahora buscas un proyecto donde llevar tu conocimienot de React al límite, para seguir creciendo como desarrollador@</p>
                            <p>
                                ¡El equipo de desarrollo te espera para llevar el frontend de nuestra plataforma!
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="flex justify-start gap-5"><HeartPulse />Artist Support</AccordionTrigger>
                        <AccordionContent>
                            <p>Has trabajado en soporte en otras marcas pero... créeme NO VA A SER LO MISMO</p>
                            <p>En lugar de tener que ayudar a una persona que ha comprado en la web y que no sabe que talla necesita...</p>
                            <p>Podrías estar ayudando a cientos de artistas a encontrar nuevos clientes y atenderles mejor</p>
                            <p>¡El nuevo departamente de Artist Support te espera!</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="w-full mx-auto md:w-2/3 lg:w-1/2">
                    <p>Si te apasiona el mundo de las startups y quieres formar parte de proyecto en expansión, ¡Te queremos conocer!</p>
                    <p>Por favo, envíanos un email contándonos a qué puesto aplicas y nos pondremos en contacto contigo</p>
                </div>

                <ContactForm />
            </div>
        </div>
    );
}