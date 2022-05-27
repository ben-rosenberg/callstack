import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallstacksTable from '../components/CallstacksTable';

import '../style.css';

const Main = () => {
    /* const allCallstacks = [
        {
            name: "Application Development",
            priority: 3,
            difficulty: 2,
            nextDue: Date.UTC(2022, 5, 27)
        },
        {
            name: "Move",
            priority: 3,
            difficulty: 3,
            nextDue: Date.UTC(2022, 6, 1)
        },
        {
            name: "Learn Only Echoes Songs on Bass",
            priority: 1,
            difficulty: 1,
            nextDue: Date.UTC(2022, 6, 2)
        }
    ]; */

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ allCallstacks, setAllCallstacks ] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:8000/api/callstacks')
            .then(res => {
                setAllCallstacks(res.data);
                setIsLoaded(true);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="flex_col gap_1">
            <h2 className="text_center">Welcome, Ben! Here are your current Callstacks:</h2>
            {
                isLoaded
                ?
                <CallstacksTable callstacks={ allCallstacks } />
                :
                <p className='text_center'>It looks like you don't have any Callstacks yet. Would you like to <Link to='/callstacks/new'>create one</Link>?</p>
            }
        </div>
    );
};

export default Main;