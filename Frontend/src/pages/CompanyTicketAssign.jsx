import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CTADatatable from '../components/CTADatatable';
import SweetAlertComponent from '../components/SweetAlertComponent';
import ErrorAlert from "../components/ErrorAlert";


const CompanyTicketAssign = () => {

    const [credentials, setcredentials] = useState({ id: "", company: "", startNumber: "", endNumber: "", coin: "" })
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [singleError, setSingleError] = useState();
    const [successMessage, setSuccessMessage] = useState('');
    const [companyRecords, setCompanyRecords] = useState([]);
    const [companyTicketRecords, setcompanyTicketRecords] = useState([]);
    const apiURL = import.meta.env.VITE_REACT_API_URL;

    const fetchRecords = async () => {
        try {

            const response = await fetch(`${apiURL}/get-company`);

            if (!response.ok) {
                setSingleError('Failed to fetch records');
            }

            const data = await response.json();
            setCompanyRecords(data);

        } catch (error) {

            setSingleError('Error fetching records:', error.message);
        }
    };

    const getCompanyTicketDetails = async () => {
        try {

            const response = await fetch(`${apiURL}get-company-ticket`);

            if (!response.ok && !response2.ok) {
                setSingleError('Failed to fetch records');
                return;
            }

            const data = await response.json();
            
            const response2 = await fetch(`${apiURL}get-company`);

            const data2 = await response2.json();

            const updatedData = data.map(item1 => {
                const matchingItem2 = data2.find(item2 => item2._id === item1.company);

                if (matchingItem2) {
                    // Merge properties from item2 into item1
                    return { ...item1, code: matchingItem2.code};
                }
                return item1;
            });

            setcompanyTicketRecords(updatedData);

        } catch (error) {

            setSingleError('Error fetching records:', error.message);
        }
    };

    useEffect(() => {
        getCompanyTicketDetails();
        fetchRecords();
    }, []);

    const handleChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setSingleError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`${apiURL}add-company-ticket/${credentials.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ company: credentials.company, startNumber: credentials.startNumber, endNumber: credentials.endNumber, coin: credentials.coin }),
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
                e.target.reset();
                handleCloseModal();
                getCompanyTicketDetails();
                const successData = await response.json();
                setSuccessMessage(successData.message);
            }

        } catch (error) {
            setSingleError('Sorry, something went wrong there. Try again.');
        }
    };

    window.handleEdit = async (id) => {
        try {
            // Send a DELETE request to the server to delete the record by ID
            const response = await fetch(`${apiURL}edit-company-ticket/${id}`, {
                method: 'GET',
            });

            if (!response.ok) {
                setSingleError('Failed to edit record');
                return;
            }

            const data = await response.json();

            setcredentials({
                id: data.result._id,
                company: data.result.company,
                startNumber: data.result.startNumber,
                endNumber: data.result.endNumber,
                coin: data.result.coin
            });
            handleOpenModal();

        } catch (error) {
            console.error(error.message);
        }
    };

    window.handleDelete = async (id) => {
        // if (confirm('Are you sure wan`t to delete this record..?')) {

            try {
                // Send a DELETE request to the server to delete the record by ID
                const response = await fetch(`${apiURL}delete-company-ticket/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    setSingleError('Failed to delete record');
                }
                // If deletion is successful, fetch updated records
                getCompanyTicketDetails();

            } catch (error) {
                console.error('Error deleting record:', error.message);
            }
        // }
    }

    const handleOpenModal = (e) => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setcredentials({ id: "", company: "", startNumber: "", endNumber: "", coin: "" });
        setShowModal(false);
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
                <h1 className="h2">Company Ticket Assign</h1>
            </div>
            <div className="card shadow">
                <div className='card-header'>
                    <div className='float-end'>
                        <button type="button" className="btn btn-primary" onClick={handleOpenModal}>
                            Add Ticket
                        </button>

                        {/* Bootstrap Modal */}
                        <div className={`modal modal-lg shadow-lg fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <form method="post" onSubmit={handleSubmit} >
                                        <div className="modal-header">
                                            <h5 className="modal-title">Add Ticket</h5>
                                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                        </div>
                                        <div className="modal-body">
                                            {error && error.length > 0 && <ErrorAlert errorMessage={error} />}

                                            <input type="hidden" name="id" value={credentials.id} onChange={handleChange} />

                                            <div>
                                                <label htmlFor="Company" className="form-label mt-3">Company</label>
                                                <select className='form-control' name='company' id='company' onChange={handleChange}>
                                                    <option  value={""}>select Company</option>

                                                    {companyRecords && companyRecords.length > 0 && companyRecords.map((val, index) => (
                                                        <option value={val._id} key={index} selected={val._id === credentials.company}>{val.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className='mt-3'>
                                                <label htmlFor="inputStartNum" className="form-label mt-3">Start Number</label>
                                                <input type="text" className="form-control" name="startNumber" id="inputStartNum" autoComplete="off" placeholder="Enter Start Number" value={credentials.startNumber} onChange={handleChange} />
                                            </div>

                                            <div className='mt-3'>
                                                <label htmlFor="inputEndNum" className="form-label mt-3">Ending Number</label>
                                                <input type="text" className="form-control" name="endNumber" id="inputEndNum" autoComplete="off" placeholder="Enter Ending Number" value={credentials.endNumber} onChange={handleChange} />
                                            </div>

                                            <div className='mt-3'>
                                                <label htmlFor="inputCoin" className="form-label mt-3">Coin</label>
                                                <input type="text" className="form-control" name="coin" id="inputCoin" autoComplete="off" placeholder="Enter Coin" value={credentials.coin} onChange={handleChange} />
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* End Bootstrap Modal */}
                    </div>
                </div>
                <div className='card-body'>
                    <CTADatatable data={companyTicketRecords} handleEdit={handleEdit} handleDelete={handleDelete} />
                </div>
            </div>
        </Layout>
    )
}

export default CompanyTicketAssign