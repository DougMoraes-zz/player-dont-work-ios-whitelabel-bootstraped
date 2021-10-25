const { withRNV } = require('@rnv/engine-rn-next');

const config = {
    compress: false,
    webpack: (cfg, { isServer }) => {
        if (!isServer) cfg.resolve.alias['@sentry/node'] = '@sentry/browser';
        cfg.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]',
                },
            },
        });
        return cfg;
    },
};

module.exports = withRNV(config, { enableNextCss: true, enableOptimizedImages: true });
