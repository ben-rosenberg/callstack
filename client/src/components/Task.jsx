import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import '../style.css';

const Task = (props) => {
    const [ completed, setCompleted ] = useState(props.task.isCompleted);
    const [ checkboxLabelStyle, setCheckboxLabelStyle ] = useState(props.task.isCompleted ? 'strikethrough' : '');
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ expandStr, setExpandStr ] = useState('v');

    const { callstackId } = useParams();

    const completeItem = () => {
        //setCheckboxLabelStyle(!completed ? 'strikethrough' : '');
        axios.put(
                `http://localhost:8000/api/callstacks/${callstackId}/tasks/${props.task._id}/complete`,
                { isCompleted: !completed })
            .then(res => {
                console.log(res.data);
                setCompleted(!completed);
            })
            .catch(err => console.log(err));
        setCheckboxLabelStyle(!completed ? 'strikethrough' : '');
    }

    const expandTask = (event) => {
        event.preventDefault();
        setIsExpanded(!isExpanded);
        setExpandStr(!isExpanded ? '^' : 'v');
    }

    useEffect(() => {
        //console.log(JSON.stringify(props.task));
    }, [props.task])

    return (
        <div className="task flex_col gap_1">
            <div className="flex_row space_between">
                <div className={ `flex_row gap_1 ${checkboxLabelStyle}` }>
                    <div>
                        <input
                            type="checkbox"
                            id="complete_task"
                            defaultChecked={ completed }
                            onChange={ () => completeItem() }
                        />
                        <label htmlFor="complete_task">{ props.task.name }</label>
                    </div>
                    <p><Link to={ `/callstacks/${callstackId}/tasks/${props.task._id}/edit` }>edit</Link></p>
                </div>
                <div className="flex_row gap_1">
                    <p>Due: { props.task.due.toString() }</p>
                    <button onClick={ (event) => expandTask(event) }>{ expandStr }</button>
                </div>
            </div>
            {
                isExpanded
                &&
                <div className="flex_col gap_1">
                    <p>Dependent Tasks <Link to={ `/callstacks/${callstackId}/tasks/${props.task._id}/edit` }>+</Link></p>
                    <ul>
                    {
                        props.task.hasOwnProperty("dependentTasks")
                        &&
                        props.task.dependentTasks.map((depTask, index) => {
                            return (
                                <li key={ index }>{ depTask.name }</li>
                            );
                        })
                    }   
                    </ul>
                </div>
            }
        </div>
    );
};

export default Task;