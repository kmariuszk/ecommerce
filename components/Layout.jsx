import Head from 'next/head';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <>
            <Head>
                <title>TechHub</title>
            </Head>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default Layout;