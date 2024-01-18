
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';
import Customer from '../../../../Models/Customer';
import adminService from '../../../../Services/AdminService';
import DeleteIcon from '@mui/icons-material/Delete';
import errorHandler from '../../../../Services/ErrorHandler';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Button, TextField, Tooltip } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { NavLink } from 'react-router-dom';

function createData(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  
) {
  return {
    id,
    firstName,
    lastName,
    email,
    password,
    
  };
}

function Row(props: { row: ReturnType<typeof createData>;  onDeleteClick: (customerId: number) => void; onEditClick: (updatedCustomer: Customer) => void; }) {
  const { row, onDeleteClick, onEditClick  } = props;
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [updatedCustomer, setUpdatedCustomer] = React.useState({ ...row });
  
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    onEditClick(updatedCustomer);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedCustomer({ ...row });
  };

  const handleFieldChange = (fieldName: keyof Customer, value: string) => {
    setUpdatedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [fieldName]: value,
    }));
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell >{row.firstName}</TableCell>
        <TableCell >{row.lastName}</TableCell>
        <TableCell >{row.email}</TableCell>
        <TableCell >
        <IconButton
            aria-label="delete"
            onClick={() => onDeleteClick(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>

        <TableCell  >
          {editMode ? (
            <>
              <IconButton aria-label="save" onClick={handleSaveClick}>
                <SaveAltIcon />
              </IconButton>
              <IconButton aria-label="cancel" onClick={handleCancelClick}>
                <HighlightOffIcon />
              </IconButton>
            </>
            
          ) : (
            
            <IconButton  aria-label="edit" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            
            
          )}
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Password</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {editMode ? (
                    <TableRow>
                    <TableCell>
                      <TextField
                        id="firstName"
                        value={updatedCustomer.firstName}
                        onChange={(e) => handleFieldChange('firstName', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="lastName"
                        value={updatedCustomer.lastName}
                        onChange={(e) => handleFieldChange('lastName', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="email"
                        value={updatedCustomer.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="password"
                        value={updatedCustomer.password}
                        onChange={(e) => handleFieldChange('password', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  ) : (
                  
                    <TableRow key={row.id}>
                      <TableCell align="left">{row.firstName}</TableCell>
                      <TableCell align="left">{row.lastName}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.password}</TableCell>
                    </TableRow>
                 )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect( () =>{
        adminService.getAllCustomers()
            .then(cust => setCustomers(cust))
            .catch(err => alert(err.massage));
            
    }, []);

    function handleDeleteClick(customerId: number) {
      adminService.deleteCustomer(customerId)
        .then(() => {
          toast.success("Customer deleted!");
          setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== customerId));
        })
        .catch(err => errorHandler.showError(err));
    }

    function handleEditClick(updatedCustomer: Customer) {
      adminService.updateCustomer(updatedCustomer)
        .then(() => {
          toast.success("Company updated!");
          
          adminService.getAllCustomers()
             .then(comp => setCustomers(comp))
            .catch(err => alert(err.message));
          
        })
        .catch(err => errorHandler.showError(err));
    }

    
  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <Row
            key={customer.id}
            row={customer}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick} 
          />
          
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    <br /><br />
    <div style={{ textAlign: 'center' }}>
          <NavLink to={"/admin/addCustomer"}>
            <Button  variant="outlined">Add Customer</Button>
          </NavLink>
        </div>
      <br /><br />
    </>
  );
}

