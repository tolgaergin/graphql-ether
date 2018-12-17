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
    blockHash: String
    blockNumber: Int
    transactionIndex: Int
    confirmations: Int
    from: String
    to: String
    gasPrice: String
    gasLimit: String
    value: String
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
    gasUsed: String
    logsBloom: String
    blockHash: String
    transactionHash: String
    blockNumber: Int
    confirmations: Int
    cumulativeGasUsed: String
    status: Int
    byzantium: Boolean
  }

  type EthereumBlock {
    hash: String
    parentHash: String
    number: Int
    timestamp: Int
    nonce: String
    difficulty: String
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
