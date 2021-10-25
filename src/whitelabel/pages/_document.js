import NextDocumentScreen from '@24i/nxg-sdk-smartott/src/screens/NextDocumentScreen';
import React from 'react';
import Document from 'next/document';
import fonts from '../../../public/styles/fonts';

export default class NextDocument extends Document {
    static getInitialProps = NextDocumentScreen.getInitialProps;

    render() {
        return <NextDocumentScreen.Main fonts={fonts} />;
    }
}
