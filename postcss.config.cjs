const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const combine = require('postcss-combine-media-query')

module.exports = {
    plugins: [
        purgecss({
            content: ['./**/*.html', './**/*.jsx']
        }),
        cssnano({
            preset: "default"
        }),
        combine()
    ]
}