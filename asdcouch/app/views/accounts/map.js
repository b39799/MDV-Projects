function (doc){
	if (doc._id.substr(0,6) === "itunes") {
		emit(doc._id, {
			"accountName": doc.accountName,
			"password": doc.password
		});
	}
};