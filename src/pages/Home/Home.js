import React, { useEffect } from 'react';

const Home = ({ ip, getUserGeolocation }) => {
  useEffect(() => {
    if (!ip) {
      getUserGeolocation();
    }
  }, [ip]);

  return (
    <div>
      <h1>Home</h1>
      <pre>{ip}</pre>
    </div>
  );
};

export default Home;
