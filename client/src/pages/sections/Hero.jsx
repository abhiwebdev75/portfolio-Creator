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


// ======================================================
// TEXT ANIMATION
// ======================================================

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


// ======================================================
// HERO
// ======================================================

export default function Hero({ profile }) {
  const name = profile?.name || 'Your Name';

  const headline =
    profile?.headline || 'Full-Stack Developer';

  const reduce = useReducedMotion();

  // ====================================================
  // HERO REF
  // ====================================================

  const heroRef = useMotionValue(null);

  /*
   * We use a normal DOM ref separately because
   * useScroll needs the actual section element.
   */
  const sectionRef = (node) => {
    heroRef.set(node);
  };


  // ====================================================
  // SCROLL ANIMATION
  // ====================================================

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });


  /*
   * Desktop:
   * image moves far toward the right.
   *
   * Mobile:
   * the same movement is intentionally smaller
   * through responsive CSS positioning.
   */

  const imageX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduce ? 0 : 650]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduce ? 1 : 1.1]
  );

  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 0.65, 0]
  );

  const imageBlur = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 2, 8]
  );


  // ====================================================
  // POINTER PARALLAX
  // ====================================================

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const gx = useSpring(mx, {
    stiffness: 40,
    damping: 20,
  });

  const gy = useSpring(my, {
    stiffness: 40,
    damping: 20,
  });


  const onMouseMove = (event) => {
    if (reduce) return;

    mx.set(
      (event.clientX / window.innerWidth - 0.5) * 30
    );

    my.set(
      (event.clientY / window.innerHeight - 0.5) * 30
    );
  };


  // ====================================================
  // IMAGE
  // ====================================================

  const avatar = profile?.avatarUrl
    ? mediaUrl(profile.avatarUrl)
    : null;


  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        pt-16
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
          z-0
          overflow-hidden
        "
      >

        {/* Main radial atmosphere */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_75%_50%,rgba(255,255,255,0.055),transparent_42%)]
          "
        />

        {/* Bottom atmosphere */}

        <div
          className="
            absolute
            bottom-[-15%]
            left-[20%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-white/[0.025]
            blur-[140px]
          "
        />

        {/* Top atmosphere */}

        <div
          className="
            absolute
            right-[10%]
            top-[5%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-white/[0.035]
            blur-[120px]
          "
        />

        {/* Very subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />

      </div>


      {/* =================================================
          FLOATING PARTICLES
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          overflow-hidden
        "
      >

        {Array.from({ length: 28 }).map((_, index) => (
          <span
            key={index}
            className="
              absolute
              h-[2px]
              w-[2px]
              rounded-full
              bg-white
              opacity-20
              shadow-[0_0_8px_rgba(255,255,255,0.8)]
              animate-particle-float
            "
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 61) % 100}%`,
              animationDelay: `${(index % 8) * 0.7}s`,
              animationDuration: `${5 + (index % 5)}s`,
            }}
          />
        ))}

      </div>


      {/* =================================================
          POINTER AMBIENT LIGHT
      ================================================= */}

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
            right-[10%]
            top-[20%]
            h-[350px]
            w-[350px]
            rounded-full
            bg-white/[0.025]
            blur-[100px]
          "
        />

      </motion.div>


      {/* =================================================
          CINEMATIC IMAGE
      ================================================= */}

      {avatar && (
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-[3]
            w-[68%]
            sm:w-[65%]
            lg:w-[62%]
          "
        >

          {/* ---------------------------------------------
              BLURRED ATMOSPHERIC IMAGE
          ---------------------------------------------- */}

          <motion.img
            src={avatar}
            alt=""
            aria-hidden="true"
            style={{
              x: imageX,
              scale: imageScale,
              opacity: imageOpacity,
              filter: 'grayscale(100%) blur(35px)',
            }}
            className="
              absolute
              inset-[-8%]
              h-[116%]
              w-[116%]
              object-cover
              mix-blend-screen
              opacity-30
              mask-[radial-gradient(ellipse_65%_65%_at_55%_50%,black_20%,rgba(0,0,0,0.75)_55%,transparent_100%)]
              [-webkit-mask-image:radial-gradient(ellipse_65%_65%_at_55%_50%,black_20%,rgba(0,0,0,0.75)_55%,transparent_100%)]
            "
          />


          {/* ---------------------------------------------
              MAIN IMAGE
          ---------------------------------------------- */}

          <motion.img
            src={avatar}
            alt={name}
            style={{
              x: imageX,
              scale: imageScale,
              opacity: imageOpacity,
              filter: imageBlur,
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
              grayscale
              contrast-[1.15]
              brightness-[0.9]
              mix-blend-screen
              mask-[radial-gradient(ellipse_68%_72%_at_55%_50%,black_25%,rgba(0,0,0,0.95)_48%,rgba(0,0,0,0.65)_65%,transparent_100%)]
              [-webkit-mask-image:radial-gradient(ellipse_68%_72%_at_55%_50%,black_25%,rgba(0,0,0,0.95)_48%,rgba(0,0,0,0.65)_65%,transparent_100%)]
            "
          />


          {/* ---------------------------------------------
              WHITE ATMOSPHERIC LIGHT
          ---------------------------------------------- */}

          <div
            className="
              absolute
              right-[15%]
              top-1/2
              h-[450px]
              w-[450px]
              -translate-y-1/2
              rounded-full
              bg-white/[0.045]
              blur-[100px]
            "
          />


          {/* ---------------------------------------------
              EDGE FADE
          ---------------------------------------------- */}

          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(to_right,black_0%,transparent_25%,transparent_75%,black_100%)]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(to_bottom,black_0%,transparent_18%,transparent_78%,black_100%)]
            "
          />

        </div>
      )}


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          container
          relative
          z-10
          grid
          min-h-[calc(100vh-4rem)]
          items-center
          gap-10
          md:grid-cols-[1.25fr_1fr]
        "
      >

        {/* =================================================
            TEXT
        ================================================= */}

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

          {/* Small intro */}

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


          {/* Name */}

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
                to-white/45
                bg-clip-text
                text-transparent
              "
            >
              {name}
            </span>

          </motion.h1>


          {/* Headline */}

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


          {/* Bio */}

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


          {/* Buttons */}

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
                shadow-[0_0_30px_rgba(255,255,255,0.18)]
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_0_40px_rgba(255,255,255,0.35)]
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
                bg-black/20
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


          {/* Social Links */}

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


        {/* =================================================
            EMPTY RIGHT COLUMN
            Image is intentionally absolute.
        ================================================= */}

        <div
          className="
            hidden
            md:block
          "
        />

      </div>


      {/* =================================================
          LOCATION
      ================================================= */}

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


      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}

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
        aria-label="Scroll to about"
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


      {/* =================================================
          MOBILE IMAGE
      ================================================= */}

      {avatar && (
        <motion.div
          style={{
            opacity: imageOpacity,
          }}
          className="
            pointer-events-none
            absolute
            bottom-0
            right-[-10%]
            z-[4]
            block
            h-[50vh]
            w-[100%]
            md:hidden
          "
        >

          <motion.img
            src={avatar}
            alt={name}
            style={{
              x: reduce
                ? 0
                : useTransform(
                    scrollYProgress,
                    [0, 1],
                    [0, 280]
                  ),
              scale: imageScale,
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
              grayscale
              contrast-[1.15]
              brightness-[0.9]
              mix-blend-screen
              mask-[radial-gradient(ellipse_70%_65%_at_50%_50%,black_20%,rgba(0,0,0,0.85)_50%,transparent_100%)]
              [-webkit-mask-image:radial-gradient(ellipse_70%_65%_at_50%_50%,black_20%,rgba(0,0,0,0.85)_50%,transparent_100%)]
            "
          />

        </motion.div>
      )}

    </section>
  );
}