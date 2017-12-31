import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'src/DexieORMAddon.js',
  output: [
    {
      file: 'dist/dexieORMAddon.es.js',
      format: 'es',
      name: 'DexieORMAddon',
      sourcemap: true
    },
  ],
  globals: {
    Dexie: "dexie"
  },
  external: ['Dexie', 'babel-runtime/core-js/map', 'babel-runtime/helpers/typeof'],
  plugins: [ sourcemaps() ]
};
