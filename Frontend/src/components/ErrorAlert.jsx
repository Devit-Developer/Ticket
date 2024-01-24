import React from 'react';

const ErrorAlert = ({ errorMessage }) => {
    return (
        <div className="alert alert-danger alert-dismissible" role="alert">
            <ul>
                {errorMessage.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
};

export default ErrorAlert;
