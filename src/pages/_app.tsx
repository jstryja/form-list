import React from 'react';
import 'antd/dist/reset.css';
// import '../styles/globals.css';
import '../styles/Home.module.css';
import type {AppProps} from 'next/app'
// import 'antd/dist/antd.css';
import {Layout} from "antd";
import Head from "next/head";
// import './index.css';

export default function App({Component, pageProps}: AppProps) {
    return(
        <Layout style={{minHeight: '100vh'}}>
            <Head>
                <title>Firm list</title>
            </Head>
            <Component {...pageProps} />
        </Layout>)
}
