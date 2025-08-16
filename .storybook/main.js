/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Set base path for GitHub Pages deployment
    // eslint-disable-next-line no-undef
    if (process.env.GITHUB_ACTIONS) {
      config.base = '/CrossStitcher/';
    }
    return config;
  },
};
export default config;
