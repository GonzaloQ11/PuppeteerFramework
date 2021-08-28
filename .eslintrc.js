module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
        "node": true,
        "jquery": true,
    },
    "extends": "eslint:recommended",
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "no-trailing-spaces": 2,
    }
};
