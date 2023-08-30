import AsyncSelect from "@/components/async-select"
import CustomSelect from "@/components/custom-select"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import ImageUploader, { ImageThumbnail } from "@/components/ui/image-uploader"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const General = ({ form, cities, styles, setSelectedTab }) => {

    return (
        <>

            <h2>Información básica</h2>

            {/* TODO: The imageUploader is a bit of a mess: not very reusable. Could be improved using form context? */}

            <FormField
                control={form.control}
                name="mainImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Foto principal</FormLabel>
                        <FormControl>
                            <ImageThumbnail placeholderUrl="/images/placeholder.svg" {...field} />
                        </FormControl>
                        <FormControl>
                            <ImageUploader field={field} setValue={form.setValue} trigger={form.trigger}
                                disabled={form.formState.isLoading}
                            />
                        </FormControl>
                        <FormDescription>
                            Esta es la foto que aparecerá en tus publicaciones, como tu foto de perfil en otras redes sociales
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />

            <FormField
                control={form.control}
                name="artisticName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="after:content-['*']">Nombre Artístico</FormLabel>
                        <FormControl>
                            <Input placeholder="Aquí va tu nombre artístico" {...field} />
                        </FormControl>
                        <FormDescription>
                            El nombre por el que se te conoce (Que a veces no es el que aparece en tu DNI!)
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                            <Input placeholder="666 123 456" {...field} />
                        </FormControl>
                        <FormDescription>
                            Teléfono al que te puedan escribir tus clientes.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={form.control}
                name="city"
                defaultOptions={cities}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="after:content-['*']">Ciudad</FormLabel>
                        <FormControl>
                            <AsyncSelect
                                placeholder="Donde sueles tatuar habitualmente"
                                {...field} resources="cities" />
                        </FormControl>
                        <FormDescription>
                            Si tatúas en varias ciudades, de momento pon en la que más estás. Estamos desarrollando la funcionalidad para poner varias.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="after:content-['*']">Bio</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Me llamo Black Vic, tatúo en Zaragoza y me apasiona el estilo hiper realista. Disfruto del arte del tatuaje desde que..." {...field} />
                        </FormControl>
                        <FormDescription>
                            Cuéntanos sobre ti! Tu estilo, tu forma de trabajo, ... los usuarios quieren conocerte mejor antes de decidirse a hacerse un tatuaje contigo
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />



            <FormField
                control={form.control}
                name="styles"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="after:content-['*']">Estilos</FormLabel>
                        <FormControl>
                            <CustomSelect options={styles} isMulti={true} {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Puedes elegir hasta tres estilos. Seguro que controlas muchos más, pero los clientes quieren saber lo que mejor se te da!
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />

        </>
    )
}


export default General