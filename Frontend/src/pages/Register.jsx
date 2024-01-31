import React, { useState } from 'react';

const Register = () => {
  const [credentials, setcredentials] = useState({ ticketNumber: "" })
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
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          alert(data.error);
        }
      }
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  };

  return (
    <div>


      <div className="container mt-5">
        <form className="row" onSubmit={handleSubmit} method='POST'>
          <div className="col-12">
            <div className="input-group mb-3">
              <input type="text" name="ticketNumber" className="form-control" placeholder="Enter Ticket Number" value={credentials.ticketNumber} onChange={handleChange} />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="submit">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Register;