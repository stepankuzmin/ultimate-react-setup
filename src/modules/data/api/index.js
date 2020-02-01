import fetch from 'node-fetch';

export const getIP = async () => {
  const resposne = await fetch('https://api6.ipify.org?format=json');
  const { ip } = await resposne.json();
  return ip;
};

export const geolocate = async (ip) => {
  const resposne = await fetch(`https://freegeoip.app/json/${ip}`);
  const geolocation = await resposne.json();
  return geolocation;
};
