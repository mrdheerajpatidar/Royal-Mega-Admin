// src/services/socketService.js
import { io } from 'socket.io-client';

const socket = io(API_URL);

export const sendNumber = (number) => {
  console.log('send number');
  console.log('send number', API_URL);
  console.log('send number', number);
  socket.emit('ClientTOServer', {
    drawId: '758d2e61-8bb0-466a-8dab-14a8da47959e',
    number: number,
  });
};

socket.on('ServerToClient', (obj) => {
  console.log('Received number from server:', obj);
});

export default socket;
