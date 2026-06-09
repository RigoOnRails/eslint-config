import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { reactRefresh as reactRefreshPlugin } from 'eslint-plugin-react-refresh';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

const base = defineConfig(
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,

      stylistic.configs.customize({
        semi: true,
        arrowParens: true,
      }),
      stylistic.configs['disable-legacy'],
    ],
    rules: {
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/max-statements-per-line': ['error', { max: 1, ignoredNodes: ['BreakStatement', 'ContinueStatement', 'ReturnStatement'] }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
);

const react = (() => {
  const reactBase = defineConfig(
    {
      extends: [
        base,

        reactPlugin.configs.flat.recommended,
        reactPlugin.configs.flat['jsx-runtime'],
        reactHooksPlugin.configs.flat.recommended,
        reactRefreshPlugin.configs.recommended(),
      ],
      rules: {
        'react/function-component-definition': ['error', {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        }],
        'react/no-unescaped-entities': 'off',

        'react-hooks/exhaustive-deps': ['error', { additionalHooks: '(useAsync|useUpdateEffect)' }],

        ...stylistic.configs['disable-legacy'].rules,
        '@stylistic/jsx-one-expression-per-line': 'off',
      },
      languageOptions: {
        parserOptions: reactPlugin.configs['jsx-runtime'].parserOptions,
      },
      settings: {
        react: { version: 'detect' },
      },
    },
    {
      files: ['**/*.test.{ts,tsx}'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  );

  return {
    base: reactBase,
    web: defineConfig(
      {
        extends: [
          reactBase,

          jsxA11yPlugin.flatConfigs.recommended,
        ],
      },
    ),
  };
})();

export default {
  base,
  react,
};
