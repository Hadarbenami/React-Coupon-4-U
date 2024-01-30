

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
import { GridCellParams } from '@mui/x-data-grid';
import Company from '../../../../Models/Comapny';
import { companyStore } from '../../../../Redux/OurStore';
import { NavLink, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip, colors } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

function createData(
  id: number,
  name: string,
  email: string,
  password: string,
  
) {
  return {
    id,
    name,
    email,
    password,
    
  };
}

function Row(props: { row: ReturnType<typeof createData>;  onDeleteClick: (customerId: number) => void;  onEditClick: (updatedCompany: Company) => void; }) {
  const { row, onDeleteClick, onEditClick } = props;
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [updatedCompany, setUpdatedCompany] = React.useState({ ...row });
  
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    onEditClick(updatedCompany);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedCompany({ ...row });
  };

  const handleFieldChange = (fieldName: keyof Company, value: string) => {
    setUpdatedCompany((prevCompany) => ({
      ...prevCompany,
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
        <TableCell >{row.name}</TableCell>
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
                    <TableCell>Name</TableCell>
                    <TableCell >Email</TableCell>
                    <TableCell >Password</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {editMode ? (
                    <TableRow>
                      <TableCell>
                        
                          {row.name}
                        
                      </TableCell>
                      <TableCell >
                        <TextField
                          id="email"
                          value={updatedCompany.email}
                          onChange={(e) =>
                            handleFieldChange('email', e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="password"
                          value={updatedCompany.password}
                          onChange={(e) =>
                            handleFieldChange('password', e.target.value)
                          }
                            />
                      </TableCell>
                    </TableRow>
                  ) : (
                  
                    <TableRow key={row.id}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell >{row.email}</TableCell>
                      <TableCell >{row.password}</TableCell>
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



export default function Copmanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [deleteCompanyId, setDeleteCompanyId] = useState<number | null>(null);
  
  useEffect(() => {
    adminService.getAllCompanies()
        .then(comp => setCompanies(comp))
        .catch(err => errorHandler.showError(err));

    companyStore.subscribe(() => {
        adminService.getAllCompanies()
            .then(comp => setCompanies(comp))
            .catch(err => errorHandler.showError(err));
      });
    }, []);

    const handleDeleteClick = (companyId: number) => {
      setDeleteCompanyId(companyId);
    };
  
    const handleConfirmDelete = () => {
      if (deleteCompanyId !== null) {
        adminService.deleteCompany(deleteCompanyId)
          .then(() => {
            toast.success("Company deleted!");
            setCompanies(prevCompany => prevCompany.filter(company => company.id !== deleteCompanyId));
          })
          .catch(err => errorHandler.showError(err))
          .finally(() => setDeleteCompanyId(null));
      }
    };
  
    const handleCancelDelete = () => {
      setDeleteCompanyId(null);
    };

    function handleEditClick(updatedCompany: Company) {
        adminService.updateCompany(updatedCompany)
          .then(() => {
            toast.success("Company updated!");
            
            adminService.getAllCompanies()
               .then(comp => setCompanies(comp))
              .catch(err => alert(err.message));
            
          })
          .catch(err => errorHandler.showError(err));
      }
    
  return (
    <>
    <div className="Companies">
    
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
          // {filteredCompanies.map((company) => (
            <Row
            key={company.id}
            row={company}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick} 
          />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={deleteCompanyId !== null} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this company?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
    <br /><br />
       <div style={{ textAlign: 'center'}}>
          <NavLink to={"/admin/addCompany"}>
            <Button variant="outlined">Add Company</Button>
          </NavLink>
        </div>
        <br /><br />
    </div>
   </>
  );
}











