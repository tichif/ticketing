import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Signout = () => {
  const router = useRouter();

  const signoutHandler = async () => {
    try {
      await axios.post('/api/users/signout');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    signoutHandler();
  }, []);

  return <div>Signing you out....</div>;
};

export default Signout;
