import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CallstackForm from '../components/CallstackForm';
import '../style.css';

const NewCallstack = (props) => {
    const [ validationErrors, setValidationErrors ] = useState({});
    const navigate = useNavigate();

    const createCallstack = (newCallstack) => {
        console.log(newCallstack);

        axios.post('http://localhost:8000/api/callstacks', newCallstack)
            .then(res => {
                setValidationErrors({});
                navigate(`/callstacks/${res.data._id}`, { replace: true });
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const tempErrorObj = {};

                for (let errorKey in errorResponse) {
                    const fieldKey = errorResponse[errorKey].path;
                    tempErrorObj[fieldKey] = errorResponse[errorKey];
                }

                setValidationErrors(tempErrorObj);
            })
    }

    return (
        <div className="flex_col gap_1">
            <h2 className="text_center">Create Callstack</h2>
            <CallstackForm 
                formSubmissionHandler={ createCallstack }
                validationErrors={ validationErrors }
            />
        </div>
    );
};

export default NewCallstack;