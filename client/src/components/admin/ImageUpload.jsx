import { useRef, useState } from 'react';

import toast from 'react-hot-toast';

import api, {
  getErrorMessage,
  mediaUrl,
} from '../../api/client';


export default function ImageUpload({
  value,
  onChange,
  label = 'Hero Image',
}) {

  const inputRef =
    useRef(null);


  const [selectedFile, setSelectedFile] =
    useState(null);


  const [preview, setPreview] =
    useState('');


  const [uploading, setUploading] =
    useState(false);


  // ==========================================================
  // SELECT IMAGE
  // ==========================================================

  const handleFile =
    (event) => {

      const file =
        event.target.files?.[0];

      if (!file) return;


      // ONLY PNG

      if (
        file.type !==
        'image/png'
      ) {

        toast.error(
          'Only PNG images are allowed.'
        );

        event.target.value = '';

        return;
      }


      setSelectedFile(file);


      const previewUrl =
        URL.createObjectURL(file);

      setPreview(previewUrl);


      toast.success(
        'PNG selected. Ready to upload.'
      );


      event.target.value = '';
    };


  // ==========================================================
  // UPLOAD PNG
  // ==========================================================

  const uploadPNG =
    async () => {

      if (!selectedFile) {

        toast.error(
          'Choose a PNG image first.'
        );

        return;
      }


      if (
        selectedFile.type !==
        'image/png'
      ) {

        toast.error(
          'Only PNG images are allowed.'
        );

        return;
      }


      const formData =
        new FormData();

      formData.append(
        'image',
        selectedFile
      );


      setUploading(true);


      try {

        const response =
          await api.post(
            '/upload',
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data',
              },
            }
          );


        onChange(
          response.data.url
        );


        toast.success(
          'Hero PNG uploaded successfully.'
        );


        setSelectedFile(null);

        setPreview('');

      } catch (error) {

        toast.error(
          getErrorMessage(
            error,
            'PNG upload failed.'
          )
        );

      } finally {

        setUploading(false);

      }
    };


  // ==========================================================
  // OPEN CHATGPT
  // ==========================================================

  const openChatGPT =
    () => {

      const prompt = `
I am preparing a transparent PNG hero image for my developer portfolio.

I will upload a portrait/photo after this prompt.

Transform the uploaded photo into a clean professional subject cutout.

IMPORTANT:

1. Keep the exact person from my uploaded image.
2. Preserve the person's identity.
3. Preserve facial features.
4. Preserve hairstyle.
5. Preserve clothing.
6. Preserve body proportions.
7. Do not redesign the person.
8. Do not add another person.
9. Do not add text.
10. Do not add a logo.
11. Do not add a card.
12. Do not add a frame.
13. Do not add a border.

BACKGROUND:

- Completely remove the original background.
- Output must have a TRUE transparent background.
- Do not replace it with white.
- Do not replace it with black.
- Do not replace it with gray.
- Do not add a gradient background.
- Do not add a studio background.

OUTPUT:

- PNG.
- Transparent alpha background.
- Clean edges around the subject.
- No visible rectangular background.
- No visible background box.

STYLE:

Keep the person's original colors.

Do NOT convert the image to grayscale.

Keep natural skin tones and clothing colors.

Make the subject slightly more polished and professional while remaining realistic.

LIGHTING:

Add subtle cinematic lighting only around the subject.

Do not create extravagant neon effects.

Do not add large energy rings.

Do not add excessive particles.

Do not add a large colored background.

The final image will be placed on a pure black developer portfolio.

COMPOSITION:

The person should be centered within the transparent canvas.

Leave reasonable transparent space around the person.

The subject should not touch the edges of the canvas.

Create a clean professional transparent PNG suitable for a modern React developer portfolio.

After processing, show me the final transparent PNG so I can download it.
`;

      const url =
        `https://chatgpt.com/?q=${encodeURIComponent(
          prompt
        )}`;


      window.open(
        url,
        '_blank',
        'noopener,noreferrer'
      );
    };


  // ==========================================================
  // REMOVE
  // ==========================================================

  const removeImage =
    () => {

      setSelectedFile(null);

      setPreview('');

      onChange('');

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };


  // ==========================================================
  // PREVIEW
  // ==========================================================

  const currentImage =
    preview ||
    (value
      ? mediaUrl(value)
      : '');


  return (

    <div className="space-y-5">

      {/* LABEL */}

      <span className="label">
        {label}
      </span>


      {/* ====================================================
          PREVIEW
      ==================================================== */}

      <div
        className="
          relative
          flex
          h-44
          w-44
          items-center
          justify-center
          overflow-hidden
          rounded-xl
          border
          border-slate-700
          bg-black
        "
      >

        {currentImage ? (

          <img
            src={currentImage}
            alt="Hero preview"
            className="
              h-full
              w-full
              object-contain
            "
          />

        ) : (

          <span
            className="
              text-xs
              text-slate-600
            "
          >
            No PNG selected
          </span>

        )}

      </div>


      {/* ====================================================
          FILE INPUT
      ==================================================== */}

      <input
        ref={inputRef}
        type="file"
        accept="image/png"
        onChange={handleFile}
        className="
          text-sm
          text-slate-400

          file:mr-3
          file:cursor-pointer
          file:rounded-md
          file:border-0
          file:bg-slate-700
          file:px-4
          file:py-2
          file:text-slate-200

          hover:file:bg-slate-600
        "
      />


      {/* ====================================================
          SELECTED FILE
      ==================================================== */}

      {selectedFile && (

        <p
          className="
            text-xs
            text-slate-500
          "
        >
          Selected: {selectedFile.name}
        </p>

      )}


      {/* ====================================================
          CHATGPT BUTTON
      ==================================================== */}

      <button
        type="button"
        onClick={openChatGPT}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          border
          border-slate-700
          bg-slate-900
          px-5
          py-2.5
          text-sm
          font-medium
          text-white
          transition
          hover:border-white/30
          hover:bg-slate-800
        "
      >
        ✨ Open ChatGPT Prompt
      </button>


      <p
        className="
          max-w-md
          text-xs
          leading-relaxed
          text-slate-600
        "
      >
        Use ChatGPT to remove the original
        background and create a transparent PNG.
        Then download the PNG and select it here.
      </p>


      {/* ====================================================
          UPLOAD PNG
      ==================================================== */}

      {selectedFile && (

        <button
          type="button"
          onClick={uploadPNG}
          disabled={uploading}
          className="
            rounded-lg
            bg-white
            px-5
            py-2.5
            text-sm
            font-semibold
            text-black
            transition
            hover:bg-slate-200
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {uploading
            ? 'Uploading…'
            : 'Upload PNG to Portfolio'}
        </button>

      )}


      {/* ====================================================
          REMOVE
      ==================================================== */}

      {(value || selectedFile) && !uploading && (

        <button
          type="button"
          onClick={removeImage}
          className="
            block
            text-xs
            text-red-400
            transition
            hover:text-red-300
          "
        >
          Remove image
        </button>

      )}

    </div>
  );
}