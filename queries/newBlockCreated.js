import { gql } from 'apollo-server-express';

const query = gql`
  # Subscribe to new blocks on Ethereum network
  # When new block created, you can see on the right panel

  subscription {
    newBlockCreated
  }
`;
