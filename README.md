# `@rigoonrails/eslint-config`

This is a shared ESLint configuration package for use across my projects. It includes a set of default linting rules for TypeScript, & React.

## Configs

### `base`
The `base` configuration includes general TypeScript & stylistic rules that apply to most projects. It enforces consistent formatting & best practices across my TypeScript codebases.

**No additional dependencies are required to use this config.**

### `react`
The `react` configuration extends the `base` configuration & includes rules specific to React development.

**Required dependencies**:
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-plugin-jsx-a11y`

## Usage

```ts
import config from '@rigoonrails/eslint-config';

export default config.base;
```
