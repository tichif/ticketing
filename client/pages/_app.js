import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

import Header from '../components/header';

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user',
      {
        headers: {
          Host: 'ticketing.dev',
          Cookie: appContext.ctx.req.headers.cookie || null,
        },
      }
    );

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
      pageProps,
      currentUser: data.currentUser,
    };
  } else {
    const { data } = await axios.get('/api/users/current-user');

    return data;
  }
};

export default MyApp;
