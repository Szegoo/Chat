import App from 'next/app';
import "../styles/main.scss";
import React from 'react';

export default class MyApp extends App {
    render() {
        const {pageProps, Component} = this.props;

        return (
            <Component {...pageProps}/>
        )
    }
}