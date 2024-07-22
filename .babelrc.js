const path = require("path");
module.exports = api => ({
    presets: ["next/babel"],
    plugins: [
        [
            "module-resolver", {
                "root": ["./src"],
                "alias": {
                    "^@/(.+)": "./src/\\1",
                }
            }
        ],
        [
            "@stylexjs/babel-plugin",
            // See all options in the babel plugin configuration docs:
            // https://stylexjs.com/docs/api/configuration/babel-plugin/
            {
                dev: api.env("development"),
                test: api.env("test"),
                genConditionalClasses: true,
                treeshakeCompensation: true,
                aliases: {
                    "@/*": [path.join(__dirname, "*")],
                },
                unstable_moduleResolution: {
                    type: "commonJS",
                    rootDir: path.join(__dirname, "../.."),
                },
            },
        ],
    ],
})
