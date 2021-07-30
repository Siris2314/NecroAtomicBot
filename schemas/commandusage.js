const mongoose = require('mongoose');

const commandStats = new mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	uses: {
		type: Number,
		required: true
	}
});

exports.commandStats = mongoose.model('commandStats', commandStats);

const commandUsage = new mongoose.Schema({
	timestamp: {
		type: Date,
		unique: true,
		required: true
	},
	uses: {
		type: Number,
		required: true
	}
});

exports.commandUsage = mongoose.model('commandUsage', commandUsage);

const commandError = new mongoose.Schema({
	timestamp: {
		type: Date,
		unique: true,
		required: true
	},
	count: {
		type: Number,
		default: 0,
		required: true
	}
});

exports.commandError = mongoose.model('commandError', commandError);

const botGrowth = new mongoose.Schema({
	timestamp: {
		type: Date,
		unique: true,
		required: true
	},
	addition: {
		type: Number,
		required: true,
		default: 0
	},
	deletion: {
		type: Number,
		required: true,
		default: 0
	}
});

exports.botGrowth = mongoose.model('botGrowth', botGrowth);
