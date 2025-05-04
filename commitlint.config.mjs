/**
 * @typedef {import('@commitlint/types').UserConfig} UserConfig
 */

/** @type {UserConfig} */
const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 200],
  },
};

export default Configuration;
