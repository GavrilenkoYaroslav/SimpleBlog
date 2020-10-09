import App from 'next/app';
import { wrapper } from '../redux/store';
import 'antd/dist/antd.css';
import Head from 'next/head';
import React from 'react';

class MyApp extends App<{ store: any }> {

	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<title>Simple Blog</title>
					<meta charSet="utf-8"/>
					<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
				</Head>

				<Component {...pageProps} />
			</>
		);

	}
}


export default wrapper.withRedux(MyApp);