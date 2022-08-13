import { useState } from 'react';



const FIELD_AGENTS_DATA = [
    {
        agentId: 1,
        firstName: 'Hazel',
        middleName: 'A',
        lastName: 'Hazel',
        dob: '01/01/2001',
        heightInInches: 50
    },
    {
        agentId: 2,
        firstName: 'John',
        middleName: 'B',
        lastName: 'Hazel',
        dob: '01/01/2002',
        heightInInches: 50
    },
    {
        agentId: 3,
        firstName: 'Erica',
        middleName: '',
        lastName: 'Hazel',
        dob: '01/01/2003',
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

    const [fieldAgents, setFieldAgents] = useState(FIELD_AGENTS_DATA);
    const [fieldAgent, setFieldAgent] = useState(FIELD_AGENT_DEFAULT);

    // define one state variable for every field 
    // initializing with empty value
    // match the names in the form
    // const [firstName, setFirstName] = useState('');
    // const [middleName, setMiddleName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [dob, setDob] = useState('');
    // const [heightInInches, setHeightInInches] = useState(0);

    const handleChange = (event) => {
        // use spread, with curly brackets for OBJECT copy
        const newFieldAgent = {...fieldAgent};

        // update the value of the property that just changed.
        // one handler to rule them all
        // we can "index" into the object using square brackets
        // just like we can do with arrays
        // .name property in the HTML element, to update the .name with .value 
        // like a map with key-value pairs 
        // FOR CHECKBOX handlers
        // if (event.target.type == 'checkbox') {
        //     newFieldAgent[event.target.name] = event.target.checked
        // } else {
        //     newFieldAgent[event.target.name] = event.target.value;
        // }
        newFieldAgent[event.target.name] = event.target.value;

        setFieldAgent(newFieldAgent);
        

    };


    // const handleFirstNameChange = (event) => {
    //     setFirstName(event.target.value);
    // };
    // const handleMiddleNameChange = (event) => {
    //     setMiddleName(event.target.value);
    // };
    // const handleLastNameChange = (event) => {
    //     setLastName(event.target.value);
    // };
    // const handleDobChange = (event) => {
    //     setDob(event.target.value);
    // };
    // const handleHeightInInchesChange = (event) => {
    //     setHeightInInches(event.target.value);
    // };




    const handleEditAgent = (fieldAgentId) => {
        console.log(`Editing field agent: ${fieldAgentId}`);
    };

    const handleDeleteAgent = (fieldAgentId) => {
        console.log(`Deleting field agent: ${fieldAgentId}`);

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // // create an object for the field agent

        // const fieldAgent = {
        //     // concise propert syntax
        //     firstName,
        //     middleName,
        //     lastName,
        //     dob,
        //     heightInInches
        // };

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

        // reset the state
        resetState();

    };

    const resetState = () => {
        setFieldAgent(FIELD_AGENT_DEFAULT);
        // setFirstName('');
        // setMiddleName('');
        // setLastName('');
        // setDob('');
        // setHeightInInches(0);
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
                        <i className="bi bi-file-earmark-check"></i> Add Field Agent
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