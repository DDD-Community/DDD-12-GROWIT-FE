/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  // GitHub Pages를 위한 설정
  managerWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath = '/DDD-12-GROWIT-FE/';
    }
    return config;
  },

  webpackFinal: async config => {
    // 프로덕션 환경에서 publicPath 설정
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath = '/DDD-12-GROWIT-FE/';
    }

    return config;
  },
};
export default config;
