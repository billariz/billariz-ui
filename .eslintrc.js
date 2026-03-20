const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:i18n-json/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 8,
    requireConfigFile: false,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
    },
  },
  rules: {
    'arrow-body-style': 'warn',
    'consistent-return': 'warn',
    'no-console': 'warn',
    'no-undef': 'off',
    'import/order': 'off',
    'import/no-extraneous-dependencies': 'warn',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'import/no-unused-modules': ['warn', { unusedExports: true, src: ['./src/*'] }],
    'import/prefer-default-export': 'off',
    'react/display-name': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': 'off',
    'react-hooks/rules-of-hooks': 'warn',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/no-unstable-nested-components': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'react/no-children-prop': 'off',
    'import/no-cycle': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'i18n-json/identical-keys': [
      'error',
      {
        filePath: path.resolve('./src/locales/fr.json'),
      },
    ],
    'i18n-json/sorted-keys': 'off',
    'no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: false,
      },
    ],
    'prefer-destructuring': [
      'warn',
      {
        object: true,
        array: false,
      },
    ],
  },
};
