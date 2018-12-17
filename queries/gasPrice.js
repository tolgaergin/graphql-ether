import { gql } from 'apollo-server-express';

const query = gql`
  # Get the current Ethereum Gas Price and
  # get block number

  {
    ethereumGasPrice
    ethereumBlockNumber
  }
`;
