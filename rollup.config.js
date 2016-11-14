import { rollup } from "rollup";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import css from "modular-css/rollup";

import colorFunction from "postcss-color-function";
import nested from "postcss-nested";

export default {
    entry  : "./src/index.js",
    format : "cjs",
    dest   : "./public/gen/js/index.js",
    plugins : [
        nodeResolve({
          jsnext     : true,
          extensions : [ ".js", ".json" ]
        }),

        commonjs(),

        css({
            css   : "./public/gen/css/index.css",
            after : [
              colorFunction,
              nested
            ]
        })
    ]
};
