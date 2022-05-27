import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CallstackForm from '../components/CallstackForm';
import '../style.css';

const EditCallstack = (props) => {
    const [ dbCallstack, setDbCallstack ] = useState({});
    const [ validationErrors, setValidationErrors ] = useState({});
    const navigate = useNavigate();

    const { callstackId } = useParams();

    const updateCallstack = (editedCallstack) => {
        axios.put(`http://localhost:8000/callstacks/${callstackId}`, editedCallstack)
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

    useEffect(() => {
        axios.get(`http://localhost:8000/callstacks/${callstackId}`)
            .then(res => setDbCallstack(res.data))
            .catch(err => console.log(err));
    }, [ callstackId ]);

    return (
        <div className="flex_col gap_1">
            <h2 className="text_center">Create Callstack</h2>
            <CallstackForm
                callstack={ dbCallstack }
                formSubmissionHandler={ updateCallstack }
                validationErrors={ validationErrors }
            />
        </div>
    );
};

export default EditCallstack;