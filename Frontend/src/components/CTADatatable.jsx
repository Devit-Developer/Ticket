import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

const CTADatatable = ({ data }) => {
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
                  { title: 'Company', data: 'company' },
                  { title: 'Start Number', data: 'startNumber' },
                  { title: 'End Number', data: 'endNumber' },
                  { title: 'Coin', data: 'coin' },
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
          <table ref={tableRef} className="table table-striped table-bordered table-responsive" width={'100%'}></table>
      </div>
  );
};


export default CTADatatable