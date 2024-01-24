import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

const DataTable = ({ data }) => {
    const tableRef = useRef();

    useEffect(() => {
        const initializeDataTable = () => {
            // Destroy existing DataTable instance if it exists
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }

            // Initialize DataTable
            $(tableRef.current).DataTable({
                data: data,
                columns: [
                    { title: 'ID', data: '_id' },
                    { title: 'Name', data: 'name' },
                    { title: 'Address', data: 'address' },
                    { title: 'Email', data: 'email' },
                    { title: 'Mobile', data: 'mobile' },
                    // Add more columns as needed
                    {
                        title: 'Actions',
                        render: function (data, type, row) {
                            return `
                              <button class="btn btn-sm btn-primary" onclick="handleEdit('${row._id}')">Edit</button>
                              <button class="btn btn-sm btn-danger" onclick="handleDelete('${row._id}')">Delete</button>
                            `;
                        },

                    },
                ],
            });
        };

        // Initialize DataTable when the component mounts
        initializeDataTable();       

        // Return a cleanup function to destroy DataTable on component unmount
        return () => {
            const dataTableInstance = $(tableRef.current).DataTable();
            dataTableInstance.destroy();
        };

    }, [data]);

    return (
        <div className="table-responsive-sm">
            <table ref={tableRef} className="table table-striped table-bordered" width={'100%'}></table>
        </div>
    );
};

export default DataTable;
