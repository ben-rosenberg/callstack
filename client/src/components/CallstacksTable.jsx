import { Link } from 'react-router-dom';

import '../style.css';

const CallstacksTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Callstack <Link to='/callstacks/new'>+</Link>
                    </th>
                    <th>Priority</th>
                    <th>Difficulty</th>
                    <th>Next Due</th>
                </tr>
            </thead>
            <tbody>
            {
                props.callstacks.map((callstack, index) => {
                    return (
                        <tr key={ index }>
                            <td><Link to={ `/callstacks/${callstack._id}` }>{ callstack.name }</Link></td>
                            <td>{ callstack.priority } / 5</td>
                            <td>{ callstack.difficulty } / 5</td>
                            <td>{ callstack.due.toString() }</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    );
};

export default CallstacksTable;