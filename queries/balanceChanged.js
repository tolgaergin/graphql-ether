import { gql } from 'apollo-server-express';

const query = gql`
  # bittrex balance changes
  subscription {
    balanceChanged(address: "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98")
  }
`;
