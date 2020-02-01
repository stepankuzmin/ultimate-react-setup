export const isBrowser = !(
  Object.prototype.toString.call(global.process) === '[object process]' && !global.process.browser
);
