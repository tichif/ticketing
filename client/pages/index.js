import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You're signed.</h1>
  ) : (
    <h1>You are not signed in.</h1>
  );
};

export const getServerSideProps = async (ctx) => {
  // http://ingress-nginx.ingress-nginx.svc.cluster.local
  // lyen sa ap pemet ou kominike ak yon lot sevis
  // le wap itilize SSR
  const { req } = ctx;
  const { data } = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user',
    {
      headers: req.headers,
    }
  );
  return {
    props: {
      currentUser: data.currentUser,
    },
  };
};

// LandingPage.getInitialProps = async () => {
//   if (typeof window === 'undefined') {
//     const { data } = await axios.get(
//       'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user',
//       {
//         headers: {
//           Host: 'ticketing.dev',
//         },
//       }
//     );
//     return data;
//   } else {
//     const { data } = await axios.get('/api/users/current-user');

//     return data;
//   }
// };

export default LandingPage;
