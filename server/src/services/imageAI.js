import OpenAI, { toFile } from 'openai';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';


// ============================================================
// OPENAI CLIENT
// ============================================================

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// ============================================================
// CONFIGURATION
// ============================================================

const MODEL =
  process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';


// The generated images are stored here.
//
// You can change this later to your existing media directory.
const AI_IMAGE_DIR = path.resolve(
  process.env.AI_IMAGE_DIR ||
    path.join(process.cwd(), 'uploads', 'ai')
);


// Public URL prefix returned to the frontend.
//
// Example:
// /uploads/ai/hero-clean-xxxxx.png
const PUBLIC_PREFIX =
  process.env.AI_IMAGE_PUBLIC_PREFIX ||
  '/uploads/ai';


// ============================================================
// AI STYLE PROMPTS
// ============================================================

const STYLES = [
  {
    id: 'clean',
    name: 'Clean Cinematic',

    prompt: `
Transform the uploaded portrait into a premium monochrome
portrait for a high-end developer portfolio.

IMPORTANT:
Preserve the person's identity exactly as much as possible.

Preserve:
- facial structure
- face shape
- hairstyle
- glasses
- beard/facial hair
- clothing
- body proportions
- recognizable characteristics

Do NOT replace the person.

Remove the original background completely.

Create a clean transparent background around the person.

Convert the subject into sophisticated black-and-white
cinematic photography.

Use:
- deep blacks
- clean white highlights
- subtle gray tones
- realistic skin detail
- professional studio lighting
- subtle cinematic rim lighting

The subject should look like a professional portrait
photographed for a premium software developer portfolio.

The image will be placed over a pure black website background.

Do NOT create a new environment.

Do NOT add:
- text
- logos
- UI
- objects
- scenery
- buildings
- technology objects
- colorful elements

Do not add a visible outline around the person.

The final result should feel minimal, elegant,
cinematic and realistic.

The background must be transparent.
`,
  },

  {
    id: 'dramatic',
    name: 'Dramatic Cinematic',

    prompt: `
Transform the uploaded portrait into a dramatic monochrome
cinematic portrait for a premium developer portfolio.

Preserve the exact identity and recognizable appearance
of the person.

Preserve:
- facial structure
- hairstyle
- glasses
- beard/facial hair
- clothing
- proportions
- recognizable facial characteristics

Remove the entire original background.

Create a transparent background.

Convert the portrait to high-quality black-and-white
cinematic photography.

Use stronger directional lighting with:

- deep shadows
- bright white highlights
- controlled contrast
- subtle silver rim lighting
- realistic skin texture
- professional photographic detail

Create subtle separation around the subject without creating
a visible artificial border.

The subject should appear naturally illuminated from the side,
as if photographed in a dark cinematic studio.

The final image will be composited over a completely black
website background.

Do NOT add:
- text
- logos
- scenery
- buildings
- props
- colorful lighting
- artificial neon
- futuristic objects

Keep the image realistic.

The background must be transparent.
`,
  },

  {
    id: 'soft',
    name: 'Soft Futuristic',

    prompt: `
Transform the uploaded portrait into a refined monochrome
portrait for a premium futuristic developer portfolio.

Preserve the person's identity and appearance.

Do not change:
- facial structure
- hairstyle
- glasses
- facial hair
- clothing
- body proportions
- recognizable characteristics

Remove the original background completely.

Create a transparent background.

Convert the subject into elegant black-and-white
cinematic photography.

Use:

- soft silver highlights
- smooth grayscale tones
- deep but natural blacks
- subtle atmospheric illumination
- soft studio lighting
- very subtle white rim light
- realistic photographic detail

Create a gentle cinematic atmosphere around the subject,
but do not create a visible glow outline.

The image must remain clean and realistic.

The subject will be placed over a pure black website
background.

Do NOT add:
- text
- logos
- scenery
- buildings
- objects
- colorful effects
- neon colors

The final image should feel sophisticated,
minimal, modern and futuristic.

The background must be transparent.
`,
  },
];


// ============================================================
// VALIDATE ENVIRONMENT
// ============================================================

function validateConfiguration() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      'OPENAI_API_KEY is not configured in the server environment.'
    );
  }
}


// ============================================================
// CREATE DIRECTORY
// ============================================================

async function ensureDirectory() {
  await fs.mkdir(AI_IMAGE_DIR, {
    recursive: true,
  });
}


// ============================================================
// CREATE UNIQUE ID
// ============================================================

function createId() {
  return crypto.randomBytes(8).toString('hex');
}


// ============================================================
// NORMALIZE INPUT IMAGE
//
// OpenAI image editing can be sensitive to file types.
// We normalize the uploaded image to PNG before sending it.
// ============================================================

async function normalizeImage(inputPath) {
  const id = createId();

  const normalizedPath = path.join(
    AI_IMAGE_DIR,
    `source-${id}.png`
  );

  await sharp(inputPath)
    .rotate()
    .png({
      compressionLevel: 9,
    })
    .toFile(normalizedPath);

  return normalizedPath;
}


