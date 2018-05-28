module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
	    "mocha": true
    },
	"plugins": [
		"mocha"
	],
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
	    "mocha/no-exclusive-tests": "error"
    }
};