import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import api, {
  getErrorMessage,
  mediaUrl,
} from '../../api/client';

export default function ImageUpload({
  value,
  onChange,
  label = 'Image',
}) {
  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [localPreview, setLocalPreview] =
    useState('');

  const [generating, setGenerating] =
    useState(false);

  const [candidates, setCandidates] =
    useState([]);

  const [selectedCandidate, setSelectedCandidate] =
    useState(null);

  const [selecting, setSelecting] =
    useState(false);


  // ==========================================================
  // CHOOSE IMAGE
  // ==========================================================

  const handleFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Store file locally.
    setSelectedFile(file);

    // Create local preview.
    const previewUrl =
      URL.createObjectURL(file);

    setLocalPreview(previewUrl);

    // Remove old AI candidates.
    setCandidates([]);
    setSelectedCandidate(null);

    toast.success(
      'Image selected. Click Generate AI Versions.'
    );

    // Allow selecting the same file again later.
    e.target.value = '';
  };


  // ==========================================================
  // GENERATE AI IMAGES
  // ==========================================================

  const handleGenerateAI = async () => {
    if (!selectedFile) {
      toast.error(
        'Please choose an image first.'
      );

      return;
    }

    const fd = new FormData();

    fd.append(
      'image',
      selectedFile
    );

    setGenerating(true);
    setCandidates([]);
    setSelectedCandidate(null);

    try {
      const res = await api.post(
        '/hero/generate',
        fd,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      );

      const generated =
        res.data?.candidates || [];

      if (!generated.length) {
        throw new Error(
          'No AI images were generated.'
        );
      }

      setCandidates(generated);

      toast.success(
        `${generated.length} AI versions generated`
      );

    } catch (err) {
      console.error(
        '[Admin] AI generation failed:',
        err
      );

      toast.error(
        getErrorMessage(
          err,
          'AI image generation failed'
        )
      );

    } finally {
      setGenerating(false);
    }
  };


  // ==========================================================
  // SELECT AI IMAGE
  // ==========================================================

  const handleSelectCandidate = async (
    candidate
  ) => {
    if (!candidate?.url) {
      toast.error(
        'Invalid AI image.'
      );

      return;
    }

    setSelecting(true);

    try {
      const res = await api.post(
        '/hero/select',
        {
          url: candidate.url,
        }
      );

      const selectedUrl =
        res.data?.profile?.avatarUrl ||
        candidate.url;

      // Update parent Profile form.
      onChange(selectedUrl);

      setSelectedCandidate(
        candidate.id
      );

      toast.success(
        `${candidate.name || 'AI image'} selected`
      );

    } catch (err) {
      console.error(
        '[Admin] Hero selection failed:',
        err
      );

      toast.error(
        getErrorMessage(
          err,
          'Failed to select image'
        )
      );

    } finally {
      setSelecting(false);
    }
  };


  // ==========================================================
  // USE ORIGINAL IMAGE
  // ==========================================================

  const handleUseOriginal = async () => {
    if (!selectedFile) {
      toast.error(
        'Please choose an image first.'
      );

      return;
    }

    /*
     * Upload the original only when the admin explicitly
     * chooses to use it.
     */

    const fd = new FormData();

    fd.append(
      'image',
      selectedFile
    );

    try {
      setSelecting(true);

      const res = await api.post(
        '/upload',
        fd,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      );

      onChange(res.data.url);

      setCandidates([]);
      setSelectedCandidate(null);

      toast.success(
        'Original image selected'
      );

    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          'Upload failed'
        )
      );

    } finally {
      setSelecting(false);
    }
  };


  // ==========================================================
  // REMOVE IMAGE
  // ==========================================================

  const handleRemove = () => {
    onChange('');

    setSelectedFile(null);
    setLocalPreview('');
    setCandidates([]);
    setSelectedCandidate(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };


  // ==========================================================
  // CURRENT PREVIEW
  // ==========================================================

  const previewImage =
    localPreview ||
    (value
      ? mediaUrl(value)
      : '');


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="space-y-6">

      {/* ====================================================
          LABEL
      ==================================================== */}

      <span className="label">
        {label}
      </span>


      {/* ====================================================
          IMAGE SELECTION
      ==================================================== */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

        {/* Preview */}

        <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-900">

          {previewImage ? (
            <img
              src={previewImage}
              alt="Selected hero"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xs text-slate-600">
              No image
            </span>
          )}

        </div>


        {/* Controls */}

        <div className="flex flex-col gap-3">

          {/* ================================================
              CHOOSE IMAGE
          ================================================= */}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={
              generating ||
              selecting
            }
            className="text-sm text-slate-400 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-700 file:px-4 file:py-2 file:text-slate-200 hover:file:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          />


          {/* Selected file */}

          {selectedFile && (
            <p className="max-w-xs truncate text-xs text-slate-500">
              Selected: {selectedFile.name}
            </p>
          )}


          {/* ================================================
              GENERATE
          ================================================= */}

          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={
              !selectedFile ||
              generating ||
              selecting
            }
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >

            {generating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />

                Generating...
              </>
            ) : (
              <>
                ✨ Generate 3 AI Versions
              </>
            )}

          </button>


          {/* ================================================
              USE ORIGINAL
          ================================================= */}

          {selectedFile &&
            !generating && (
              <button
                type="button"
                onClick={handleUseOriginal}
                disabled={selecting}
                className="w-fit text-left text-xs text-slate-400 hover:text-white disabled:opacity-40"
              >
                Use original image instead
              </button>
            )}


          {/* ================================================
              REMOVE
          ================================================= */}

          {(value || selectedFile) &&
            !generating && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={selecting}
                className="w-fit text-left text-xs text-red-400 hover:text-red-300 disabled:opacity-40"
              >
                Remove image
              </button>
            )}

        </div>

      </div>


      {/* ====================================================
          PROCESSING
      ==================================================== */}

      {generating && (
        <div className="rounded-xl border border-white/10 bg-black/30 p-6">

          <div className="flex items-center gap-3">

            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />

            <div>

              <p className="text-sm font-medium text-white">
                Creating your Hero images...
              </p>

              <p className="mt-1 text-xs text-slate-500">
                AI is processing your portrait.
              </p>

            </div>

          </div>


          <div className="mt-5 space-y-2 text-xs text-slate-500">

            <p>
              ✓ Uploading selected image
            </p>

            <p>
              ✓ Removing background
            </p>

            <p>
              ✓ Applying black & white treatment
            </p>

            <p>
              ✓ Creating cinematic variations
            </p>

          </div>

        </div>
      )}


      {/* ====================================================
          AI RECOMMENDATIONS
      ==================================================== */}

      {candidates.length > 0 && (
        <div className="space-y-5">

          <div>

            <h3 className="text-base font-semibold text-white">
              Choose your Hero image
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Select the version that best matches
              your portfolio.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {candidates.map(
              (candidate) => {

                const isSelected =
                  selectedCandidate ===
                  candidate.id;

                return (
                  <div
                    key={candidate.id}
                    className={[
                      'overflow-hidden rounded-2xl border bg-black transition',
                      isSelected
                        ? 'border-white/50'
                        : 'border-white/10 hover:border-white/25',
                    ].join(' ')}
                  >

                    {/* Candidate image */}

                    <div className="relative aspect-[3/4] overflow-hidden bg-black">

                      <img
                        src={mediaUrl(
                          candidate.url
                        )}
                        alt={
                          candidate.name ||
                          'AI Hero candidate'
                        }
                        className="h-full w-full object-contain"
                      />

                    </div>


                    {/* Candidate info */}

                    <div className="p-4">

                      <h4 className="font-medium text-white">
                        {candidate.name ||
                          'AI Version'}
                      </h4>

                      <p className="mt-1 text-xs text-slate-500">
                        {candidate.style ||
                          'Monochrome'}
                      </p>


                      <button
                        type="button"
                        onClick={() =>
                          handleSelectCandidate(
                            candidate
                          )
                        }
                        disabled={
                          selecting ||
                          isSelected
                        }
                        className="mt-4 w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                      >

                        {isSelected
                          ? '✓ Selected'
                          : selecting
                            ? 'Selecting...'
                            : 'Use this image'}

                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>
      )}


      {/* ====================================================
          SUCCESS
      ==================================================== */}

      {selectedCandidate && (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">

          <p className="text-sm font-medium text-white">
            ✓ Hero image selected
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Save your profile to keep this image.
          </p>

        </div>
      )}

    </div>
  );
}