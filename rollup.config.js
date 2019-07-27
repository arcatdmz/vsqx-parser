import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const tsConfig = {
  typescript: require("typescript")
};

const comments = (_node, comment) => {
  const { value, type } = comment;
  return type === "comment2" ? /@preserve|@license|@cc_on/i.test(value) : null;
};

export default [
  {
    input: "lib/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs"
      },
      {
        file: pkg.module,
        format: "es"
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      resolve(),
      typescript(tsConfig),
      terser({
        output: { comments }
      })
    ]
  }
];
