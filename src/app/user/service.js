const { Exception, httpStatus } = require('../../../utils');
const bcrypt = require('bcrypt');
const User = require('./User');

class UserService {
	constructor(data) {
		this.name = data.name;
		this.type = data.type;
		this.password = data.password;
	}

	async save() {
		const user = await User.findOne({ name: this.name });
		if (user) throw new Exception(httpStatus.CONFLICT, 'User Already exists');

		const result = await new User(this).save();

		if (!result) throw new Exception();
		return { data: { id: result._id } };
	}

	static async login(data) {
		const result = await User.findOne({ name: data.name });
		if (!result) throw new Exception(httpStatus.NOT_FOUND, 'User not found');
		let validPassword = await bcrypt.compare(data.password, result.password);
		if (validPassword) {
			const data = {
				_id: result._id,
				name: result.name,
				type: result.type,
			};
			return { data, token: 'token' };
		}
		throw new Exception(httpStatus.NOT_FOUND, 'wrong password');
	}

	async signup() {
		const result = await this.save();
		if (!result) throw new Exception(httpStatus.CONFLICT, 'User already exist');
		result.token = 'token';
		return result;
	}
}

module.exports = UserService;
