import React from 'react';
import 'antd/dist/reset.css';
import '../styles/Home.module.css';
import type { AppProps } from 'next/app';
import { Layout } from 'antd';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Head>
                <title>Firm list</title>
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
