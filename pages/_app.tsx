// import React from 'react';
// import {AppProps} from 'next/app';
// import { wrapper } from '../store';

// class MyApp extends React.Component<AppProps> {
//   render() {
//     const {Component, pageProps} = this.props;
//     return <Component {...pageProps} />;
//   }
// }

// export default wrapper.withRedux(MyApp);

import { FC } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { wrapper } from '../store';
import { CacheProvider } from "@emotion/react";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      {/* <CacheProvider value={emotionCache}> */}
        <Component {...pageProps} />
      {/* </CacheProvider> */}
    </Provider>
  );
};

export default MyApp;