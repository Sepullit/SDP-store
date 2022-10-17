import svgSprite from "gulp-svg-sprite";

export const svgSpriteNew = () => {
  return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVG",
        message: "Error: <%= error.message%>"
      })
    ))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../icons/icons.svg`,
          // превью в файлке ХТМЛ
          example: true
        }
      },
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}`))
    
  }