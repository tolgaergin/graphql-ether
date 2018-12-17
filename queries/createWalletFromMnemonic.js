import { gql } from 'apollo-server-express';

const query = gql`
  # Create a new wallet or
  # (if exists) log-in to the existing wallet
  # by using mnemonic words

  mutation {
    createWalletFromMnemonic(
      mnemonic: "loan million aware switch length candy artwork finish comfort eyebrow mimic estate"
    ) {
      privateKey
      address
      mnemonic
    }
  }
`;
