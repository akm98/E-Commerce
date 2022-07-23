const { json } = require("express");

class ApiFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	search() {
		const keyword = this.queryStr.keyword
			? {
					name: {
						$regex: this.queryStr.keyword,
						$options: "i", // lowercase
					},
			  }
			: "";

		this.query = this.query.find({ ...keyword });

		return this;
	}

	filter() {
		// Filter by category
		// First we filter by category then we filter it by price
		const clonedQueryString = { ...this.queryStr };

		const excludeOptions = ["keyword", "page", "limit"];

		excludeOptions.forEach((key) => delete clonedQueryString[key]);

		//this.query = this.query.find(clonedQueryString)  // we are not using regex because category will be predifined

		// Filter by price
		let queryString = JSON.stringify(clonedQueryString);

		queryString = queryString.replace(
			/\b(gt|lt|gte|lte)\b/g,
			(key) => `$${key}`
		);
		this.query = this.query.find(JSON.parse(queryString));

		return this;
	}

	pagination(itemPerPage) {
		const currentPage = this.queryStr.page || 1;

		const skip = itemPerPage * (currentPage - 1); // items to be skipped

		this.query = this.query.limit(itemPerPage).skip(skip);

		return this;
	}
}

module.exports = ApiFeatures;
