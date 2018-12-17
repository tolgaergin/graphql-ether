import { gql } from 'apollo-server-express';

const query = gql`
  # Get the transaction details by hash

  {
    getTransaction(
      hash: "0xf609434eab2a0dff4f9be3493cb7422b47f87bff7ec108696659183fa03e32e5"
    ) {
      from
      to
      value
      confirmations
      gasPrice
      gasLimit
      blockNumber
    }
  }
`;
