import {
  HiOutlineLocationMarker,
  HiOutlineMail,
} from 'react-icons/hi';

import SectionHeading from '../../components/SectionHeading.jsx';

import Reveal from '../../components/Reveal.jsx';

import { mediaUrl } from '../../api/client';

export default function About({ profile }) {
  const name = profile?.name || 'Profile';

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        border-t
        border-white/[0.06]
        bg-black
        py-24
        sm:py-32
      "
    >

      {/* =================================================
          ATMOSPHERIC BACKGROUND
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        {/* Soft white atmosphere */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/[0.025]
            blur-[140px]
          "
        />

        {/* Very subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="container relative z-10">

        <SectionHeading
          eyebrow="Get to know me"
          title="About Me"
        />


        <div
          className="
            mx-auto
            grid
            max-w-5xl
            items-center
            gap-12
            md:grid-cols-[0.8fr_1.5fr]
            lg:gap-20
          "
        >

          {/* =================================================
              IMAGE
          ================================================= */}

          <Reveal className="flex justify-center">

            {profile?.avatarUrl ? (

              <div
                className="
                  relative
                  flex
                  h-64
                  w-64
                  items-center
                  justify-center
                  sm:h-72
                  sm:w-72
                "
              >

                {/* Atmospheric glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-[15%]
                    rounded-full
                    bg-white/[0.08]
                    blur-[70px]
                  "
                />

                {/* Image */}

                <img
                  src={mediaUrl(profile.avatarUrl)}
                  alt={name}
                  className="
                    relative
                    h-full
                    w-full
                    object-cover
                    grayscale
                    contrast-[1.12]
                    brightness-[0.9]
                    opacity-90
                    [mask-image:radial-gradient(circle,black_45%,rgba(0,0,0,0.85)_65%,transparent_100%)]
                    [-webkit-mask-image:radial-gradient(circle,black_45%,rgba(0,0,0,0.85)_65%,transparent_100%)]
                  "
                />

              </div>

            ) : (

              <div
                className="
                  relative
                  flex
                  h-64
                  w-64
                  items-center
                  justify-center
                  rounded-full
                  bg-white/[0.03]
                  text-6xl
                  font-extrabold
                  text-white/60
                  shadow-[0_0_80px_rgba(255,255,255,0.05)]
                  sm:h-72
                  sm:w-72
                "
              >

                {name[0]}

              </div>

            )}

          </Reveal>


          {/* =================================================
              TEXT
          ================================================= */}

          <Reveal delay={0.1}>

            <div>

              <p
                className="
                  whitespace-pre-line
                  text-base
                  leading-[1.9]
                  text-white/55
                  sm:text-lg
                "
              >
                {profile?.bio ||
                  'Add your bio from the admin dashboard.'}
              </p>


              {/* =================================================
                  DETAILS
              ================================================= */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-x-8
                  gap-y-4
                  border-t
                  border-white/[0.08]
                  pt-6
                  text-sm
                  text-white/40
                "
              >

                {profile?.location && (

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      transition
                      hover:text-white
                    "
                  >

                    <HiOutlineLocationMarker
                      className="
                        text-white/60
                      "
                      size={17}
                    />

                    {profile.location}

                  </span>

                )}


                {profile?.email && (

                  <a
                    href={`mailto:${profile.email}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      transition
                      hover:text-white
                    "
                  >

                    <HiOutlineMail
                      className="
                        text-white/60
                      "
                      size={17}
                    />

                    {profile.email}

                  </a>

                )}

              </div>

            </div>

          </Reveal>

        </div>

      </div>

    </section>
  );
}