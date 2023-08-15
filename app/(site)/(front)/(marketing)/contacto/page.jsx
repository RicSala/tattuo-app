import Heading from "@/components/heading";
import ContactForm from "@/components/landing/contact-form";
import { Separator } from "@/components/ui/separator";


export default async function page({

}) {



    return (
        <div>
            <Heading
                title="¿Quieres contactarnos?"

                subtitle="Estaremos encantados de charlar contigo sobre dudas, ideas, colaboraciones,..." />
            <Separator className="my-5" />
            <ContactForm />
        </div>
    );
}