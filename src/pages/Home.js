import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

//components
import WorkoutDetails from '../component/WorkoutDetails';
import WorkoutForm from '../component/WorkoutForm';

const Home = () => {
	console.log('Home');
	const { workouts, dispatch } = useWorkoutsContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch('http://localhost:4000/api/workouts');
			const json = await response.json();

	
			if (response.ok) {
				dispatch({ type: 'SET_WORKOUTS', payload: json });
			}
		};
		fetchWorkouts()
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutDetails
							key={workout._id}
							workout={workout}
						/>
					))}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
