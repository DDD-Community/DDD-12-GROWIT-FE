const LandingPageCommonStyle = {
  padding: 'px-5 md:px-10 lg:px-28',
  fadeIn: {
    default: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, amount: 0.3 },
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    left: {
      initial: { opcity: 0, x: -40 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, amount: 0.3 },
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    right: {
      initial: { opacity: 0, x: 40 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, amount: 0.3 },
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    up: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.3 },
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    down: {
      initial: { opacity: 0, y: -40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.3 },
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  },
} as const;

export default LandingPageCommonStyle;
