import React, { useState } from 'react'
import { ImageUploadIcon } from '../Svgs'

const ImageUpload = ({ title, onFileSelect }) => {
    const [preview, setPreview] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
            if (onFileSelect) onFileSelect(file)
        }
    }

    return (
        <div className="space-y-2.5 w-full">
            {title && (
                <div className="text-xs cursor-default text-[#E0E0E0]">{title}</div>
            )}

            <div className="relative w-full rounded-xl border border-dashed border-[#A3A3A3] flex items-center justify-center flex-col cursor-pointer space-y-2">
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-h-[180px] object-cover rounded-lg border border-[#A3A3A3]"
                    />
                ) : (
                    <>
                        <div className='py-7 flex items-center justify-center flex-col space-y-2'>
                            <ImageUploadIcon />
                            <p className="text-[#A3A3A3] text-xs max-w-[200px] text-center">
                                Upload an image, Drag and Drop or{" "}
                                <span className="underline text-[#009DFF]">Browse</span> to upload
                            </p>
                        </div>
                    </>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                />
            </div>
        </div>
    )
}

export default ImageUpload
