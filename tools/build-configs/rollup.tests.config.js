import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const ERRORS_TO_IGNORE = [
  "THIS_IS_UNDEFINED"
];

export default {
  input: 'test/tests-all.js',
  output: {
    file: 'tools/tmp/rollup/tests.es.js',
    format: 'es',
    name: 'DexieORMAddonTests',
    sourcemap: true
  },
  globals: {
    Dexie: "dexie",
    QUnit: "QUnit"
  },
  external: ['Dexie', 'QUnit', 'babel-runtime'],
  plugins: [
    sourcemaps(),
    nodeResolve({browser: true}),
    commonjs({
      include: 'node_modules/**'
    })
  ],
  onwarn ({loc, frame, code, message}) {
    if (ERRORS_TO_IGNORE.includes(code)) return;
    if ( loc ) {
      console.warn( `${loc.file} (${loc.line}:${loc.column}) ${message}` );
      if ( frame ) console.warn( frame );
    } else {
      console.warn(`${code} ${message}`);
    }
  }
};
