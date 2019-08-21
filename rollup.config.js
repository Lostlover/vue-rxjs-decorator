export default {
  input: 'lib/decorator.js',
  output: {
    file: 'lib/decorator.umd.js',
    format: 'umd',
    name: 'Decorator',
    globals: {
      vue: 'Vue',
      'rxjs': 'Rxjs',
    },
    exports: 'named',
  },
  external: ['vue', 'rxjs'],
}
