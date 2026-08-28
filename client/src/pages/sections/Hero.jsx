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
    profile?.headline ||
    'Full-Stack Developer';

  const reduce =
    useReducedMotion();


  // ==========================================================
  // REFS
  // ==========================================================

  const sectionRef =
    useRef(null);


  // ==========================================================
  // HOVER STATE
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


  // ----------------------------------------------------------
  // Image movement on scroll
  // ----------------------------------------------------------

  const imageX =
    useTransform(
      scrollYProgress,
      [0, 0.45, 1],
      [0, 50, 650]
    );


  const imageY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, -35]
    );


  // ----------------------------------------------------------
  // Image scale
  // ----------------------------------------------------------

  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 0.55, 1],
      [1, 1.015, 1.08]
    );


  // ----------------------------------------------------------
  // Image opacity
  // ----------------------------------------------------------

  const imageOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.55, 0.82, 1],
      [1, 1, 0.35, 0]
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
          0.5) * 12;

      const y =
        (event.clientY /
          window.innerHeight -
          0.5) * 10;

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
  // PARTICLES
  // ==========================================================

  const particles =
    Array.from({ length: 26 });


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

        {/* Main soft atmosphere */}

        <div
          className="
            absolute
            right-[12%]
            top-[45%]
            h-[500px]
            w-[500px]
            -translate-y-1/2
            rounded-full
            bg-white/[0.025]
            blur-[140px]
          "
        />


        {/* Small ambient light */}

        <div
          className="
            absolute
            right-[25%]
            top-[30%]
            h-[260px]
            w-[260px]
            rounded-full
            bg-white/[0.018]
            blur-[100px]
          "
        />


        {/* Very subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.022]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />

      </div>


      {/* ======================================================
          STARS / SPARK PARTICLES
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

        {particles.map((_, index) => {

          const left =
            `${(index * 37 + 7) % 100}%`;

          const top =
            `${(index * 61 + 13) % 100}%`;

          const size =
            index % 6 === 0
              ? 3
              : index % 3 === 0
                ? 2
                : 1;


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
              }}

              animate={
                reduce
                  ? {
                      opacity: 0.2,
                    }
                  : {
                      opacity:
                        index % 5 === 0
                          ? [0.15, 0.95, 0.15]
                          : [0.1, 0.45, 0.1],

                      scale:
                        index % 5 === 0
                          ? [1, 1.8, 1]
                          : [1, 1.25, 1],

                      y:
                        index % 4 === 0
                          ? [0, -12, 0]
                          : [0, -7, 0],

                      x:
                        index % 6 === 0
                          ? [0, 5, 0]
                          : [0, 2, 0],
                    }
              }

              transition={{
                duration:
                  3.5 + (index % 5),

                delay:
                  (index % 9) * 0.45,

                repeat: Infinity,

                ease: 'easeInOut',
              }}

              initial={{
                opacity: 0,
              }}
            />

          );
        })}


        {/* ==================================================
            EXTRA BRIGHT SPARKS
        ================================================== */}

        {[1, 2, 3, 4].map((spark) => (

          <motion.span
            key={`spark-${spark}`}

            className="
              absolute
              h-[3px]
              w-[3px]
              rounded-full
              bg-white
              shadow-[0_0_12px_rgba(255,255,255,0.9)]
            "

            style={{
              left:
                `${20 + spark * 16}%`,

              top:
                `${18 + spark * 13}%`,
            }}

            animate={
              reduce
                ? {}
                : {
                    opacity: [
                      0,
                      1,
                      0,
                    ],

                    scale: [
                      0.5,
                      1.8,
                      0.5,
                    ],
                  }
            }

            transition={{
              duration: 2.4,
              delay: spark * 1.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

        ))}

      </div>


      {/* ======================================================
          HERO IMAGE
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
            absolute
            right-[2%]
            top-1/2
            z-[5]
            hidden
            h-[76vh]
            w-[48vw]
            max-w-[720px]
            -translate-y-1/2
            md:block
          "

          style={{
            x: springX,
            y: springY,
          }}
        >

          {/* ==================================================
              COLOR GLOW

              This is a blurred duplicate of the actual PNG.

              Therefore the glow naturally follows the
              colors inside the uploaded image.
          ================================================== */}

          <motion.img
            src={avatar}
            alt=""
            aria-hidden="true"

            style={{
              x: imageX,
              y: imageY,
              scale: imageScale,
              opacity:
                imageHovered
                  ? imageOpacity
                  : 0,
            }}

            animate={{
              filter: imageHovered
                ? 'blur(38px) saturate(1.8) brightness(1.15)'
                : 'blur(38px) saturate(1.5)',
            }}

            transition={{
              duration: 0.45,
              ease: 'easeOut',
            }}

            className="
              pointer-events-none
              absolute
              inset-[-4%]
              h-[108%]
              w-[108%]
              object-contain
            "
          />


          {/* ==================================================
              SECOND COLOR HALO

              Stronger only while hovering.
          ================================================== */}

          <motion.img
            src={avatar}
            alt=""
            aria-hidden="true"

            style={{
              x: imageX,
              y: imageY,
              scale: imageScale,
            }}

            animate={{
              opacity:
                imageHovered
                  ? 0.45
                  : 0,

              filter:
                imageHovered
                  ? 'blur(70px) saturate(2)'
                  : 'blur(70px)',
            }}

            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}

            className="
              pointer-events-none
              absolute
              inset-[2%]
              h-[96%]
              w-[96%]
              object-contain
            "
          />


          {/* ==================================================
              MAIN PNG
          ================================================== */}

          <motion.img
            src={avatar}
            alt={name}

            style={{
              x: imageX,
              y: imageY,
              scale: imageScale,
              opacity: imageOpacity,
            }}

            animate={
              reduce
                ? {}
                : {
                    y: [
                      0,
                      -5,
                      0,
                    ],
                  }
            }

            transition={{
              y: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}

            className="
              pointer-events-none
              absolute
              inset-0
              h-full
              w-full
              object-contain
              drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)]
            "
          />


          {/* ==================================================
              SMALL HOVER HIGHLIGHT
          ================================================== */}

          <AnimatePresence>

            {imageHovered && (

              <motion.div
                initial={{
                  opacity: 0,
                }}

                animate={{
                  opacity: 1,
                }}

                exit={{
                  opacity: 0,
                }}

                transition={{
                  duration: 0.35,
                }}

                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-full
                  bg-white/[0.025]
                  blur-[45px]
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
          md:grid-cols-[1.1fr_0.9fr]
        "
      >

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="
            max-w-2xl
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


        {/* Reserve image column */}

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
            md:block
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
                y: [0, 7, 0],
              }
        }

        transition={{
          duration: 1.8,
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
            bottom-0
            left-1/2
            z-[4]
            block
            h-[50vh]
            w-[95vw]
            -translate-x-1/2
            md:hidden
          "

          style={{
            x: springX,
          }}
        >

          {/* Mobile colored glow */}

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
              saturate-[1.7]
              opacity-45
            "
          />


          {/* Mobile image */}

          <motion.img
            src={avatar}
            alt={name}

            style={{
              x: useTransform(
                scrollYProgress,
                [0, 0.45, 1],
                [0, 25, 280]
              ),

              opacity:
                imageOpacity,

              scale:
                useTransform(
                  scrollYProgress,
                  [0, 1],
                  [1, 1.05]
                ),
            }}

            className="
              pointer-events-none
              absolute
              inset-0
              h-full
              w-full
              object-contain
            "
          />


          {/* Mobile bottom fade */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-[28%]
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