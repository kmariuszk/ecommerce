import Head from 'next/head';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout component which display common content of every page.
 * @param children - unique element of each page
 * @returns webpage with the layout component
 */
function Layout({ children }) {
    return (
        <>
            <Head>
                <title>TechHub</title>
            </Head>
            <Header />
            {children}
        </>
    );
}

export default Layout;