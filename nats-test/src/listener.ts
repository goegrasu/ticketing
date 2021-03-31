import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

// we will use port forwarding to the nats-depl pod ONLY FOR DEV PURPOSES kubectl port-forward nameOfThePod port:port
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log("listener connected to nats");

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

// it is closing the connection to the publisher when a close signal is received
process.on('SIGINT', () => { stan.close(); });
process.on('SIGTERM', () => stan.close());