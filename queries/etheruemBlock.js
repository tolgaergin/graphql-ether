import { gql } from 'apollo-server-express';

const query = gql`
  {
    ethereumBlock(number: 6900178) {
      hash
      parentHash
      timestamp
      difficulty
      miner
      gasUsed
      gasLimit
      transactions
    }
  }
`;
