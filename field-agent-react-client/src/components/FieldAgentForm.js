import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

// for add, dont need agent id
const FIELD_AGENT_DEFAULT = {
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    heightInInches: 0
};


function FieldAgentForm() {

    const [fieldAgent, setFieldAgent] = useState(FIELD_AGENT_DEFAULT);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    // not using destructuring
    const params = useParams();
    const id = params.id;

    // the ID param will help determine if we are editing or adding
    // // using destructuring, can also be written in this way
    // const { agentId } = useParams();


    useEffect(() => {

        // get/find the field agent with the ID
        // make sure we have an ID value
        if (id) {
            fetch(`http://localhost:8080/api/agent/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`)
                    }
                })
                .then(data => setFieldAgent(data))
                .catch(console.log);
        }


    }, [id]); // hey react, please call this function everytime the "id" route parameter changes value



    const handleChange = (event) => {
        // use spread, with curly brackets for OBJECT copy
        const newFieldAgent = { ...fieldAgent };

        newFieldAgent[event.target.name] = event.target.value;

        setFieldAgent(newFieldAgent);


    };


    const handleSubmit = (event) => {
        event.preventDefault();

        
        addFieldAgent();

        if (id) {
            updateFieldAgent();
        } else {
            addFieldAgent();
        }

    };

    const addFieldAgent = () => {

        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fieldAgent)
        };

        fetch('http://localhost:8080/api/agent', init)
            .then(response => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                if (data.agentId) {

                    // on the happy path "data is an object that looks like this: "
                    // {
                    //     "agentId": 9,
                    //     "firstName": "2 Claudian",
                    //     "middleName": "C",
                    //     "lastName": "O'Lynn",
                    //     "dob": "1956-11-09",
                    //     "heightInInches": 41,
                    //     "agencies": [],
                    //     "aliases": []
                    //   }

                    // send the user back to the list page
                    history.push('/fieldagents');



                } else {

                    /*

                    on the unhappy path "data" is an array that looks like this

                    [
                    "firstName is required",
                    "lastName is required",
                    "height must be between 36 and 96 inches"
                    ]

                    */

                    setErrors(data);
                }
            })
            .catch(console.log);


    };

    const updateFieldAgent = () => {

        // assign an ID (this is probably not needed anymore)
        fieldAgent.agentId = id;

        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fieldAgent)
        };

        fetch(`http://localhost:8080/api/agent/${id}`, init)
            .then(response => {
                if (response.status === 204) {
                    return null;
                } else if (response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                if (!data) {
                    // since 204 returns no object, we dont want data, this is happy path
                    
                    // send the user back to the list route
                    history.push('/fieldagents');
                } else {
                    setErrors(data); // data will be an array of error messages if it gets to this point
                }
            })
            .catch(console.log);


    }






    return (

        <>
            <h2 className='mb-4'>{id ? 'Update Field Agent' : 'Add Field Agent'}</h2>

            {errors.length > 0 && (
                <div className="alert alert-danger">
                    <p>The following errors were found:</p>
                    <ul>
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}


            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" name="firstName" type="text" className="form-control"
                        value={fieldAgent.firstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="middleName">Middle Name:</label>
                    <input id="middleName" name="middleName" type="text" className="form-control"
                        value={fieldAgent.middleName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" name="lastName" type="text" className="form-control"
                        value={fieldAgent.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input id="dob" name="dob" type="date" className="form-control"
                        value={fieldAgent.dob} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="heightInInches">Height inches:</label>
                    <input id="heightInInches" name="heightInInches" type="number" className="form-control"
                        value={fieldAgent.heightInInches} onChange={handleChange} />

                </div>

                <div className="mt-4">
                    <button className="btn btn-success mr-2" type="submit">
                        <i className="bi bi-file-earmark-check"></i> {id ? 'Update Field Agent' : 'Add Field Agent'}
                    </button>
                    <Link className="btn btn-warning" to="/fieldagents">
                        <i className="bi bi-stoplights"></i> Cancel
                    </Link>
                </div>
            </form>
        </>
    );
}

export default FieldAgentForm;