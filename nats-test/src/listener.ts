import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

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

  // we will use durable subscription, that will give an identifier to a subscription
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('orders-service');


  // the second argument is the queue group. it is set to make sure to not multiprocess the same message by all
  // instances of the listener service
  const subscription = stan.subscribe('ticket:created', 'orders-service-queue-group', options);

  subscription.on('message', (msg: Message) => {

    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`received event number #${msg.getSequence()}, with data: ${data}`);
    }

    console.log(msg.getData());

    msg.ack();
  });
});

// it is closing the connection to the publisher when a close signal is received
process.on('SIGINT', () => { stan.close(); });
process.on('SIGTERM', () => stan.close());

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;


  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client.subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    )

    subscription.on("message", () => {
      console.log(
        `Message received: ${this.subject} / ${this.queueGroupName}`
      );

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}