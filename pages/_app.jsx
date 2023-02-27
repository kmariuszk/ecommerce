import React from 'react';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import { StateContext } from '../context/StateContext';

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              fontFamily: 'Open sans',
            },
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
