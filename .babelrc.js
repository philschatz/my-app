const path = require("path");
module.exports = {
    presets: ["next/babel"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["./src"],
                alias: {
                    "^@/(.+)": "./src/\\1",
                },
            },
        ],
        [
            "@stylexjs/babel-plugin",
            // See all options in the babel plugin configuration docs:
            // https://stylexjs.com/docs/api/configuration/babel-plugin/
            {
                dev: process.env.NODE_ENV == "development",
                test: process.env.NODE_ENV == "test",
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
};
