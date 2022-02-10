module.exports = {
    plugins: [
        'preset-default',
        {
            name: "removeAttrs",
            params: {
                attrs: "(width|height|style|class|id|data-.*)"
            }
        }
    ]
}