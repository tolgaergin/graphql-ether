import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();
pubsub.ee.setMaxListeners(30);

export default pubsub;
