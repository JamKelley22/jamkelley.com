import openSocket from 'socket.io-client';
const  socket = openSocket('http://jamkelley.com:3000');
function subscribe(cb) {
  socket.on('newPhoto', timestamp => cb(timestamp));
}
export { subscribe };
