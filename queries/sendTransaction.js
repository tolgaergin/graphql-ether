import { gql } from 'apollo-server-express';

const query = gql`
  mutation {
    sendTransaction(
      privateKey: "0x16a77c87e805ddbfdf1bef15c5c74e719cf0c58c002dcfae5b26abcf8a769c0c"
      to: "0x9890e91c1f28108b7798d71c53e05f268fab8946"
      value: "0.05"
      gasLimit: 21000
    )
  }
`;
