import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

export const getServerSideProps = async (ctx) => {
  // http://ingress-nginx.ingress-nginx.svc.cluster.local
  // lyen sa ap pemet ou kominike ak yon lot sevis
  // le wap itilize SSR
  const { data } = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user',
    {
      headers: {
        Host: 'ticketing.dev',
      },
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
