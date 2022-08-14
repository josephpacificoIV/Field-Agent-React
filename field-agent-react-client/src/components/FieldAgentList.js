import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


function FieldAgentList() {
    const [fieldAgents, setFieldAgents] = useState([]);

    const history = useHistory();

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


                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .catch(console.log);

        }
    };






    return (
        <>
            <h2 className="mb-4">Field Agents</h2>
            <button className="btn btn-primary my-4" onClick={() => history.push('/fieldagents/add')}>
                <i className="bi bi-plus-circle"></i> Add Field Agent
            </button>
            {/* <Link className="btn btn-primary my-4" to="/fieldagents/add">
                <i className="bi bi-plus-circle"></i> Add Field Agent
            </Link> */}

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
                                    <Link className="btn btn-primary btn-sm mr-2" to={`/fieldagents/edit/${fieldAgent.agentId}`}>
                                        <i className="bi bi-pencil-square"></i> Edit</Link>
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

export default FieldAgentList;

