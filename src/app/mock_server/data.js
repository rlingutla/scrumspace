export default initialData = {
	users: {
		0: {
			"_id": 0,
			"first_name": "Donald",
			"last_name": "Trump",
			"email": "america@donaldjtrump.com"
			"display_name": "DJ Trump",
			"password": "d4866854120e8bb207d6f8e11fce8b99"
		}
	}
	projects: {
		0: {
			"_id": 0,
			"title": "TRUMP",
			"description": "Make America Great Again",
			"users": [0],
			"current_sprint": null,
			"sprints": [
				{
					"_id": 0,
					"start_date": 1456900811760,
					"end_date": 1456900811760,
					"scrum_time": 09:00:00
				}
			],
			"stories": [
				{
					"_id": 0,
					"title": "Buy Hats",
					"description": "Design Hats \nOrder Hats\nSell Hats",
					"sprint_id": 0,
					"tasks": [
						{
							"_id": 0,
							"status": "DOING",
							"description": "Contact Graphic Designer",
							"history": null,
							"attachments": null
						}
					]
				}
			]
		}
	}
};