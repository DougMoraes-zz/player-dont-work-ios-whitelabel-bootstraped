/* eslint-disable no-useless-escape */
module.exports = {
    retainLines: true,
    ignore: [/@babel[\/\\]runtime/],
    presets: ['module:babel-preset-expo'],
    plugins: [
        'styled-jsx/babel',
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['.']
            },
        ]
    ],
};
