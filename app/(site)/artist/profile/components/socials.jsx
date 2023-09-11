const { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } = require("@/components/ui/form")
const { Input } = require("@/components/ui/input")

const Socials = ({ form }) => {

    return (
        <>
            <h2>Contacto y redes</h2>
            <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                            <Input type="" placeholder="facebook.com/blackvic" {...field} />
                        </FormControl>
                        <FormDescription>
                            Link a tu perfil de Facebook
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                            <Input type="" placeholder="instagram.com/blackvic" {...field} />
                        </FormControl>
                        <FormDescription>
                            Link a tu perfil de Instagram
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={form.control}
                name="tiktok"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>TikTok</FormLabel>
                        <FormControl>
                            <Input type="url" placeholder="tiktok.com/blackvic" {...field} />
                        </FormControl>
                        <FormDescription>
                            Link a tu perfil de TitTok
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                            <Input type="" placeholder="twitter.com/blackvic" {...field} />
                        </FormControl>
                        <FormDescription>
                            Link a tu perfil de Twitter (o X..)
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                            <Input type="" placeholder="www.blackvic.com" {...field} />
                        </FormControl>
                        <FormDescription>
                            Link a tu web
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            <FormField
                control={form.control}
                name="youtube"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Youtube</FormLabel>
                        <FormControl>
                            <Input type="" placeholder="youtube.com/blackvic" {...field} />
                        </FormControl>
                        <FormDescription>
                            Link a tu canal de Youtube
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />

        </>
    )
}

export default Socials