import fetch from 'node-fetch';

export const getIpInfo = async () => {
  const resposne = await fetch('https://ipinfo.io?token=f96c8036cfb8d9');
  const ipInfo = await resposne.json();
  return ipInfo;
};
