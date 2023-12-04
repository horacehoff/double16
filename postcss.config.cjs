const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = {
    plugins: [
        purgecss({
            content: ['./**/*.html', './**/*.jsx']
        }),
        cssnano({
            preset: "default"
        })
    ]
}