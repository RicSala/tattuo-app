import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ContactForm({

}) {
    return (
        <div className="sm:p-10 my-auto">
            <section className="mx-auto max-w-screen-xl md:rounded-md md:border md:shadow-lg overflow-hidden">
                <div className="grid grid-cols-4 text-gray-800 lg:grid-cols-3">
                    <div className="col-span-4 bg-primary px-8 py-10 text-primary-foreground md:col-span-2 md:border-r md:px-10 md:py-12 lg:col-span-1">
                        <h2 className="mb-8 text-2xl font-black">Nos encontrarás en</h2>
                        <ul>
                            <li className="mb-6 flex items-start text-left">
                                <svg className="shrink-0 mr-6 text-2xl text-gray-500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z" /></svg>
                                <div>
                                    <a className="cursor-pointer font-serif text-base md:text-lg" href="#">help@tattuo.com</a>
                                    <span className="block text-xs uppercase">email</span>
                                </div>
                            </li>
                            <li className="my-6 flex items-center text-left">
                                <svg className="shrink-0 mr-6 text-2xl text-gray-500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4c0 146.8-111.8 315.9-316.1 315.9c-63 0-121.4-18.3-170.6-49.8c9 1 17.6 1.4 26.8 1.4c52 0 99.8-17.6 137.9-47.4c-48.8-1-89.8-33-103.8-77c17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35c25.1-4.7 49.1-14.1 70.5-26.7c-8.3 25.7-25.7 47.4-48.8 61.1c22.4-2.4 44-8.6 64-17.3c-15.1 22.2-34 41.9-55.7 57.6z" /></svg>
                                <div>
                                    <a className="cursor-pointer font-serif text-base md:text-lg" href="#">abrahama.real</a>
                                    <span className="block text-xs uppercase">twitter</span>
                                </div>
                            </li>
                            <li className="my-6 flex items-center text-left">
                                <svg className="shrink-0 mr-6 text-2xl text-gray-500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M1 2.838A1.838 1.838 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.838 1.838 0 0 1 21.161 23H2.838A1.838 1.838 0 0 1 1 21.161V2.838Zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634c3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8c-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708V9.388Zm-5.5 10.403h3.208V9.25H4.208v10.54ZM7.875 5.812a2.063 2.063 0 1 1-4.125 0a2.063 2.063 0 0 1 4.125 0Z" clip-rule="evenodd" /></svg>
                                <div>
                                    <p className="font-serif text-base md:text-lg">abraham</p>
                                    <span className="block text-xs uppercase">LinkedIn</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="order-first col-span-4 max-w-screen-md px-8 py-10 md:order-last md:col-span-2 md:px-10 md:py-12">
                        <h2 className="mb-8 text-2xl text-secondary-foreground">¿Prefieres escribirnos desde aquí?</h2>
                        <p className="mt-2 mb-4 font-sans text-sm tracking-normal text-secondary-foreground">Cuéntanos qué necesitas</p>
                        <form action="">
                            <div className="md:col-gap-4 mb-5 grid md:grid-cols-2 gap-2">
                                {/* <Input className="col-span-1 w-full border-b py-3 text-sm outline-none focus:border-b-2 focus:border-black" type="text" placeholder="Name" name="name" /> */}
                                <Input className="col-span-1 w-full border-b py-3 text-sm outline-none focus:border-b-2 focus:border-black" type="text" placeholder="Nombre" name="name" />
                                <Input className="col-span-1 w-full border-b py-3 text-sm outline-none focus:border-b-2 focus:border-black" type="email" placeholder="Email" name="email" />
                            </div>
                            <Textarea className="mb-10 w-full resize-y whitespace-pre-wrap border-b py-3 text-sm outline-none focus:border-b-2 focus:border-black" id="" rows="6" placeholder="Aquí va tu mensaje ;)" name="question"></Textarea>
                            <Button label="Enviar" size="lg" >
                                Enviar
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>


    );
}