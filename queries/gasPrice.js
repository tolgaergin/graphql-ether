import { gql } from 'apollo-server-express';

const query = gql`
  {
    ethereumGasPrice
    ethereumBlockNumber
  }
`;
