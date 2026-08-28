import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

import { useRef, useState } from 'react';

import { HiArrowDown } from 'react-icons/hi';

import SocialLinks from '../../components/SocialLinks.jsx';

import { mediaUrl } from '../../api/client';


// ============================================================
// TEXT ANIMATION
// ============================================================

const container = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};


const item = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


// ============================================================
// HERO
// ============================================================

export default function Hero({ profile }) {

  const name =
    profile?.name || 'Your Name';

  const headline =
    profile?.headline || 'Full-Stack Developer';

  const reduce =
    useReducedMotion();


  // ==========================================================
  // REF
  // ==========================================================

  const sectionRef =
    useRef(null);


  // ==========================================================
  // HOVER
  // ==========================================================

  const [imageHovered, setImageHovered] =
    useState(false);


  // ==========================================================
  // SCROLL
  // ==========================================================

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,

      offset: [
        'start start',
        'end start',
      ],
    });


  // ==========================================================
  // DESKTOP IMAGE SCROLL
  // ==========================================================

  const imageX =
    useTransform(
      scrollYProgress,
      [0, 0.35, 0.75, 1],
      [0, 10, 220, 650]
    );


  const imageScrollY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, -25]
    );


  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [1, 1.015, 1.08]
    );


  const imageOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.55, 0.78, 1],
      [1, 1, 0.45, 0]
    );


  // ==========================================================
  // MOBILE IMAGE SCROLL
  // ==========================================================

  const mobileImageX =
    useTransform(
      scrollYProgress,
      [0, 0.45, 1],
      [0, 15, 280]
    );


  const mobileImageScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [1, 1.04]
    );


  // ==========================================================
  // MOUSE PARALLAX
  // ==========================================================

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);


  const springX =
    useSpring(mouseX, {
      stiffness: 40,
      damping: 20,
    });


  const springY =
    useSpring(mouseY, {
      stiffness: 40,
      damping: 20,
    });


  const handleMouseMove =
    (event) => {

      if (reduce) return;

      const x =
        (event.clientX /
          window.innerWidth -
          0.5) * 10;

      const y =
        (event.clientY /
          window.innerHeight -
          0.5) * 8;

      mouseX.set(x);
      mouseY.set(y);
    };


  const handleMouseLeave =
    () => {

      if (reduce) return;

      mouseX.set(0);
      mouseY.set(0);
    };


  // ==========================================================
  // AVATAR
  // ==========================================================

  const avatar =
    profile?.avatarUrl
      ? mediaUrl(profile.avatarUrl)
      : null;


  // ==========================================================
  // STARS
  // ==========================================================

  const stars =
    Array.from({ length: 34 });


  return (

    <section
      ref={sectionRef}
      id="hero"

      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}

      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        pt-16
      "
    >


      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >

        {/* Large extremely soft light */}

        <motion.div
          className="
            absolute
            right-[10%]
            top-1/3
            h-[650px]
            w-[650px]
            -translate-y-1/3
            rounded-full
            bg-white/[0.025]
            blur-[160px]
          "

          animate={
            reduce
              ? {}
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.5, 0.8, 0.5],
                }
          }

          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />


        {/* Small secondary atmosphere */}

        <motion.div
          className="
            absolute
            right-[35%]
            top-[30%]
            h-[260px]
            w-[260px]
            rounded-full
            bg-white/[0.018]
            blur-[110px]
          "

          animate={
            reduce
              ? {}
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.3, 0.6, 0.3],
                }
          }

          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />


        {/* Very subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.018]

            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]

            [background-size:90px_90px]
          "
        />

      </div>



      {/* ======================================================
          SLOW MOVING STARS
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          overflow-hidden
        "
      >

        {stars.map((_, index) => {

          const left =
            `${(index * 29 + 11) % 100}%`;

          const top =
            `${(index * 47 + 9) % 100}%`;


          /*
           * Almost all stars are 1px.
           * Only a few become 2px.
           */

          const size =
            index % 11 === 0
              ? 2
              : 1;


          /*
           * Different movement distances
           * make the stars feel organic.
           */

          const moveY =
            index % 4 === 0
              ? -18
              : -8;


          const moveX =
            index % 5 === 0
              ? 12
              : 5;


          return (

            <motion.span
              key={index}

              className="
                absolute
                rounded-full
                bg-white
              "

              style={{
                left,
                top,

                width: size,
                height: size,

                boxShadow:
                  index % 9 === 0
                    ? '0 0 8px rgba(255,255,255,0.65)'
                    : 'none',
              }}

              initial={{
                opacity: 0,
              }}

              animate={
                reduce
                  ? {
                      opacity: 0.2,
                    }

                  : {
                      opacity:
                        index % 7 === 0
                          ? [0.05, 0.65, 0.05]
                          : [0.04, 0.28, 0.04],

                      x:
                        index % 5 === 0
                          ? [0, moveX, 0]
                          : [0, moveX / 2, 0],

                      y:
                        index % 4 === 0
                          ? [0, moveY, 0]
                          : [0, moveY / 2, 0],

                      scale:
                        index % 8 === 0
                          ? [1, 1.35, 1]
                          : [1, 1.1, 1],
                    }
              }

              transition={{
                /*
                 * VERY SLOW.
                 */

                duration:
                  16 + (index % 9) * 2,

                delay:
                  (index % 12) * 1.2,

                repeat: Infinity,

                ease: 'easeInOut',
              }}
            />

          );

        })}


        {/* ==================================================
            FEW BRIGHT SPARKS
        ================================================== */}

        {[1, 2, 3, 4].map((spark) => (

          <motion.span
            key={`spark-${spark}`}

            className="
              absolute
              h-[2px]
              w-[2px]
              rounded-full
              bg-white
            "

            style={{
              left:
                `${18 + spark * 17}%`,

              top:
                `${15 + spark * 14}%`,

              boxShadow:
                '0 0 7px rgba(255,255,255,0.8)',
            }}

            animate={
              reduce
                ? {
                    opacity: 0.2,
                  }

                : {
                    opacity: [
                      0,
                      0.9,
                      0,
                    ],

                    scale: [
                      0.6,
                      1.3,
                      0.6,
                    ],

                    x: [
                      0,
                      8,
                      0,
                    ],

                    y: [
                      0,
                      -12,
                      0,
                    ],
                  }
            }

            transition={{
              /*
               * Slow sparkle.
               */

              duration:
                8 + spark * 2,

              delay:
                spark * 2.5,

              repeat: Infinity,

              ease: 'easeInOut',
            }}
          />

        ))}

      </div>



      {/* ======================================================
          DESKTOP HERO IMAGE
      ====================================================== */}

      {avatar && (

        <motion.div

          onMouseEnter={() =>
            setImageHovered(true)
          }

          onMouseLeave={() =>
            setImageHovered(false)
          }

          className="
            pointer-events-auto
            absolute

            right-[-3%]
            top-[22%]

            z-[5]

            hidden
            -translate-y-1/2

            md:block

            h-[72vh]
            w-[52vw]

            lg:h-[78vh]
            lg:w-[55vw]

            xl:h-[84vh]
            xl:w-[57vw]

            2xl:h-[86vh]
            2xl:w-[59vw]

            max-w-[1050px]
          "

          style={{
            x: springX,
            y: springY,
          }}
        >


          {/* ==================================================
              OUTER COLOR GLOW
          ================================================== */}

          <AnimatePresence>

            {imageHovered && (

              <motion.img
                src={avatar}
                alt=""
                aria-hidden="true"

                initial={{
                  opacity: 0,
                  scale: 0.98,
                }}

                animate={{
                  opacity: 0.72,
                  scale: 1.03,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.98,
                }}

                transition={{
                  duration: 0.55,
                  ease: 'easeOut',
                }}

                style={{
                  x: imageX,
                  y: imageScrollY,
                  scale: imageScale,
                }}

                className="
                  pointer-events-none
                  absolute
                  inset-[-5%]

                  h-[110%]
                  w-[110%]

                  object-contain

                  blur-[38px]

                  saturate-[2.2]

                  brightness-[1.2]

                  opacity-0
                "
              />

            )}

          </AnimatePresence>



          {/* ==================================================
              SECOND SOFT COLOR HALO
          ================================================== */}

          <motion.img
            src={avatar}
            alt=""
            aria-hidden="true"

            style={{
              x: imageX,
              y: imageScrollY,
              scale: imageScale,
            }}

            animate={{
              opacity:
                imageHovered
                  ? 0.32
                  : 0,
            }}

            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}

            className="
              pointer-events-none
              absolute

              inset-[-3%]

              h-[106%]
              w-[106%]

              object-contain

              blur-[65px]

              saturate-[2]

              brightness-[1.15]
            "
          />



          {/* ==================================================
              MAIN PNG
          ================================================== */}

          <motion.div
            style={{
              x: imageX,
              y: imageScrollY,
              scale: imageScale,
              opacity: imageOpacity,
            }}

            animate={
              reduce
                ? {}
                : {
                    y: [
                      0,
                      -7,
                      0,
                    ],
                  }
            }

            transition={{
              y: {
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}

            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >

            <img
              src={avatar}
              alt={name}

              className="
                pointer-events-none

                h-full
                w-full

                object-contain

                drop-shadow-[0_25px_60px_rgba(0,0,0,0.65)]

                transition-transform
                duration-700
                ease-out

                hover:scale-[1.015]
              "
            />

          </motion.div>



          {/* ==================================================
              SMALL WHITE HIGHLIGHT ON HOVER
          ================================================== */}

          <AnimatePresence>

            {imageHovered && (

              <motion.div
                initial={{
                  opacity: 0,
                }}

                animate={{
                  opacity: 0.35,
                }}

                exit={{
                  opacity: 0,
                }}

                transition={{
                  duration: 0.4,
                }}

                className="
                  pointer-events-none

                  absolute
                  inset-[8%]

                  rounded-full

                  bg-white/[0.025]

                  blur-[55px]
                "
              />

            )}

          </AnimatePresence>

        </motion.div>

      )}



      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          container
          relative
          z-10

          grid
          min-h-[calc(100vh-4rem)]

          items-center

          md:grid-cols-[1.05fr_0.95fr]
        "
      >

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"

          className="
            max-w-2xl

            pb-32
            md:pb-0
          "
        >


          {/* ==================================================
              INTRO
          ================================================== */}

          <motion.p
            variants={item}

            className="
              mb-4

              flex
              items-center
              gap-3

              font-mono
              text-sm

              uppercase
              tracking-wider

              text-white/50
            "
          >

            <span
              className="
                h-px
                w-8
                bg-white/60
              "
            />

            Hi, I&apos;m

          </motion.p>



          {/* ==================================================
              NAME
          ================================================== */}

          <motion.h1
            variants={item}

            className="
              font-display

              text-5xl
              font-extrabold

              leading-[0.95]

              tracking-tight

              text-white

              sm:text-6xl

              lg:text-7xl

              xl:text-8xl
            "
          >

            {name}

          </motion.h1>



          {/* ==================================================
              HEADLINE
          ================================================== */}

          <motion.p
            variants={item}

            className="
              mt-5

              font-display

              text-2xl
              font-semibold

              text-white/75

              sm:text-3xl
            "
          >

            {headline}

          </motion.p>



          {/* ==================================================
              BIO
          ================================================== */}

          {profile?.bio && (

            <motion.p
              variants={item}

              className="
                mt-5

                max-w-xl

                leading-relaxed

                text-white/45
              "
            >

              {profile.bio}

            </motion.p>

          )}



          {/* ==================================================
              BUTTONS
          ================================================== */}

          <motion.div
            variants={item}

            className="
              mt-9

              flex
              flex-wrap

              gap-4
            "
          >

            <a
              href="#projects"

              className="
                rounded-full

                bg-white

                px-6
                py-3

                text-sm
                font-semibold

                text-black

                transition-all
                duration-300

                hover:-translate-y-1

                hover:shadow-[0_0_35px_rgba(255,255,255,0.2)]
              "
            >
              View my work
            </a>


            <a
              href="#contact"

              className="
                rounded-full

                border
                border-white/20

                px-6
                py-3

                text-sm
                font-medium

                text-white/70

                transition-all
                duration-300

                hover:border-white/50
                hover:text-white
              "
            >
              Get in touch
            </a>

          </motion.div>



          {/* ==================================================
              SOCIAL LINKS
          ================================================== */}

          <motion.div
            variants={item}

            className="mt-8"
          >

            <SocialLinks
              socials={profile?.socials}
              email={profile?.email}
            />

          </motion.div>

        </motion.div>


        {/* ==================================================
            DESKTOP IMAGE SPACE
        ================================================== */}

        <div
          className="
            hidden
            md:block
          "
        />

      </div>



      {/* ======================================================
          LOCATION
      ====================================================== */}

      {profile?.location && (

        <div
          className="
            absolute

            bottom-8
            right-8

            z-20

            hidden
            md:block

            rounded-full

            border
            border-white/10

            bg-black/40

            px-4
            py-2

            font-mono
            text-xs

            text-white/45

            backdrop-blur-md
          "
        >

          {profile.location}

        </div>

      )}



      {/* ======================================================
          SCROLL INDICATOR
      ====================================================== */}

      <motion.a
        href="#about"

        className="
          absolute

          bottom-7
          left-1/2

          z-20

          -translate-x-1/2

          text-white/35

          transition

          hover:text-white
        "

        animate={
          reduce
            ? {}
            : {
                y: [0, 6, 0],
              }
        }

        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}

        aria-label="Scroll to about"
      >

        <div
          className="
            flex
            flex-col
            items-center
            gap-2
          "
        >

          <span
            className="
              font-mono

              text-[9px]

              uppercase

              tracking-[0.3em]
            "
          >
            Scroll
          </span>

          <HiArrowDown size={20} />

        </div>

      </motion.a>



      {/* ======================================================
          MOBILE IMAGE
      ====================================================== */}

      {avatar && (

        <motion.div

          className="
            absolute

            left-1/2
            bottom-2

            z-[4]

            block

            h-[38vh]
            w-[88vw]

            -translate-x-1/2

            md:hidden
          "

          style={{
            x: springX,
          }}
        >


          {/* Mobile glow */}

          <motion.img
            src={avatar}
            alt=""
            aria-hidden="true"

            className="
              pointer-events-none

              absolute

              inset-[5%]

              h-[90%]
              w-[90%]

              object-contain

              blur-[45px]

              saturate-[1.8]

              opacity-30
            "
          />


          {/* Mobile PNG */}

          <motion.img
            src={avatar}
            alt={name}

            style={{
              x: mobileImageX,

              opacity:
                imageOpacity,

              scale:
                mobileImageScale,
            }}

            className="
              pointer-events-none

              absolute

              inset-0

              h-full
              w-full

              object-contain

              drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)]
            "
          />


          {/* Bottom fade */}

          <div
            className="
              pointer-events-none

              absolute

              inset-x-0
              bottom-0

              h-[25%]

              bg-gradient-to-t
              from-black
              to-transparent
            "
          />

        </motion.div>

      )}

    </section>
  );
}