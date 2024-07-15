const onRules = {
  '@typescript-eslint/no-unused-vars': [
    'warn', // or "error"
    {
      'argsIgnorePattern': '^',
      'varsIgnorePattern': '^',
      'caughtErrorsIgnorePattern': '^_'
    }
  ],
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  'no-multiple-empty-lines': ['error', { max: 1 }],
  'no-magic-numbers': [
    'error',
    {
      ignore: [0, 1, -1],
      ignoreDefaultValues: true,
      ignoreArrayIndexes: true
    }
  ],
  '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
  'no-console': ['error', { allow: ['warn', 'error'] }],
  'max-classes-per-file': ['error', 1],
  'no-debugger': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-namespace': [2, { allowDeclarations: true }],
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      accessibility: 'explicit',
      overrides: {
        accessors: 'explicit',
        constructors: 'off',
        methods: 'explicit',
        properties: 'explicit',
        parameterProperties: 'explicit'
      }
    }
  ],
  '@typescript-eslint/no-non-null-assertion': 'error',
  'curly': ['error', 'all'],
  'no-multi-spaces': 'error',
  'space-in-parens': 'error',
  'no-var': 'error',
  'prefer-const': 'error',
  'quotes': ['error', 'single', { allowTemplateLiterals: true }],
  'semi': ['error', 'always'],
  'space-infix-ops': ['error', { int32Hint: false }],
  'key-spacing': ['error', { afterColon: true }],
  'unused-imports/no-unused-imports': 'error',
  "react-compiler/react-compiler": "error"
};

const offRules = {
  'import/prefer-default-export': 'off',
  'class-methods-use-this': 'off',
  'react/require-default-props': 'off',
  '@typescript-eslint/lines-between-class-members': 'off',
  'no-return-assign': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/button-has-type': 'off',
  'react/prefer-stateless-function': 'off',
  'react-hooks/exhaustive-deps': 'off',
};

module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react', 'prettier', 'unused-imports', 'react-compiler'],
  rules: {
    ...onRules,
    ...offRules
  }
};
