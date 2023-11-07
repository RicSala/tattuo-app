import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploader, { ImageThumbnail } from "@/components/ui/image-uploader";

const Images = ({ form }) => {
  return (
    <>
      <h2>Fotos de trabajos</h2>

      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="after:content-['*']">
              Algunos de tus trabajos
            </FormLabel>
            <div className="flex flex-row flex-wrap gap-5">
              {field.value.map((image, index) => {
                const onChange = async () => {
                  const newImageArray = form
                    .getValues("images")
                    .filter((img, i) => i !== index);
                  field.onChange(newImageArray);
                };

                return (
                  <FormControl key={image}>
                    <ImageThumbnail
                      placeholderUrl="/images/placeholder.svg"
                      value={image}
                      onChange={onChange}
                    />
                  </FormControl>
                );
              })}
            </div>
            <FormControl>
              <ImageUploader
                field={field}
                setValue={form.setValue}
                trigger={form.trigger}
              />
            </FormControl>
            <FormDescription>
              Sube las tres piezas que más te representen!
              <br />
              Mejor aún si son una de cada estilo que nos has contado arriba!
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Images;
