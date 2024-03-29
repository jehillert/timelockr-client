module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "settings": {
      "import/resolver": "webpack"
    },
    "rules": {
      "no-console": "off",
      "indent": "off",
      "jsx-quotes": [
        2,
        "prefer-single"
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-quotes": 0,
      "template-curly-spacing": "off",
      "import/no-unresolved": "off",
      "import/extensions": [
        "error",
        "always",
        {
          "ts": "never",
          "tsx": "never",
          "js": "never",
          "jsx": "never"
        }
      ],
    }
}
