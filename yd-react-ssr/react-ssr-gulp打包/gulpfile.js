const gulp = require('gulp');
const babel = require('gulp-babel');
const babelConfig = {
  presets: ['@babel/preset-typescript','@babel/preset-react'],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
    ],
    '@babel/plugin-transform-modules-commonjs',
    // https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs  This plugin transforms ECMAScript modules to CommonJS. 
  ],
};
function build() {
  const _entry = 'src/server/app.tsx';
  return gulp
  .src(_entry)
  .pipe(
    babel({
      babelrc: false,
      ...babelConfig,
    })
  )
  .pipe(gulp.dest('dist'));
}
gulp.task('default', build);

