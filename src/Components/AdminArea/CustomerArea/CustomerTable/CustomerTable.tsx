import "./CustomerTable.css";
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Customer from "../../../../Models/Customer";

interface CustomerProps{
    customer: Customer;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130},
  {field: 'password', headerName: 'Password', width: 130},
];



export default function CustomerTable(props: CustomerProps): JSX.Element {
    const rows = [
        { id: props.customer.id, lastName: props.customer.lastName, 
            firstName: props.customer.firstName, email: props.customer.email, password: props.customer.password}
     
      ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
