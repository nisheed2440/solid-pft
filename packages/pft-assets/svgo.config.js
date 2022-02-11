module.exports = {
    plugins: [
        'preset-default',
        {
            name: "removeXMLNS",
        },
        {
            name: "removeDimensions",
        },
        {
            name: "removeAttrs",
            params: {
                attrs: "(viewBox|preserveAspectRatio|version)"
            }
        }
    ],
}