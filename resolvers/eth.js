import { ethers, providers, utils, Wallet } from 'ethers';
import pubsub from '../pubsub';

let provider = ethers.getDefaultProvider('homestead');
// let provider = new providers.JsonRpcProvider('http://localhost:8545');

export default {
  Query: {
    ethereumGasPrice: async (parent, args, context) => {
      const gasPrice = await provider.getGasPrice();
      return gasPrice.toString();
    },

    ethereumBlockNumber: async (parent, args, context) =>
      await provider.getBlockNumber(),

    ethereumBlock: async (parent, { hash, number }, context) => {
      const blockIdentifier = hash ? hash : number;
      const block = await provider.getBlock(blockIdentifier);
      return {
        ...block,
        difficulty: block.difficulty.toString(),
        gasLimit: block.gasLimit.toString(10),
        gasUsed: block.gasUsed.toString(10)
      };
    },

    getTransaction: async (parent, { hash }, context) => {
      const transaction = await provider.getTransaction(hash);
      return {
        ...transaction,
        gasPrice: transaction.gasPrice.toString(10),
        gasLimit: transaction.gasLimit.toString(10),
        value: utils.commify(utils.formatEther(transaction.value))
      };
    },

    getTransactionReceipt: async (parent, { hash }, context) => {
      const transaction = await provider.getTransactionReceipt(hash);
      return {
        ...transaction,
        gasUsed: transaction.gasUsed.toString(10),
        cumulativeGasUsed: transaction.cumulativeGasUsed.toString(10)
      };
    },

    getBalance: async (parent, { address, blockTag = 'latest' }, context) => {
      const balance = await provider.getBalance(address);
      return utils.commify(utils.formatEther(balance));
    }
  },

  Mutation: {
    createWalletRandom: async (parent, args, context) => {
      const newWallet = await Wallet.createRandom();
      return {
        privateKey: newWallet.privateKey,
        address: newWallet.address,
        mnemonic: newWallet.mnemonic
      };
    },

    createWalletFromMnemonic: async (parent, { mnemonic }, context) => {
      const newWallet = await Wallet.fromMnemonic(mnemonic);
      return {
        privateKey: newWallet.privateKey,
        address: newWallet.address,
        mnemonic: newWallet.mnemonic
      };
    },

    estimateGasAndFee: async (parent, { to, data }, context) => {
      let tx = {
        to,
        data: data ? data : '0x'
      };

      const gasEstimate = await provider.estimateGas(tx);
      const gasPrice = await provider.getGasPrice();

      return {
        gas: gasEstimate.toString(10),
        fee: utils.formatEther(gasEstimate.toString(10) * gasPrice.toString())
      };
    },

    sendTransaction: async (
      parent,
      { privateKey, gasLimit, to, value },
      context
    ) => {
      const wallet = await new Wallet(privateKey, provider);
      const gasPrice = await provider.getGasPrice();
      const txGasLimit = gasLimit ? gasLimit : 21000;

      const tx = await wallet.sendTransaction({
        gasLimit: txGasLimit,
        gasPrice,
        to,
        value: utils.parseEther(value)
      });
      return tx.hash;
    }
  },

  Subscription: {
    newBlockCreated: {
      subscribe: async (parent, args, context) => {
        await provider.on('block', blockNumber => {
          pubsub.publish('LISTEN_BLOCKS', {
            newBlockCreated: blockNumber
          });
        });

        return pubsub.asyncIterator('LISTEN_BLOCKS');
      }
    },

    balanceChanged: {
      subscribe: async (parent, args, context) => {
        await provider.on(args.address, balance => {
          pubsub.publish('LISTEN_BALANCE', {
            balanceChanged: utils.commify(utils.formatEther(balance))
          });
        });

        return pubsub.asyncIterator('LISTEN_BALANCE');
      }
    },

    waitForTransaction: {
      subscribe: async (parent, args, context) => {
        await provider.waitForTransaction(args.hash, transaction => {
          pubsub.publish('LISTEN_TRANSACTION', {
            waitForTransaction: transaction.hash
          });
        });

        return pubsub.asyncIterator('LISTEN_TRANSACTION');
      }
    }
  }
};
