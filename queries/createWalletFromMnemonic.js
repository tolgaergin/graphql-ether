import { gql } from 'apollo-server-express';

const query = gql`
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
