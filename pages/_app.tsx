import App from 'next/app';
import {wrapper} from '../redux/store';

class MyApp extends App<{store:any}> {

    render() {
        const { Component, pageProps} = this.props;

        return <Component {...pageProps} />

    }
}


export default wrapper.withRedux(MyApp);