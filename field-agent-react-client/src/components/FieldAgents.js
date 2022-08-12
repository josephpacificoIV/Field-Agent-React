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



function FieldAgents() {

    const [fieldAgents, setFieldAgents] = useState(FIELD_AGENTS_DATA);

    const handleEditAgent = (fieldAgentId) => {
        console.log(`Editing field agent: ${fieldAgentId}`);
    };

    const handleDeleteAgent = (fieldAgentId) => {
        console.log(`Deleting field agent: ${fieldAgentId}`);

    };

    const handleSubmit = (event) => {
        // TODO prevent default action


    };

    const resetState = () => {
        // TODO reset the state

    };





    return (
        <>
            <h2 className='mb-4'>Field Agents</h2>


            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" name="firstName" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="middleName">Middle Name:</label>
                    <input id="middleName" name="middleName" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" name="lastName" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input id="dob" name="dob" type="date" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="heightInInches">Height inches:</label>
                    <input id="heightInInches" name="heightInInches" type="number" className="form-control"/>
                        
                </div>
                
                <div className="mt-4">
                    <button className="btn btn-success mr-2" type="submit">
                        <i className="bi bi-file-earmark-check"></i> Add Solar Panel
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