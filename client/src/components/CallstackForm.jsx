import { useState } from 'react';
import { useParams } from 'react-router-dom';

import '../style.css';

const CallstackForm = (props) => {
    let initialFieldValues;

    const utilityFunctions = require('../utilities/utilityFunctions');

    if (props.hasOwnProperty('callstack')) {
        initialFieldValues = props.callstack;
    } else {
        const defaultDate = utilityFunctions.defaultDateString();

        initialFieldValues = {
            name: '',
            priority: 1,
            difficulty: 1,
            due: defaultDate
        };
    }

    const [ name, setName ] = useState(initialFieldValues.name);
    const [ priority, setPriority ] = useState(initialFieldValues.priority);
    const [ difficulty, setDifficulty ] = useState(initialFieldValues.difficulty);
    const [ dueDatetime, setDueDatetime ] = useState(initialFieldValues.due);

    const { callstackId } = useParams();

    /**
     * 
     * @param {Event} event The event that triggered the call to this function
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(name);
        props.formSubmissionHandler({
            name,
            priority: parseInt(priority),
            difficulty: parseInt(difficulty),
            due: new Date(dueDatetime)
        })
    }

    return (
        <form onSubmit={ (event) => handleSubmit(event) }>
            <div className="flex_col gap_1">
                <div className="form_group">
                    <label>Name</label>
                    <input onChange={ (event) => setName(event.target.value) } value={ name } className='width_100'/>
                </div>
                <div className="flex_row space_between">
                    <div className="form_group">
                        <label>Priority</label>
                        <input onChange={ (event) => setPriority(event.target.value) } value={ priority } className='width_100'/>
                    </div>
                    <div className="form_group">
                        <label>Difficulty</label>
                        <input onChange={ (event) => setDifficulty(event.target.value) } value={ difficulty } className='width_100'/>
                    </div>
                </div>
                <div className="form_group">
                    <label>Due</label>
                    <input 
                        type='datetime-local'
                        onChange={ (event) => setDueDatetime(event.target.value) }
                        value={ dueDatetime }
                        min={ Date().toString() }
                        className='width_100'
                    />
                </div>
                <input type="submit" value="Submit" />
            </div>
        </form>
    );
};

export default CallstackForm;