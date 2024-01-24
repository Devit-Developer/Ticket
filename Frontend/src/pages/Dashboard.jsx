import React from 'react';
import Layout from '../components/Layout';


const Dashboard = () => {
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>
                <div class="row">
                    <div class="col-lg-3 col-6 ">

                        <div class="small-box bg-info p-3 rounded shadow">
                            <div class="inner">
                                <h3>150</h3>
                                <p>Today Register</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">

                        <div class="small-box bg-success p-3 rounded shadow">
                            <div class="inner">
                                <h3>53</h3>
                                <p>Monthly Register</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6">

                        <div class="small-box bg-warning p-3 rounded shadow">
                            <div class="inner">
                                <h3>44</h3>
                                <p>Closing Ticket</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-6 rounded-box">

                        <div class="small-box bg-danger p-3 rounded shadow">
                            <div class="inner">
                                <h3>65</h3>
                                <p>Company</p>
                            </div>
                        </div>
                    </div>

                </div>
        </Layout>
    )
}

export default Dashboard