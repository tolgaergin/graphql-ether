import { gql } from 'apollo-server-express';

const query = gql`
  mutation {
    createWalletRandom {
      privateKey
      address
      mnemonic
    }
  }
`;
