function (doc){
		emit(doc._id, {
			"accountName": doc.accountName,
			"password": doc.password,
			"email": doc.email,
			"user": doc.user,
			"notes": doc.notes
		});
};