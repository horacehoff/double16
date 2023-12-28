const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const combine = require('postcss-combine-media-query')

module.exports = {
    plugins: [
        purgecss({
            content: ['./**/*.html', './**/*.jsx'],
            safelist: ["rust", "bash"]
        }),
        cssnano({
            preset: "default"
        }),
        // combine() ==> FIX NEEDED; BREAKS :active
    ]
}