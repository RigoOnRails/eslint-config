import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

const base = tseslint.config(
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
  const reactBase = tseslint.config(
    {
      extends: [base],
      rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactPlugin.configs['jsx-runtime'].rules,
        'react/function-component-definition': ['error', {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        }],
        'react/no-unescaped-entities': 'off',

        ...reactHooksPlugin.configs.recommended.rules,
        'react-hooks/exhaustive-deps': ['error', { additionalHooks: '(useAsync|useUpdateEffect)' }],

        ...reactRefreshPlugin.configs.recommended.rules,

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
    web: tseslint.config(
      {
        extends: [reactBase],
        rules: {
          ...jsxA11yPlugin.configs.recommended.rules,
        },
      },
    ),
    native: tseslint.config({ extends: [reactBase] }),
  };
})();

export default {
  base,
  react,
};
