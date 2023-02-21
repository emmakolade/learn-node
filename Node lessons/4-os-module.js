const os = require("os");

// user info
const user = os.userInfo();
console.log(user);

// system uptime in secs
console.log(`the sys uptime is  ${os.uptime()} secs`);

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currentOS);