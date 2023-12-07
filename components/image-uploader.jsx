"use client";

import { CldUploadWidget } from "next-cloudinary";
import { DeleteIcon, UploadIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image, { ImageProps } from "next/image";
import { InputHTMLAttributes, forwardRef } from "react";

const ImageUploader = (
  { maxFiles = 3, field, disabled, trigger, afterChange = () => {} },
  // : {
  //   maxFiles?: number;
  //   field: any;
  //   disabled?: boolean;
  //   trigger: any;
  //   afterChange?: () => void;
  // }
) => {
  // TODO: improve cloudinary widget: https://cloudinary.com/documentation/upload_widget
  //  translations: https://upload-widget.cloudinary.com/2.8.20/global/text.json
  console.log("field value-->", field.value);

  return (
    <CldUploadWidget
      onUpload={(
        result,
        //   :any
      ) => {
        if (Array.isArray(field.value)) {
          field.onChange([...field.value, result.info.secure_url]);
          // trigger("mainImage");
          // trigger(name)
        }
        // if value is a string, replace it
        else {
          field.onChange(result.info.secure_url);
          // trigger(name)
        }
        afterChange();
      }}
      uploadPreset="lbgb29le"
      onBlur={() => field.onBlur()}
      value={field.value}
      options={{
        showAdvancedOptions: true,
        showPoweredBy: false,
        maxImageFileSize: 1000000,
        clientAllowedFormats: ["png", "jpeg"],
        croppingShowDimensions: true,
        croppingValidateDimensions: true,
        minImageWidth: 400, //TODO: change this to a bigger size
        minImageHeight: 400,
        maxFiles: maxFiles,
        cropping: true,
        sources: [
          "local",
          "url",
          "camera",
          "instagram",
          "facebook",
          "google_drive",
          "url",
        ],
        language: "es",
        croppingAspectRatio: 1,
        text: {
          es: {
            queue: {
              title: "Archivos para subir",
              title_uploading_with_counter: `Subiendo ${maxFiles} archivos`,
            },
            crop: {
              title: "Recorta tu imagen",
              crop_btn: "Recortar",
              skip_btn: "Saltar y Guardar",
              close_prompt: "Cerrar cancelará la subida, ¿Estás segur@?",
              corner_tooltip: "Arrastra la esquina para cambiar el recorte",
              handle_tooltip: "Arrastra el handle para cambiar el recorte",
            },
            errors: {
              file_too_large:
                "El tamaño del archio ({{size}}) exceede el máximo permitido ({{allowed}})",
              max_dimensions_validation:
                "Image dimensions ({{width}}X{{height}}) are bigger than the maximum allowed: ({{maxWidth}}X{{maxHeight}})",
              min_dimensions_validation:
                "Images dimensions ({{width}}X{{height}}) are smaller than the minimum required: ({{minWidth}}X{{minHeight}})",
              unavailable: "NA",
              max_number_of_files: "Número máximo de archivos excedido",
              allowed_formats: "Formato no permitido",
              max_file_size: "El archivo es muy grande",
              min_file_size: "El archivo es muy pequeño",
            },
            local: {
              browse: "...archivos",
              dd_title_single: "Arrastra una imagen aquí",
              dd_title_multi: `Arrastra hasta ${maxFiles} imágenes aquí`,
            },
            or: "o navega por tus...",
            back: "Anterior",
            advanced: "Avanzado",
            close: "Cerrar",
            no_results: "Sin resultados",
            search_placeholder: "Buscar archivos",

            menu: {
              files: "Mis archivos",
              web: "Página web",
              camera: "Cámara",
              gsearch: "Google Search",
              gdrive: "Google Drive",
              dropbox: "Dropbox",
              facebook: "Facebook",
              instagram: "Instagram",
              shutterstock: "Shutterstock",
              getty: "gettyimages",
              istock: "iStock",
              unsplash: "Unsplash",
            },
            actions: {
              upload: "Subir",
              next: "Siguiente",
              clear_all: "Limpiar todo",
              log_out: "Log out",
            },
          },
        },
      }}
    >
      {({ open }) => {
        return (
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              onClick={() => open?.()}
              size={"lg"}
              className="flex max-w-fit flex-row gap-2"
              disabled={disabled}
            >
              <UploadIcon />
              Subir imagen
            </Button>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUploader;

// write the basic structure of a forwardRef
// import React, { forwardRef } from 'react'
//
// const FancyInput = forwardRef((props, ref) => (
//   <input ref={ref} className="FancyInput" {...props} />
// ))

// export interface InputProps extends InputHTMLAttributes<HTMLImageElement> {
//   value: string | null;
//   placeholderUrl: string;
// }

/**
 * Define the type of the prop object
 * @typedef {Object} ImageThumbnailPropTypes
 * @property {string} placeholderUrl
 * @property {string} value
 */

/**
 * @typedef {ImageThumbnailPropTypes & React.ComponentPropsWithoutRef<'image'>} MergedImageProps
 */

/**
 * @type {React.ForwardRefRenderFunction<HTMLButtonElement, MergedImageProps>}
 */
const ImageThumbnail = forwardRef(
  // <HTMLInputElement, InputProps>
  ({ value, onChange, placeholderUrl }, ref) => {
    console.log("value-->", value);
    return (
      <div className="relative h-40 w-40">
        <div className="relative h-40 w-40 overflow-hidden rounded-md">
          <Image
            src={value || placeholderUrl}
            alt="image"
            fill
            className="object-cover"
          />
        </div>
        <div
          onClick={async () => {
            onChange(null);
            // setValue(fieldName, null, {
            //     shouldValidate: true,
            //     shouldDirty: true
            // })
            // TODO: we delete the images when the form is saved. Review it on the form page, not sure it's completely correct.
          }}
          className="absolute right-[-0.5em] top-[-0.5em] cursor-pointer"
        >
          <DeleteIcon size={25} className="z-50 text-primary" />
        </div>
      </div>
    );
  },
);

ImageThumbnail.displayName = "ImageThumbnail";

export { ImageThumbnail };
