import io from 'socket.io-client';
// import * as socketActions from '../actions/sockets';
import socketAction from '../actions/sockets';
 
export default function (store) {
  let socket = io();

  socket.on('welcome', data => {
  	logger("SOCKET: Welcome to ScrumSpace\n", data);
  });

  socket.on('disconnect', error => {
  	ErrorBanner(`Socket Disconnected:\n${error}`);
  });

  socket.on('STATE_UPDATE', data => {
  	store.dispatch(socketAction(data.data));
  });

  socket.on('DATABASE_RESET', () => {
    location.reload();
  });
}