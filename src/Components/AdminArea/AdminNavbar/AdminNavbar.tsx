import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
function CustomTabPanel(props: TabPanelProps): JSX.Element {
    const { children, value, index, ...other } = props;
   
    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        
        >
          {value === index && (
            <Box 
            sx={
              { p: 3 }
              }>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }
    
    function a11yProps(index: number) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    
    export default function BasicTabs() {
      const [value, setValue] = React.useState(0);
    
      const navigate = useNavigate(); // Add this line

      
    
      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        
        setValue(newValue);
        // Add the following lines to handle navigation
        if (newValue === 0) {
          navigate("admin/getAllCompanies"); // Replace "/details" with the actual path you want to navigate to
        } else if (newValue === 1) {
          navigate("admin/getAllCustomers"); // Replace "/coupons" with the actual path you want to navigate to
        }
      };
      return (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Companies" {...a11yProps(0)}  style={{
              color: value === 0 ? 'purple' : '#483248'}}/>
              <Tab label="Customers" {...a11yProps(1)}   style={{
              color: value === 1 ? 'purple' : '#483248'}}/>
            </Tabs>
           </Box>
          {/*<CustomTabPanel value={value} index={0} >
            {/* <Copmanies/> */}
          {/* </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Customers/>
          </CustomTabPanel>*/}
        </Box>  
      );
    }



{/* 
 // function AdminNavbar(): JSX.Element { 
 


  return(
   <div className="AdminNavbar">
       <NavLink to={"admin/getAllCompanies"}>Companies</NavLink>
       <NavLink to={"admin/getAllCustomers"}>Customers</NavLink>
   </div>
  );
 }

export default AdminNavbar; */}

