import { useEffect, useState } from 'react';





// for add, dont need agent id
const FIELD_AGENT_DEFAULT = {
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    heightInInches: 0
};



function FieldAgents() {

    // define our state variables
    // we use destructuring to get the individual valus that are returned from the useState function call
    const [fieldAgents, setFieldAgents] = useState([]);
    const [fieldAgent, setFieldAgent] = useState(FIELD_AGENT_DEFAULT);

    // if id is greater than 0, we are editing
    // if id is 0, we are adding
    const [editFieldAgentId, setEditFieldAgentId] = useState(0);
    const [currentView, setCurrentView] = useState('List'); // Add, Edit
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8080/api/agent')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`)
                }
            })
            .then(data => setFieldAgents(data))
            .catch(console.log);
    }, []); //for the side effect we want to run, what are the [] dependencies?
    // an empty dependency array tells to run our side effect once when the component is initally loaded. 
    // ********


    const handleChange = (event) => {
        // use spread, with curly brackets for OBJECT copy
        const newFieldAgent = { ...fieldAgent };

        newFieldAgent[event.target.name] = event.target.value;

        setFieldAgent(newFieldAgent);


    };



    const handleEditAgent = (fieldAgentId) => {

        // Step 1
        // update the field agent state variable to the field agent id we need to edit
        setEditFieldAgentId(fieldAgentId);

        // find the agent in the array of agents for the fieldAgentId we need to edit
        const fieldAgent = fieldAgents.find(fieldAgent => fieldAgent.agentId === fieldAgentId);

        // CREATE A COPY of the field agent to edit
        const editFieldAgent = { ...fieldAgent };

        // update the fieldAgent state variable wiht a field agent object that we need to edit
        setFieldAgent(editFieldAgent);


        // Step 2
        // we want to pre-populate the form with the values when we hit edit button

        // Update the current view to display the form
        setCurrentView('Edit');

    };

    const handleDeleteAgent = (fieldAgentId) => {

        // need to find the field agent with ID
        const fieldAgent = fieldAgents.find(fieldAgent => fieldAgent.agentId === fieldAgentId);


        if (window.confirm(`Delete field agent: ${fieldAgent.firstName}-${fieldAgent.lastName}?`)) {

            const init = {
                method: 'DELETE'
            };

            fetch(`http://localhost:8080/api/agent/${fieldAgentId}`, init)
                .then(response => {
                    if (response.status === 204) {

                        // create a copy of the field agents array
                        // remove the agent that we need to delete
                        const newFieldAgents = fieldAgents.filter(fieldAgent => fieldAgent.agentId !== fieldAgentId);

                        // update the field agent state variable
                        setFieldAgents(newFieldAgents);

                        // TODO re-fetch from the API


                        resetState();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .catch(console.log);

        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editFieldAgentId === 0) {
            addFieldAgent();
        } else {
            updateFieldAgent();
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


                    // create a copy of the field agent array.
                    const newFieldAgents = [...fieldAgents];

                    // add the new field agent
                    newFieldAgents.push(data);

                    // this is an option to the previous two statements
                    //const newFieldAgents = [...fieldAgents, fieldAgent];

                    // update the field agents state variable
                    setFieldAgents(newFieldAgents);

                    resetState();
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


    }

    const updateFieldAgent = () => {

        // assign an ID
        fieldAgent.agentId = editFieldAgentId;

        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fieldAgent)
        };

        fetch(`http://localhost:8080/api/agent/${editFieldAgentId}`, init)
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

                    // create a copy of the field agent array.
                    const newFieldAgents = [...fieldAgents];

                    // to determing the index of the field agent that we are ediitng
                    const indexToUpdate = newFieldAgents.findIndex(fa => fa.agentId === editFieldAgentId);

                    // we need to update the field agent at that index
                    newFieldAgents[indexToUpdate] = fieldAgent;

                    // update the field agents state variable
                    setFieldAgents(newFieldAgents);


                    resetState();
                } else {
                    setErrors(data);
                }
            })
            .catch(console.log);


    }

    const resetState = () => {
        setFieldAgent(FIELD_AGENT_DEFAULT);
        setEditFieldAgentId(0);
        setCurrentView('List');
        setErrors([]);

    };





    return (
        <>


            {(currentView === 'Add' || currentView === 'Edit') && (
                <>
                    <h2 className='mb-4'>{editFieldAgentId > 0 ? 'Update Field Agent' : 'Add Field Agent'}</h2>

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
                                <i className="bi bi-file-earmark-check"></i> {editFieldAgentId > 0 ? 'Update Field Agent' : 'Add Field Agent'}
                            </button>
                            <button className="btn btn-warning" type="button" onClick={resetState}>
                                <i className="bi bi-stoplights"></i> Cancel
                            </button>
                        </div>
                    </form>
                </>
            )}



            {currentView === 'List' && (
                <>
                    <h2 className="mb-4">Field Agents</h2>
                    <button className="btn btn-primary my-4" onClick={() => setCurrentView('Add')}>
                        <i className="bi bi-plus-circle"></i> Add Field Agent
                    </button>

                    <table className="table table-striped table-hover table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th>Agent Id</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>DOB</th>
                                <th>heightInInches</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fieldAgents.map(fieldAgent => (
                                <tr key={fieldAgent.agentId}>
                                    <td>{fieldAgent.agentId}</td>
                                    <td>{fieldAgent.firstName}</td>
                                    <td>{fieldAgent.middleName}</td>
                                    <td>{fieldAgent.lastName}</td>
                                    <td>{fieldAgent.dob}</td>
                                    <td>{fieldAgent.heightInInches}</td>
                                    <td>
                                        <div className="float-right mr-2">
                                            <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditAgent(fieldAgent.agentId)}>
                                                <i className="bi bi-pencil-square"></i> Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAgent(fieldAgent.agentId)}>
                                                <i className="bi bi-trash"></i> Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>



            )}



        </>
    );
}

export default FieldAgents;