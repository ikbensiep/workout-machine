import workouts from './_workouts.js';

const contents = JSON.stringify(workouts.map(workout => {
	return {
		title: workout.name,
		slug: workout.slug
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}