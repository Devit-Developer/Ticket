import React, { useState, useEffect } from "react"
import Layout from "../components/Layout";
import ErrorAlert from "../components/ErrorAlert";
import SweetAlertComponent from '../components/SweetAlertComponent';
import DataTable from '../components/DataTable';

const Company = () => {

    const [credentials, setcredentials] = useState({ id: "", name: "", code: "", address: "", email: "", mobile: "" })
    const [error, setError] = useState('');
    const [singleError, setSingleError] = useState();
    const [successMessage, setSuccessMessage] = useState('');
    const [records, setRecords] = useState([]);

    const apiURL = import.meta.env.VITE_REACT_API_URL;

    const token = sessionStorage.getItem('token');
    console.log(token);

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    };

    const clearForm = () => {
        setcredentials({
            id: '',
            name: '',
            code: '',
            address: '',
            email: '',
            mobile: ''
        });
    };

    //get-company
    const fetchRecords = async () => {
        try {
            const response = await fetch(`${apiURL}get-company`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                setSingleError('Failed to fetch records');
            }
            const data = await response.json();
            setRecords(data);

        } catch (error) {

            setSingleError('Error fetching records:', error.message);

        }
    };

    // save company
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSingleError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`${apiURL}add-company/${credentials.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: credentials.name, code: credentials.code, address: credentials.address, email: credentials.email, mobile: credentials.mobile }),
            });

            if (!response.ok) {
                const Data = await response.json();

                //validation check
                if (response.status === 400) {
                    setError(Object.values(Data.error));
                } else {
                    setSingleError('An error occurred during company.');

                }

            } else {
                clearForm();
                fetchRecords();
                const successData = await response.json();
                setSuccessMessage(successData.message);
            }

        } catch (error) {
            setSingleError('Sorry, something went wrong there. Try again.');
        }
    };

    // Delete company
    window.handleDelete = async (id) => {
        
            try {
                // Send a DELETE request to the server to delete the record by ID
                const response = await fetch(`${apiURL}delete-company/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },                    
                });

                if (!response.ok) {
                    setSingleError('Failed to delete record');
                }
                // If deletion is successful, fetch updated records
                fetchRecords();
                clearForm();

            } catch (error) {
                console.error('Error deleting record:', error.message);
            }

    };

    // edit company
    window.handleEdit = async (id) => {
        try {
            // Send a DELETE request to the server to delete the record by ID
            const response = await fetch(`${apiURL}edit-company/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setSingleError('Failed to edit record');
                return;
            }

            const data = await response.json();

            setcredentials({
                id: data.result._id,
                name: data.result.name,
                code: data.result.code,
                address: data.result.address,
                email: data.result.email,
                mobile: data.result.mobile
            });


        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <Layout>

            {singleError &&
                <SweetAlertComponent
                    text={singleError}
                    icon="error"
                    position="top-end"
                    timer={2000}
                    background="#930411"
                    color={'#ffffff'}
                />
            }

            {successMessage &&
                <SweetAlertComponent
                    text={successMessage}
                    icon="success"
                    position="top-end"
                    timer={2000}
                    background="#0b3915"
                    color={'#ffffff'}
                />
            }

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Company</h1>
            </div>


            <div className="card card-body shadow">
                {error && error.length > 0 && <ErrorAlert errorMessage={error} />}

                <form onSubmit={handleSubmit} method='POST'>
                    <input type="hidden" name="id" value={credentials.id} onChange={handleChange} />
                    <div className="row">
                        <div className="col-md-8">
                            <label htmlFor="Name" className="form-label mt-3">Company Name</label>
                            <input type="text" className="form-control" name="name" id="Name" autoComplete="off" placeholder="Enter Company Name" value={credentials.name} onChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="Code" className="form-label mt-3">Company Code</label>
                            <input type="text" className="form-control" name="code" id="Code" autoComplete="off" placeholder="Enter Company Code" value={credentials.code} onChange={handleChange} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="address" className="form-label mt-3">Address</label>
                            <textarea name="address" id="address" className="form-control" rows={2} value={credentials.address} onChange={handleChange} placeholder="Address"></textarea>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="mobile" className="form-label mt-3">Mobile</label>
                            <input type="text" value={credentials.mobile} className="form-control" id="mobile" name="mobile" autoComplete="off" placeholder="Mobile" onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label mt-3">Email Address</label>
                            <input type="text" value={credentials.email} className="form-control" id="email" name="email" autoComplete="off" placeholder="Enter email" onChange={handleChange} />
                        </div>
                        <div className="col-md-12 mt-3">
                            <button type="submit" className="btn btn-primary mr-1">Submit</button>&nbsp;
                            <button type="button" onClick={clearForm} className="btn btn-secondary">Clear</button>
                        </div>
                    </div>
                </form>

            </div>
            <div className="card card-body mt-3 shadow">
                <DataTable data={records} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
        </Layout>
    )
}
export default Company