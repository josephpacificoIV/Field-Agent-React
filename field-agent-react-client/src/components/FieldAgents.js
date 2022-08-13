import { useState } from 'react';



const FIELD_AGENTS_DATA = [
    {
        agentId: 1,
        firstName: 'Hazel',
        middleName: 'A',
        lastName: 'Hazel',
        dob: '2001-01-01',
        heightInInches: 50
    },
    {
        agentId: 2,
        firstName: 'John',
        middleName: 'B',
        lastName: 'Hazel',
        dob: '2002-01-01',
        heightInInches: 50
    },
    {
        agentId: 3,
        firstName: 'Erica',
        middleName: '',
        lastName: 'Hazel',
        dob: '2003-01-01',
        heightInInches: 50
    },
];

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
    const [fieldAgents, setFieldAgents] = useState(FIELD_AGENTS_DATA);
    const [fieldAgent, setFieldAgent] = useState(FIELD_AGENT_DEFAULT);

    // if id is greater than 0, we are editing
    // if id is 0, we are adding
    const [editFieldAgentId, setEditFieldAgentId] = useState(0);



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

    };

    const handleDeleteAgent = (fieldAgentId) => {

        // need to find the field agent with ID
        const fieldAgent = fieldAgents.find(fieldAgent => fieldAgent.agentId === fieldAgentId);


        if (window.confirm(`Delete field agent: ${fieldAgent.firstName}-${fieldAgent.lastName}?`)) {

            // create a copy of the field agents array
            // remove the agent that we need to delete
            const newFieldAgents = fieldAgents.filter(fieldAgent => fieldAgent.agentId !== fieldAgentId);

            // update the field agent state variable
            setFieldAgents(newFieldAgents);

        }



    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editFieldAgentId === 0) {
            // assign an ID (this is temporary, API will handle)
            fieldAgent.agentId = Math.floor(Math.random() * 100000);

            // create a copy of the field agent array.
            const newFieldAgents = [...fieldAgents];

            // add the new field agent
            newFieldAgents.push(fieldAgent);

            // this is an option to the previous two statements
            //const newFieldAgents = [...fieldAgents, fieldAgent];

            // update the field agents state variable
            setFieldAgents(newFieldAgents);

        } else {
            // assign an ID
            fieldAgent.agentId = editFieldAgentId;

            // create a copy of the field agent array.
            const newFieldAgents = [...fieldAgents];

            // to determing the index of the field agent that we are ediitng
            const indexToUpdate = newFieldAgents.findIndex(fa => fa.agentId === editFieldAgentId);

            // we need to update the field agent at that index
            newFieldAgents[indexToUpdate] = fieldAgent;

            // update the field agents state variable
            setFieldAgents(newFieldAgents);




        }



        // reset the state
        resetState();

    };

    const resetState = () => {
        setFieldAgent(FIELD_AGENT_DEFAULT);
        setEditFieldAgentId(0);

    };





    return (
        <>
            <h2 className='mb-4'>Field Agents</h2>


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

    );
}

export default FieldAgents;