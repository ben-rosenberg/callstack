import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Task from '../components/Task';
import '../style.css';

const CallstackDetails = (props) => {
    const utilityFunctions = require('../utilities/utilityFunctions');

    const { callstackId } = useParams();

    const [ dbCallstack, setDbCallstack ] = useState({});
    const [ isLoaded, setIsLoaded ] = useState(false);

    const [ newTaskName, setNewTaskName ] = useState('');
    const [ newTaskDue, setNewTaskDue ] = useState(utilityFunctions.getDefaultDateString());
    const [ taskValidationErrors, setTaskValidationErrors ] = useState({});

    const [ dataChangeTracker, setDataChangeTracker ] = useState(false);

    const createTask = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:8000/api/callstacks/${callstackId}/tasks`, {
            name: newTaskName,
            due: new Date(newTaskDue)
        })
            .then(res => {
                setTaskValidationErrors({});
                setDataChangeTracker(!dataChangeTracker)
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const tempErrorObj = {};

                for (let errorKey in errorResponse) {
                    const fieldKey = errorResponse[errorKey].path;
                    tempErrorObj[fieldKey] = errorResponse[errorKey];
                }

                setTaskValidationErrors(tempErrorObj);
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/callstacks/${callstackId}`)
            .then(res => {
                setDbCallstack(res.data);
                setIsLoaded(true);
            })
            .catch(err => {
                setIsLoaded(false);
                console.log(err);
            })
    }, [callstackId, dataChangeTracker]);

    return (
        <div className="flex_col">
        {
            isLoaded
            ? <div>
                <form onSubmit={ event => createTask(event) }>
                    <div className="flex_row gap_1">
                        <div className="width_60 flex_row">
                            <label>New Task</label>
                            <input 
                                onChange={ event => setNewTaskName(event.target.value) }
                                value={ newTaskName }
                            />
                        </div>
                        <div className="width_50 flex_row">
                            <label>Due</label>
                            <input
                                type="datetime-local"
                                onChange={ event => setNewTaskDue(event.target.value) }
                                value={ newTaskDue }
                            />
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            className="width_20"
                        />
                    </div>
                </form>
                <h2 className='text_center'>{ dbCallstack.name }</h2>
                {
                    dbCallstack.tasks.map((task, index) => {
                        return (
                            <Task key={ index } task={ task } dataChangeTracker={{ get: dataChangeTracker, set: setDataChangeTracker }}/>
                        );
                    })
                }
            </div>
            : <h2 className='text_center'>Loading...</h2>
        }
        </div>
    );
};

export default CallstackDetails;