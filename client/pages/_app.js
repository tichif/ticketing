import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user',
      {
        headers: {
          Host: 'ticketing.dev',
          Cookie: appContext.ctx.req.headers.cookie,
        },
      }
    );

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return data;
  } else {
    const { data } = await axios.get('/api/users/current-user');

    return data;
  }
};

export default MyApp;
