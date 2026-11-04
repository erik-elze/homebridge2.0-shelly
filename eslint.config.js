const { defineConfig, globalIgnores } = require('eslint/config')
const neostandard = require('neostandard')

module.exports = defineConfig([
  globalIgnores(['**/*.min.js']),
  ...neostandard({
    env: ['node', 'mocha', 'browser'],
    globals: {
      $: 'readonly',
    },
    noJsx: true,
  }),
  {
    files: ['**/*.js'],
    rules: {
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/no-multiple-empty-lines': 'off',
      'max-len': ['error', { code: 80 }],
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      }],
    },
  },
])
