import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistancetoNow from 'date-fns/formatDistancetoNow';


const WorkoutDetails = ({ workout }) => {
    const {dispatch} = useWorkoutsContext()
    const handleDelete = async () => {
        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            
            method: 'DELETE'
        })
        const json = await response.json();

        if (response.ok) {
            dispatch({type:'DELETE_WORKOUTS', payload: json})
            

        }}
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load: </strong>{workout.load} kg</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistancetoNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className='material-symbols-outlined' onClick={handleDelete}>delete</span>
            
        </div>
    )
}

export default WorkoutDetails