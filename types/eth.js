import { gql } from 'apollo-server-express';

export default gql`
  type Wallet {
    privateKey: String!
    address: String!
    mnemonic: String!
  }

  input WalletInput {
    privateKey: String!
  }

  input TransactionInput {
    nonce: String
    gasLimit: String
    gasPrice: String
    to: String
    value: String
    data: String
  }

  type Transaction {
    hash: String
    blockNumber: Int
    transactionIndex: Int
    from: String
    to: String
    value: Float
    gasPrice: Float
    gasLimit: Float
    nonce: Int
    data: String
    r: String
    s: String
    raw: String
    networkId: Int
  }

  type TransactionReceipt {
    contractAddress: String
    transactionIndex: Int
    gasUsed: Float
    blockHash: String
    transactionHash: String
    cumulativeGasUsed: Float
    byzantium: Boolean
    status: Int
  }

  type EthereumBlock {
    hash: String
    parentHash: String
    number: Int
    timestamp: Int
    nonce: String
    difficulty: Int
    gasLimit: String
    gasUsed: String
    miner: String
    extraData: String
    transactions: [String]
  }

  type GasAndFeeResponse {
    gas: Float!
    fee: Float!
  }

  type Query {
    ethereumGasPrice: String!
    ethereumBlockNumber: String!
    ethereumBlock(hash: String, number: Int): EthereumBlock

    getTransaction(hash: String): Transaction
    getTransactionReceipt(hash: String): TransactionReceipt

    getBalance(address: String!, blockTag: String): String!
  }

  type Mutation {
    createWalletRandom: Wallet!
    createWalletFromMnemonic(mnemonic: String!): Wallet!
    # createWalletFromBrainWallet(username: String!, password: String!): Wallet!

    estimateGasAndFee(to: String!, data: String): GasAndFeeResponse!

    sendTransaction(
      privateKey: String!
      to: String!
      value: String!
      gasLimit: Int
    ): String!
  }

  type Subscription {
    newBlockCreated: String!
    balanceChanged(address: String!): String!
    waitForTransaction(hash: String!): String!
  }
`;
