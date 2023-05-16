import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss"
import sass from "rollup-plugin-scss"
import image from "@rollup/plugin-image"

const packageJson = require("./package.json");



export default [
    {
        input: "src/index.ts",
        output: [
        {
            file: packageJson.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true,
        },
        ],
        plugins: [
            // sass(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            
            postcss(),
            image(),
        ],
        external: ['react', 'react-dom']
    },
    {
        input: "dist/esm/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.s?css$/],
    },
];