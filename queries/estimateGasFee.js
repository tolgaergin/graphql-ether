import { gql } from 'apollo-server-express';

const query = gql`
  mutation {
    estimateGasAndFee(to: "0x0dc5f8a12c0af9dda2fd7f76823e4b3ba6f8bc1e") {
      gas
      fee
    }
  }
`;
