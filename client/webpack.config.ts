import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

const config = ({
    production,
}: {
    production?: boolean;
}): Configuration => ({
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-map' : 'eval',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.js',
    },
});

export default config;
