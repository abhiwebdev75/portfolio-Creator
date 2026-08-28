import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

import { useRef } from 'react';

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
  // HERO REF
  // ==========================================================

  const sectionRef =
    useRef(null);


  // ==========================================================
  // SCROLL ANIMATION
  // ==========================================================

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,

      offset: [
        'start start',
        'end start',
      ],
    });


  // Image moves right while scrolling

  const imageX =
    useTransform(
      scrollYProgress,
      [0, 0.45, 1],
      [0, 60, 500]
    );


  // Slight upward movement

  const imageY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, -40]
    );


  // Small zoom

  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 0.6, 1],
      [1, 1.02, 1.08]
    );


  // Fade away

  const imageOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.55, 0.85, 1],
      [1, 1, 0.25, 0]
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
      stiffness: 45,
      damping: 20,
    });


  const springY =
    useSpring(mouseY, {
      stiffness: 45,
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
  // AVATAR FROM ADMIN PANEL
  // ==========================================================

  const avatar =
    profile?.avatarUrl
      ? mediaUrl(profile.avatarUrl)
      : null;


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

      {/* ====================================================
          BACKGROUND
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >

        {/* subtle light behind image */}

        <div
          className="
            absolute
            right-[12%]
            top-1/2
            h-[420px]
            w-[420px]
            -translate-y-1/2
            rounded-full
            bg-white/[0.025]
            blur-[120px]
          "
        />

        {/* subtle center atmosphere */}

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
            bg-white/[0.015]
            blur-[150px]
          "
        />

        {/* very subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />

      </div>


      {/* ====================================================
          HERO IMAGE
      ==================================================== */}

      {avatar && (

        <motion.div
          className="
            pointer-events-auto
            absolute
            right-[5%]
            top-1/2
            z-[5]
            hidden
            h-[66vh]
            w-[42vw]
            max-w-[620px]
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

              This uses the actual image itself.

              Because the blurred image remains colored,
              the glow naturally follows the object's colors.
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
                useTransform(
                  imageOpacity,
                  [0, 1],
                  [0, 0.7]
                ),
            }}
            className="
              absolute
              inset-[8%]
              h-[84%]
              w-[84%]
              object-contain
              opacity-0
              blur-[35px]
              saturate-[1.5]
              transition-opacity
              duration-500
              hover:opacity-100
            "
          />


          {/* ==================================================
              MAIN IMAGE
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
            className="
              hero-person
              absolute
              inset-0
              h-full
              w-full
              object-contain
              transition-all
              duration-500
              ease-out
              drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]
              hover:scale-[1.025]
            "
          />


          {/* ==================================================
              HOVER COLOR GLOW

              The blurred copy behind the subject creates
              a natural glow matching the image's colors.
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[5%]
              rounded-full
              opacity-0
              blur-[65px]
              transition-opacity
              duration-500
              hover:opacity-40
            "
          />

        </motion.div>
      )}


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div
        className="
          container
          relative
          z-10
          grid
          min-h-[calc(100vh-4rem)]
          items-center
          md:grid-cols-[1.15fr_0.85fr]
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
              EYEBROW
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


        {/* Image space */}

        <div
          className="
            hidden
            md:block
          "
        />

      </div>


      {/* ====================================================
          LOCATION
      ==================================================== */}

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


      {/* ====================================================
          SCROLL
      ==================================================== */}

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


      {/* ====================================================
          MOBILE IMAGE
      ==================================================== */}

      {avatar && (

        <motion.div
          className="
            pointer-events-auto
            absolute
            bottom-0
            left-1/2
            z-[4]
            block
            h-[50vh]
            w-[90vw]
            -translate-x-1/2
            md:hidden
          "
          style={{
            x: springX,
          }}
        >

          {/* colored blurred glow */}

          <img
            src={avatar}
            alt=""
            aria-hidden="true"
            className="
              absolute
              inset-[12%]
              h-[76%]
              w-[76%]
              object-contain
              blur-[35px]
              opacity-50
              saturate-[1.5]
            "
          />


          {/* actual PNG */}

          <motion.img
            src={avatar}
            alt={name}
            style={{
              x: useTransform(
                scrollYProgress,
                [0, 0.45, 1],
                [0, 30, 250]
              ),

              opacity: imageOpacity,

              scale:
                useTransform(
                  scrollYProgress,
                  [0, 1],
                  [1, 1.05]
                ),
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-contain
            "
          />


          {/* bottom fade */}

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