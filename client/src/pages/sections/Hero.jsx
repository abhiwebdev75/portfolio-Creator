import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

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
  // HERO SECTION REF
  // ==========================================================

  const heroRef =
    useMotionValue(null);

  const sectionRef = (node) => {
    heroRef.set(node);
  };


  // ==========================================================
  // SCROLL
  // ==========================================================

  const { scrollYProgress } =
    useScroll({
      target: heroRef,
      offset: [
        'start start',
        'end start',
      ],
    });


  /*
   * Image starts in its normal position.
   *
   * As the user scrolls:
   *
   * 0%   → normal
   * 45%  → moves right
   * 100% → completely disappears
   */

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0, 100, 600]
  );


  const imageY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -10, -40]
  );


  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [1, 1.02, 1.08]
  );


  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    [1, 1, 0.35, 0]
  );


  const imageBlur = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 1, 8]
  );


  // ==========================================================
  // POINTER / HOVER PARALLAX
  // ==========================================================

  const mx =
    useMotionValue(0);

  const my =
    useMotionValue(0);


  const gx =
    useSpring(mx, {
      stiffness: 45,
      damping: 22,
    });


  const gy =
    useSpring(my, {
      stiffness: 45,
      damping: 22,
    });


  const onMouseMove = (event) => {
    if (reduce) return;

    const x =
      (event.clientX /
        window.innerWidth -
        0.5) *
      18;

    const y =
      (event.clientY /
        window.innerHeight -
        0.5) *
      14;

    mx.set(x);
    my.set(y);
  };


  const onMouseLeave = () => {
    if (reduce) return;

    mx.set(0);
    my.set(0);
  };


  // ==========================================================
  // IMAGE
  // ==========================================================

  const avatar =
    profile?.avatarUrl
      ? mediaUrl(profile.avatarUrl)
      : null;


  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        pt-16
      "
    >

      {/* ====================================================
          BACKGROUND ATMOSPHERE
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

        {/* Main soft light */}

        <div
          className="
            absolute
            left-[55%]
            top-[35%]
            h-[520px]
            w-[520px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/[0.035]
            blur-[140px]
          "
        />


        {/* Colored ambient glow */}

        <div
          className="
            absolute
            right-[10%]
            top-[20%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-fuchsia-500/[0.025]
            blur-[130px]
          "
        />


        <div
          className="
            absolute
            right-[20%]
            bottom-[5%]
            h-[360px]
            w-[360px]
            rounded-full
            bg-cyan-400/[0.02]
            blur-[120px]
          "
        />


        {/* Very subtle grid */}

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
          FLOATING PARTICLES
      ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          overflow-hidden
        "
      >

        {Array.from({
          length: 24,
        }).map((_, index) => (
          <motion.span
            key={index}
            className="
              absolute
              h-[2px]
              w-[2px]
              rounded-full
              bg-white
              opacity-20
              shadow-[0_0_10px_rgba(255,255,255,0.8)]
            "
            style={{
              left: `${(index * 41) % 100}%`,
              top: `${(index * 67) % 100}%`,
            }}
            animate={
              reduce
                ? {}
                : {
                    y: [
                      0,
                      -18,
                      0,
                    ],

                    x: [
                      0,
                      6,
                      0,
                    ],

                    opacity: [
                      0.1,
                      0.35,
                      0.1,
                    ],
                  }
            }
            transition={{
              duration:
                5 +
                (index % 5),

              repeat: Infinity,

              delay:
                (index % 7) *
                0.5,

              ease:
                'easeInOut',
            }}
          />
        ))}

      </div>


      {/* ====================================================
          POINTER LIGHT
      ==================================================== */}

      <motion.div
        style={{
          x: gx,
          y: gy,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
        "
      >

        <div
          className="
            absolute
            right-[18%]
            top-[25%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-white/[0.025]
            blur-[100px]
          "
        />

      </motion.div>


      {/* ====================================================
          HERO IMAGE
      ==================================================== */}

      {avatar && (
        <motion.div
          style={{
            x: gx,
            y: gy,
          }}
          className="
            pointer-events-none
            absolute
            right-[3%]
            top-1/2
            z-[3]
            hidden
            h-[72vh]
            w-[44vw]
            -translate-y-1/2
            md:block
          "
        >

          {/* ==================================================
              VERY SOFT COLOR GLOW
          ================================================== */}

          <motion.div
            style={{
              opacity:
                imageOpacity,
              scale:
                imageScale,
            }}
            className="
              absolute
              inset-[8%]
              rounded-full
              bg-white/10
              blur-[80px]
            "
          />


          {/* ==================================================
              BLURRED COLOR ATMOSPHERE
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
                  [0, 0.32]
                ),
              filter:
                'blur(32px) saturate(1.25)',
            }}
            className="
              absolute
              left-[8%]
              top-[5%]
              h-[90%]
              w-[84%]
              object-contain
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
              filter: imageBlur,
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-contain
              drop-shadow-[0_0_25px_rgba(255,255,255,0.12)]
            "
          />


          {/* ==================================================
              SOFT LIGHT AROUND SUBJECT
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.25)_62%,black_100%)]
            "
          />


          {/* ==================================================
              LEFT BLEND
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              w-[35%]
              bg-gradient-to-r
              from-black
              via-black/70
              to-transparent
            "
          />


          {/* ==================================================
              TOP BLEND
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-[18%]
              bg-gradient-to-b
              from-black
              to-transparent
            "
          />


          {/* ==================================================
              BOTTOM BLEND
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-[24%]
              bg-gradient-to-t
              from-black
              to-transparent
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
          gap-10
          md:grid-cols-[1.35fr_1fr]
        "
      >

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="
            relative
            z-20
            max-w-3xl
          "
        >

          {/* INTRO */}

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
              text-white/55
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


          {/* NAME */}

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

            <span
              className="
                bg-gradient-to-r
                from-white
                via-white
                to-white/50
                bg-clip-text
                text-transparent
              "
            >
              {name}
            </span>

          </motion.h1>


          {/* HEADLINE */}

          <motion.p
            variants={item}
            className="
              mt-5
              font-display
              text-2xl
              font-semibold
              text-white/80
              sm:text-3xl
            "
          >
            {headline}
          </motion.p>


          {/* BIO */}

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


          {/* BUTTONS */}

          <motion.div
            variants={item}
            className="
              mt-9
              flex
              flex-wrap
              items-center
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
                shadow-[0_0_30px_rgba(255,255,255,0.15)]
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
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
                bg-black/30
                px-6
                py-3
                text-sm
                font-medium
                text-white/70
                backdrop-blur-sm
                transition
                duration-300
                hover:border-white/50
                hover:text-white
              "
            >
              Get in touch
            </a>

          </motion.div>


          {/* SOCIAL LINKS */}

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


        {/* Empty column reserved for image */}

        <div className="hidden md:block" />

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
            bg-black/50
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
          SCROLL INDICATOR
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
                y: [0, 8, 0],
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
            pointer-events-none
            absolute
            bottom-0
            right-0
            z-[4]
            block
            h-[50vh]
            w-full
            md:hidden
          "
        >

          {/* Mobile glow */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[260px]
              w-[260px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/[0.05]
              blur-[80px]
            "
          />


          {/* Mobile image */}

          <motion.img
            src={avatar}
            alt={name}
            style={{
              x: reduce
                ? 0
                : useTransform(
                    scrollYProgress,
                    [0, 0.45, 1],
                    [0, 40, 300]
                  ),

              opacity:
                imageOpacity,

              scale:
                useTransform(
                  scrollYProgress,
                  [0, 1],
                  [1, 1.08]
                ),
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-contain
              drop-shadow-[0_0_25px_rgba(255,255,255,0.12)]
            "
          />


          {/* Mobile bottom fade */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[30%]
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