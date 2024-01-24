import React from 'react';
import Layout from '../components/Layout';
import CTADatatable from '../components/CTADatatable';

const CompanyTicketAssign = () => {
    const records = [{ _id: '1000', company: 'sfsdf', startNumber: 'sdf', endNumber: '', coin: 'sdf' }];

    window.handleEdit = (id) => {
        console.log(id);
    }
    window.handleDelete = (id) => {
        console.log(id);
    }
    return (
        <Layout>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Company Ticket Assign</h1>
            </div>
            <div className="card shadow">
                <div className='card-header'>
                    <div className='float-end'>
                        <button className='btn btn-primary'>Add new</button>
                    </div>
                </div>
                <div className='card-body'>
                    <CTADatatable data={records} handleEdit={handleEdit} handleDelete={handleDelete} />
                </div>
            </div>
        </Layout>
    )
}

export default CompanyTicketAssign