const fs = require('fs').promises;
const { Exception, httpStatus } = require('../../../utils');
const Product = require('./Product');
const mongoose = require('mongoose');
const paths = require('../../../path');

async function uploadImage(photo) {
	let image = Buffer.from(photo, 'base64');
	let fileName = Date.now().toString() + '.jpg';
	await fs.writeFile(`./uploads/user/${fileName}`, image);
	return `/uploads/user/${fileName}`;
}

class ProductService {
	constructor(data) {
		this.title = data.title;
		this.description = data.description;
		this.price = data.price;
		this.photo = data.photo;
		this.category = data.category;
	}

	async save() {
		const session = await mongoose.startSession();
		let result;
		await session.withTransaction(async (session) => {
			if (this.photo) {
				this.photo = await uploadImage(this.photo);
			}
			result = await new Product(this).save({ session });
			if (!result) throw new Exception();
		});
		session.endSession();
		return { data: { id: result.id } };
	}

	async update(id) {
		const session = await mongoose.startSession();
		await session.withTransaction(async (session) => {
			if (this.photo) {
				this.photo = await uploadImage(this.photo);
				if (result.photo) await fs.unlink(`${paths.app}/${result.photo}`);
			}
			const result = await Product.findByIdAndUpdate(id, this, { omitUndefined: true, session });
			if (!result) throw new Exception(httpStatus.NOT_FOUND, 'Product not found');
		});
		return;
	}

	static async delete(id) {
		const session = await mongoose.startSession();
		await session.withTransaction(async (session) => {
			const result = await Product.findOneAndDelete({ _id: id }, { session });
			if (result.photo) {
				await fs.unlink(`${paths.app}/${result.photo}`);
			}
			if (!result) throw new Exception(httpStatus.NOT_FOUND, 'Product not found');
		});
		return;
	}

	static async getById(id) {
		const result = await Product.findById(id);
		if (result.photo) result.photo = await fs.readFile(`${paths.app}/${result.photo}`, 'base64');
		if (!result) throw new Exception(httpStatus.NOT_FOUND, 'Product not found');
		return { data: result };
	}

	static async getByCriteria(criteria = {}, { limit = 100, skip = 0, total = false }) {
		let condition = (() => {
			let result = {};
			if (criteria.title) result['title'] = { $regex: criteria.title, $options: 'i' };
			if (criteria.category) result['category'] = { $regex: criteria.category, $options: 'i' };
			return result;
		})();

		const result = await Product.find(condition, {}, { limit, skip });
		const resultWithImage = await Promise.all(
			result.map((prod) => {
				return new Promise(async (resolve, reject) => {
					if (prod.photo) prod.photo = await fs.readFile(`${paths.app}/${prod.photo}`, 'base64');
					resolve(prod);
				});
			})
		);
		if (total) result.total = Product.countDocuments(criteria);
		return { data: resultWithImage };
	}
}

module.exports = ProductService;
