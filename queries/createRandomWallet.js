import { gql } from 'apollo-server-express';

const query = gql`
  # Create random wallet and returns
  # private key, public address, mnemonic password

  mutation {
    createWalletRandom {
      privateKey
      address
      mnemonic
    }
  }
`;
