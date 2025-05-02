# `@rigoonrails/eslint-config`

This is a shared ESLint configuration package for use across my projects. It includes a set of default linting rules for TypeScript, & React.

## Configurations

### `base`
The `base` configuration includes general TypeScript & stylistic rules that apply to most projects. It enforces consistent formatting & best practices across my TypeScript codebases.

**No additional dependencies are required to use this config.**

### `react.base`
The `react.base` configuration extends the `base` configuration & includes rules specific to React development, without web or native specifics.

**Required dependencies**:
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`

### `react.web`
The `react.web` configuration extends the `react.base` configuration & includes rules specific to React web development.

**Additional dependencies**
- `eslint-plugin-jsx-a11y`

### `react.native`
The `react.native` configuration extends the `react.base` configuration & includes rules specific to React Native development.

## Usage

```ts
// eslint.config.ts

import config from '@rigoonrails/eslint-config';

export default config.react.web;
```
