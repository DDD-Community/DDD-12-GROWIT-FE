const config = {
  // plugins: ["@tailwindcss/postcss"],
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
    },
  },
};

export default config;
