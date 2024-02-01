import React, { useState } from 'react';

const Register = () => {

  const [credentials, setcredentials] = useState({ ticketNumber: "" });
  const [companyDetails, setCompanyDetails] = useState([]);
  const apiURL = import.meta.env.VITE_REACT_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiURL}check_ticket_number`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ticketNumber: credentials.ticketNumber })
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400) {
          alert(data.error);
        }
      } else {
        const data = await response.json();
        console.log(data);
        if (data && data.companyRecord) {
          setCompanyDetails(data.companyRecord);
        }
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  };

  const Registration = async (e) => {
    e.preventDefault();
    

  }

  return (

    <div className="container mt-5 mb-5 p-5 shadow-lg">

      <form className="row" onSubmit={handleSubmit} method='POST'>
        <div className="col-12 ">
          <div className="input-group mb-3 ">
            <input type="text" name="ticketNumber" className="form-control" placeholder="Enter Ticket Number" value={credentials.ticketNumber} onChange={handleChange} required />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="submit">Submit</button>
            </div>
          </div>
        </div>
      </form>

      <div className='card '>
        <div className='card-header'>
          <div className='card-title'>
            Company Details
          </div>
        </div>
        <div className='card-body'>
          <div className='row'>

            <div className='col-md-4'>
              <h6 className='text-success'>Company Name</h6>
              <p>{companyDetails.length > 0 ? companyDetails[0].name : ''}</p>
            </div>

            <div className='col-md-4'>
              <h6 className='text-success'>Code</h6>
              <p>{companyDetails.length > 0 ? companyDetails[0].code : ''}</p>
            </div>

            <div className='col-md-4'>
              <h6 className='text-success'>Email</h6>
              <p>{companyDetails.length > 0 ? companyDetails[0].email : ''}</p>
            </div>

            <div className='col-md-4'>
              <h6 className='text-success'>Contact No</h6>
              <p>{companyDetails.length > 0 ? companyDetails[0].mobile : ''}</p>

            </div>

            <div className='col-md-8'>
              <h6 className='text-success'>Address</h6>
              <p>{companyDetails.length > 0 ? companyDetails[0].address : ''}</p>

            </div>

          </div>
        </div>
      </div>

      <div class=" mt-3 card card-body ">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h2 class="mb-4">Registration Form</h2>
            <form method='POST' onSubmit={Registration}>
              <div class="mb-3">
                <label htmlFor="fullName" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="fullName" name="fullName" value={credentials.fullName} onChange={handleChange} required />
              </div>
              <div class="mb-3">
                <label htmlFor="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} required />
              </div>
              <div class="mb-3">
                <label htmlFor="mobile" class="form-label">mobile No</label>
                <input type="text" class="form-control" id="mobile" name="mobile" value={credentials.mobile} onChange={handleChange} required />
              </div>
              <div class="mb-3">
                <label htmlFor="address" class="form-label">Address</label>
                <textarea class="form-control" id="address" name="address"  placeholder='Address' rows={3} value={credentials.address} onChange={handleChange} required/>
              </div>
              <div class="mb-3">
                <label htmlFor="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} required />
              </div>
              <div class="mb-3">
                <label htmlFor="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required value={credentials.confirmPassword} onChange={handleChange} />
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;