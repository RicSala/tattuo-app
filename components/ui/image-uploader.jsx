'use client'

import { CldUploadWidget } from "next-cloudinary";
import { Delete, DeleteIcon, LucideDelete, PictureInPictureIcon, UploadIcon } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import axios from "axios";
import { forwardRef } from "react";

const ImageUploader = ({
    maxFiles = 3,
    field,
    disabled
}) => {

    // TODO: improve cloudinary widget: https://cloudinary.com/documentation/upload_widget
    return (


        <CldUploadWidget
            onUpload={
                (result) => {
                    if (Array.isArray(field.value)) {
                        field.onChange([...field.value, result.info.secure_url])
                        // trigger(name)
                    }
                    // if value is a string, replace it
                    else {
                        field.onChange(result.info.secure_url)
                        // trigger(name)
                    }
                    console.log("result", result)
                }}
            uploadPreset="lbgb29le"
            onBlur={field.onBlur}
            value={field.value}
            // doesnt work

            options={
                {
                    maxFiles: maxFiles,
                    cropping: true,
                    sources: ["local", "url", "camera", "instagram", "facebook", "google_drive", "url"],
                    language: "es",
                    text: {
                        "es": {
                            "queue": {
                                "title": "Archivos para subir",
                                "title_uploading_with_counter": `Subiendo ${maxFiles} archivos`,
                            },
                            "crop": {
                                "title": "Recorta tu imagen",
                                "crop_btn": "Recortar",
                                "skip_btn": "Saltar",
                                "close_prompt": "Cerrar cancelará la subida, ¿Estás segur@?",
                                "corner_tooltip": "Arrastra la esquina para cambiar el recorte",
                                "handle_tooltip": "Arrastra el handle para cambiar el recorte"
                            },
                            "local": {
                                "browse": "...archivos",
                                "dd_title_single": "Arrastra una imagen aquí",
                                "dd_title_multi": `Arrastra hasta ${maxFiles} imágenes aquí`,
                            },
                            "or": "o navega por tus...",
                            "back": "Anterior",
                            "advanced": "Avanzado",
                            "close": "Cerrar",
                            "no_results": "Sin resultados",
                            "search_placeholder": "Buscar archivos",

                            "menu": {
                                "files": "Mis archivos",
                                "web": "Página web",
                                "camera": "Cámara",
                                "gsearch": "Google Search",
                                "gdrive": "Google Drive",
                                "dropbox": "Dropbox",
                                "facebook": "Facebook",
                                "instagram": "Instagram",
                                "shutterstock": "Shutterstock",
                                "getty": "gettyimages",
                                "istock": "iStock",
                                "unsplash": "Unsplash"
                            },
                            "actions": {
                                "upload": "Subir",
                                "next": "Siguiente",
                                "clear_all": "Limpiar todo",
                                "log_out": "Log out",
                            },
                        }
                    }
                }
            }>
            {({ open }) => {
                return (
                    <div className="flex flex-col gap-2">
                        <Button
                            type="button"
                            onClick={() => open?.()}
                            size={"lg"}
                            className="flex flex-row gap-2 max-w-fit"
                            disabled={disabled}
                        >
                            <UploadIcon />
                            Subir imagen
                        </Button>
                    </div>
                )
            }}

        </CldUploadWidget >

    )
}

export default ImageUploader;


// write the basic structure of a forwardRef
// import React, { forwardRef } from 'react'
//
// const FancyInput = forwardRef((props, ref) => (
//   <input ref={ref} className="FancyInput" {...props} />
// ))

const ImageThumbnail = forwardRef(({
    value,
    onChange,
    placeholderUrl,
}, ref) => {

    return (
        <div className="relative w-40 h-40">
            <div className="relative w-40 h-40 overflow-hidden rounded-md">
                <Image src={value || placeholderUrl} alt="image" fill
                    className="object-cover" />
            </div>
            <div
                onClick={async () => {
                    console.log("deleting image")
                    console.log(placeholderUrl)
                    onChange(null)
                    // setValue(fieldName, null, {
                    //     shouldValidate: true,
                    //     shouldDirty: true
                    // })
                    // TODO: we delete the images when the form is saved. Review it on the form page, not sure it's completely correct.
                    // await axios.delete(`/api/images/${value.split("/").pop().split(".")[0]}`)
                }}
                className="absolute right-[-0.5em] top-[-0.5em] cursor-pointer">
                <DeleteIcon size={25} className="z-50 text-primary" />
            </div>
        </div>
    )


})

ImageThumbnail.displayName = 'ImageThumbnail'



export { ImageThumbnail }