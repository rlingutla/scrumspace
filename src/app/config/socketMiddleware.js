import io from 'socket.io-client';
import * as socketActions from '../actions/sockets';
 
export default function (store) {
  let socket = io();

  socket.on('welcome', data => {
  	console.log("SOCKET: Welcome to ScrumSpace\n", data);
  });

  socket.on('TASK_UPDATED', data => {
  	store.dispatch(socketActions.taskReceived(data.data));
  });
}