// ============================================================
// READ GENERATED IMAGE
//
// GPT Image responses normally return base64 image data.
// ============================================================

function extractBase64Image(response) {
  if (!response) {
    throw new Error(
      'OpenAI returned an empty image response.'
    );
  }

  if (!Array.isArray(response.data)) {
    throw new Error(
      'OpenAI image response did not contain image data.'
    );
  }

  if (response.data.length === 0) {
    throw new Error(
      'OpenAI returned zero generated images.'
    );
  }

  const image = response.data[0];

  if (!image?.b64_json) {
    throw new Error(
      'OpenAI did not return base64 image data.'
    );
  }

  return image.b64_json;
}


// ============================================================
// SAVE GENERATED PNG
// ============================================================

async function saveGeneratedImage(
  base64,
  style
) {
  const id = createId();

  const filename =
    `hero-${style.id}-${id}.png`;

  const outputPath = path.join(
    AI_IMAGE_DIR,
    filename
  );

  const buffer = Buffer.from(
    base64,
    'base64'
  );

  /*
   * Re-process the generated image through Sharp.
   *
   * This guarantees that the final file is actually PNG.
   */

  await sharp(buffer)
    .png({
      compressionLevel: 9,
    })
    .toFile(outputPath);

  return {
    id,
    style: style.id,
    name: style.name,
    filename,
    path: outputPath,

    /*
     * This is the URL that the frontend will eventually use.
     */
    url: `${PUBLIC_PREFIX}/${filename}`,
  };
}


// ============================================================
// GENERATE ONE HERO VERSION
// ============================================================

async function generateOneVersion(
  imagePath,
  style
) {
  console.log(
    `[AI] Generating ${style.name}...`
  );

  /*
   * Convert the local file into an OpenAI uploadable.
   */

  const imageFile = await toFile(
    await fs.readFile(imagePath),
    'portfolio-source.png',
    {
      type: 'image/png',
    }
  );


  /*
   * Send the original portrait to OpenAI.
   */

  const response =
    await openai.images.edit({
      model: MODEL,

      image: imageFile,

      prompt: style.prompt,

      /*
       * Transparent background is important because
       * Hero.jsx will place this over pure black.
       */

      background: 'transparent',

      /*
       * PNG is ideal for preserving transparency.
       */

      output_format: 'png',

      /*
       * One result per request.
       */

      n: 1,
    });


  const base64 =
    extractBase64Image(response);


  const saved =
    await saveGeneratedImage(
      base64,
      style
    );


  console.log(
    `[AI] ${style.name} generated: ${saved.filename}`
  );


  return saved;
}


// ============================================================
// GENERATE ALL THREE HERO VERSIONS
// ============================================================

export async function generateHeroCandidates(
  inputImagePath
) {
  validateConfiguration();

  await ensureDirectory();


  /*
   * Check whether the uploaded file exists.
   */

  try {
    await fs.access(inputImagePath);
  } catch {
    throw new Error(
      `Input image does not exist: ${inputImagePath}`
    );
  }


  /*
   * Normalize the user's uploaded image to PNG.
   */

  let normalizedPath = null;

  try {
    normalizedPath =
      await normalizeImage(
        inputImagePath
      );


    /*
     * Generate all three versions.
     *
     * Promise.all means they can be generated
     * concurrently instead of waiting for:
     *
     * image 1 → image 2 → image 3
     *
     * This can significantly reduce total waiting time.
     */

    const candidates =
      await Promise.all(
        STYLES.map((style) =>
          generateOneVersion(
            normalizedPath,
            style
          )
        )
      );


    return {
      success: true,

      candidates,
    };

  } finally {

    /*
     * Delete the temporary normalized source.
     *
     * The original uploaded image remains untouched.
     */

    if (normalizedPath) {
      try {
        await fs.unlink(
          normalizedPath
        );
      } catch {
        // Ignore cleanup errors.
      }
    }
  }
}


// ============================================================
// DELETE AI CANDIDATE
// ============================================================

export async function deleteGeneratedImage(
  candidate
) {
  if (!candidate?.path) {
    return;
  }

  try {
    await fs.unlink(
      candidate.path
    );
  } catch (error) {

    /*
     * ENOENT simply means the file was already deleted.
     */

    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}


// ============================================================
// DELETE MULTIPLE AI CANDIDATES
// ============================================================

export async function deleteGeneratedImages(
  candidates = []
) {
  await Promise.all(
    candidates.map(
      (candidate) =>
        deleteGeneratedImage(
          candidate
        )
    )
  );
}


// ============================================================
// EXPORT CONFIGURATION
// ============================================================

export const imageAIConfig = {
  model: MODEL,
  directory: AI_IMAGE_DIR,
  publicPrefix: PUBLIC_PREFIX,
  styles: STYLES.map(
    ({ id, name }) => ({
      id,
      name,
    })
  ),
};