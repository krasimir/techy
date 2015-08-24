module.exports = function() {
    return {
        css:  {
            preprocessor: 'less',
            index: '_less/style.less',
            out: '_dist/css/', 
            watch: '_less/**/*.less'
        }
    }
}