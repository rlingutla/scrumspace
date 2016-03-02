# The Root State Tree

```
{
	user: {
		...see_er, 
		gitHub_userName
	},
	projects: [
		{
			... project_see_er,
			git_url,
			sprints: [{
				id,
				start_date,
				end_date,
				scrum_time
			}],
			stories: [{
				...see_er,
				tasks: [{
					status: UNASSIGNED|DOING|BLOCKED|DONE
					...see_er, 
					assigned_users: [
						userId
					],
					start_date,
					end_date
				}]
			}],
			group_stats: {
				//to be expanded
			}
		}
	]
}
```
