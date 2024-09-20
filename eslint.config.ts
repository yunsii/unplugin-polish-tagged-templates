import janna from '@jannajs/lint/eslint'

export default janna({
  ignores: ['test/fixtures', 'README.md'],
}, {
  rules: {
    'unused-imports/no-unused-vars': 'off',
    'node/prefer-global/process': 'off',
  },
})
