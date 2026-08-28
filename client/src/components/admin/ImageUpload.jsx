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

  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [candidates, setCandidates] = useState([]);

  const [selecting, setSelecting] = useState(false);

  const [selectedCandidate, setSelectedCandidate] =
    useState(null);


  // ==========================================================
  // NORMAL IMAGE UPLOAD
  // ==========================================================

  const handleFile = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fd = new FormData();

    fd.append('image', file);

    setUploading(true);

    try {
      const res = await api.post(
        '/upload',
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      onChange(res.data.url);

      // Reset previous AI recommendations
      setCandidates([]);
      setSelectedCandidate(null);

      toast.success('Image uploaded');
    } catch (err) {
      toast.error(
        getErrorMessage(
          err,
          'Upload failed'
        )
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };


  // ==========================================================
  // GENERATE AI VERSIONS
  // ==========================================================

  const handleGenerateAI = async () => {
    const file = inputRef.current?.files?.[0];

    if (!file) {
      toast.error(
        'Please choose an image first.'
      );

      return;
    }

    const fd = new FormData();

    fd.append('image', file);

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
        'AI generation error:',
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
        'Invalid image candidate.'
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

      setSelectedCandidate(
        candidate.id
      );

      /*
       * IMPORTANT:
       *
       * Update the parent profile.
       *
       * This eventually becomes:
       *
       * profile.avatarUrl
       */

      onChange(
        res.data?.profile?.avatarUrl ||
          candidate.url
      );

      toast.success(
        `${candidate.name} selected`
      );
    } catch (err) {
      console.error(
        'Hero selection error:',
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
  // REMOVE IMAGE
  // ==========================================================

  const handleRemove = () => {
    onChange('');

    setCandidates([]);
    setSelectedCandidate(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="space-y-5">

      {/* ====================================================
          LABEL
      ==================================================== */}

      <span className="label">
        {label}
      </span>


      {/* ====================================================
          CURRENT IMAGE
      ==================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-900">

          {value ? (
            <img
              src={mediaUrl(value)}
              alt="Current hero"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="px-2 text-center text-xs text-slate-600">
              No image
            </span>
          )}

        </div>


        {/* ==================================================
            CONTROLS
        ================================================== */}

        <div className="flex flex-col gap-3">

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={
              uploading ||
              generating ||
              selecting
            }
            className="text-sm text-slate-400 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-slate-700 file:px-3 file:py-1.5 file:text-slate-200 hover:file:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          />


          {/* Upload status */}

          {uploading && (
            <span className="text-xs text-slate-400">
              Uploading image...
            </span>
          )}


          {/* =================================================
              AI BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={
              uploading ||
              generating ||
              selecting
            }
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {generating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />

                Generating...
              </>
            ) : (
              <>
                ✨ Generate 3 AI Versions
              </>
            )}

          </button>


          {/* Remove */}

          {value &&
            !uploading &&
            !generating && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={selecting}
                className="w-fit text-left text-xs text-red-400 transition hover:text-red-300 disabled:opacity-50"
              >
                Remove image
              </button>
            )}

        </div>

      </div>


      {/* ====================================================
          AI PROCESSING
      ==================================================== */}

      {generating && (
        <div className="rounded-xl border border-white/10 bg-black/30 p-6">

          <div className="flex items-center gap-3">

            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />

            <div>
              <p className="text-sm font-medium text-white">
                Creating your portfolio portraits...
              </p>

              <p className="mt-1 text-xs text-slate-500">
                This can take a little while.
              </p>
            </div>

          </div>


          <div className="mt-5 space-y-2 text-xs text-slate-500">

            <p>
              ✓ Processing uploaded image
            </p>

            <p>
              ✓ Applying monochrome treatment
            </p>

            <p>
              ✓ Creating cinematic variations
            </p>

            <p>
              ○ Preparing recommendations
            </p>

          </div>

        </div>
      )}


      {/* ====================================================
          AI CANDIDATES
      ==================================================== */}

      {candidates.length > 0 && (
        <div className="space-y-4">

          <div>
            <h3 className="text-sm font-semibold text-white">
              Choose your Hero image
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Select the version you want to use
              on your portfolio.
            </p>
          </div>


          <div className="grid gap-4 md:grid-cols-3">

            {candidates.map(
              (candidate) => {

                const isSelected =
                  selectedCandidate ===
                  candidate.id;

                return (
                  <div
                    key={candidate.id}
                    className={[
                      'overflow-hidden rounded-xl border transition',
                      isSelected
                        ? 'border-white/40 bg-white/10'
                        : 'border-white/10 bg-black/20 hover:border-white/20',
                    ].join(' ')}
                  >

                    {/* Image */}

                    <div className="relative aspect-[3/4] overflow-hidden bg-black">

                      <img
                        src={mediaUrl(
                          candidate.url
                        )}
                        alt={
                          candidate.name ||
                          'AI hero candidate'
                        }
                        className="h-full w-full object-contain"
                      />

                    </div>


                    {/* Information */}

                    <div className="p-4">

                      <p className="text-sm font-medium text-white">
                        {candidate.name ||
                          'AI Version'}
                      </p>

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
                        className="mt-4 w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                      >

                        {isSelected
                          ? '✓ Using this image'
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
          SELECTED STATUS
      ==================================================== */}

      {selectedCandidate && (
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">

          <p className="text-sm text-white">
            ✓ AI Hero image selected
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your Hero will use this image after
            the profile is saved.
          </p>

        </div>
      )}

    </div>
  );
}