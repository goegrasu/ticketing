import nats from 'node-nats-streaming';

console.clear();

// we will use port forwarding to the nats-depl pod ONLY FOR DEV PURPOSES kubectl port-forward nameOfThePod port:port
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log("publisher connected to nats");

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});