const SHA256 = require('crypto-js/sha256');
const crypto = require('crypto');
const eccrypto = require('eccrypto');

class Transaction {
	constructor({from, to, amount}) {
		this.from = from;
		this.to = to;
		this.amount = amount;
	}

	async sign(privateKey) {
		const json = JSON.stringify({
			from: this.from,
			to: this.to,
			amount: this.amount
		});

		this.signature = await eccrypto.sign(privateKey, json);
	}

	async validate(publicKey, msg, s) {
		return await eccrypto.validate(publicKey, msg, sig);
	}
}

class Block {
	constructor({ timestamp, transactions, previousHash = '' }) {
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(`${this.timestamp}${this.previousHash}${JSON.stringify(this.transactions)}${this.nonce}`)
			.toString();
	}

	mineBlock(difficulty) {
		while(this.hash.slice(0, difficulty) !== '0'.repeat(difficulty)) {
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log(`Block mined: ${this.hash}`);
	}
}

class Blockchain {
	constructor({ publicKey, privateKey }) {
		this.publicKey = publicKey;
		this.privateKey = privateKey;
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}

	createGenesisBlock() {
		return new Block({
			timestamp: Date.now(),
			transactions: [],
			previousHash: '0'
		});
	}

	getBalanceOfAddress(address) {
		return this.chain.reduce((total, block) => {
			return total + block.transactions.reduce((total, transaction) => {
				if (transaction.from === address) {
					return total - transaction.amount;
				}

				if (transaction.to === address) {
					return total + transaction.amount;
				}

				return total;
			}, 0);
		}, 0);
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	minePendingTransactions(miningRewardAddress) {
		const block = new Block({
			timestamp: Date.now(),
			transactions: this.pendingTransactions
		});

		block.mineBlock(this.difficulty);

		this.chain.push(block);

		this.pendingTransactions = [
			new Transaction({
				from: null,
				to: miningRewardAddress,
				amount: this.miningReward
			})
		];
	}

	createTransaction(transaction) {
		this.pendingTransactions.push(transaction);
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}

		return true;
	}
}

// const voteCoin = new Blockchain();

module.exports = Blockchain;

// voteCoin.createTransaction(new Transaction({
// 	from: 'address1',
// 	to: 'address2',
// 	amount: 100
// }));
//
// voteCoin.createTransaction(new Transaction({
// 	from: 'address2',
// 	to: 'address1',
// 	amount: 50
// }));
//
// console.log('Starting the miner...');
// voteCoin.minePendingTransactions('dima');
//
// console.log(`Balance of dima is ${voteCoin.getBalanceOfAddress('dima')}`);
//
// console.log('Starting the miner again...');
// voteCoin.minePendingTransactions('dima');
//
// console.log(`Balance of dima is ${voteCoin.getBalanceOfAddress('dima')}`);
//
// console.log('Starting the miner again...');
// voteCoin.minePendingTransactions('dima');
//
// console.log(`Balance of dima is ${voteCoin.getBalanceOfAddress('dima')}`);
//
// console.log('voteCoin', voteCoin);
