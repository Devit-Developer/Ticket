import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [roles, setRoles] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleRegister = async () => {

    if (!username.trim() || !roles.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, roles, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 400) {
          setSuccessMessage('');
          setError(errorData.error);
        } else {
          setSuccessMessage('');
          setError('An error occurred during registration.');
        }
      } else {
        setError('');
        setUsername('');
        setRoles('');
        setPassword('');
        const successData = await response.json();
        setSuccessMessage(successData.message);
        // Do something for a successful registration, e.g., redirect to another page
      }
    } catch (error) {
      setSuccessMessage('');

      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      {/* Your form inputs go here */}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" value={roles} onChange={(e) => setRoles(e.target.value)} />

      {/* Display error message */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      {/* Submit button */}
      <button onClick={handleRegister}>Register</button>

      <main>
        <div className="container">

          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  <div className="card mb-3">

                    <div className="card-body">

                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                        <p className="text-center small">Enter your personal details to create account</p>
                      </div>

                      <form className="row g-3 ">

                        <div className="col-12">
                          <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Enter Ticket Number" aria-label="Enter Ticket Number" aria-describedby="basic-addon2" />
                            <div class="input-group-append">
                              <button class="btn btn-secondary" type="button">Submit</button>
                            </div>
                          </div>
                        </div>

                        <hr />
                        <div className="col-12">
                          <label className="form-label">Company Name</label>
                          <p></p>
                        </div>
                        <div className="col-12">
                          <label className="form-label">Address</label>
                          <p></p>
                        </div>
                        <hr />
                        <div className="col-12">
                          <label htmlFor="yourName" className="form-label">Your Name</label>
                          <input type="text" name="name" className="form-control" id="yourName" required />
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourEmail" className="form-label">Your Email</label>
                          <input type="email" name="email" className="form-control" id="yourEmail" required />
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">Username</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="text" name="username" className="form-control" id="yourUsername" required />
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">Password</label>
                          <input type="password" name="password" className="form-control" id="yourPassword" required />
                        </div>


                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit">Create Account</button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">Already have an account? <a href="pages-login.html">Log in</a></p>
                        </div>
                      </form>

                    </div>
                  </div>


                </div>
              </div>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
};

export default Register;