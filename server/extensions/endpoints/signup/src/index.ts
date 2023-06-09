import { defineEndpoint } from '@directus/extensions-sdk'; 

export default defineEndpoint((router, { services }) => {
	router.post('/', async (_req, res) => {
		try {
		let UsersService = new services.UsersService({ schema: _req.schema, accountability: {
			"admin": true,
		  }, })
		let DonorService = new services.ItemsService('donors', { schema: _req.schema, accountability: {
			"admin": true,
		  }, })
		  let id = await UsersService.createOne({
			phone: _req.body.phone,
			email: _req.body.email,
			password: _req.body.password,
			role: '278c343d-c422-42c0-a299-4912c0a490f2',
			first_name: _req.body.first_name,
			last_name: _req.body.last_name,
		  })
		  await DonorService.createOne({
			first_name: _req.body.first_name,
			last_name: _req.body.last_name,
			ABO: _req.body.type,
			wilaya: _req.body.city,
			phone: _req.body.phone,
			email: _req.body.email,
			status: 'pending',
			account_id: id
		  })
		  res.json({ ok: true })
	} catch (error) {
		console.log(error)
		res.json({ error: 'Something wrong happen' }) 
	}

	});
});
