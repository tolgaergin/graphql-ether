import express from 'express';
import { createServer } from 'http';
import SERVER from './schema';

const PORT = process.env.PORT || 4000;

const APP = express();

SERVER.applyMiddleware({
  app: APP,
  cors: true,
  bodyParser: true
});

const httpServer = createServer(APP);
SERVER.installSubscriptionHandlers(httpServer);

// APP.listen(process.env.PORT || PORT, () => {
//   console.log(`Server started on port: ${process.env.PORT || PORT}`);
// });

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${SERVER.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      SERVER.subscriptionsPath
    }`
  );
});
