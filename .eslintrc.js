module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    "plugin:import/errors", // if that file exports something the other file can import it and if it doesn't export it cant be imported somewhere else
    "plugin:jsx-a11y/recommended", // this is doing some more abilities to understand accessibility
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "detect" // you have to tell eslint which version React are using, "detect" will say can you just figure out yourself (from package.json)
    }
  },
  "plugins": ["react"],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    "react/prop-types": 0,
    "react/jsx-uses-react": "error",   
    "react/jsx-uses-vars": "error",
     "no-unused-vars": 0
  }
}