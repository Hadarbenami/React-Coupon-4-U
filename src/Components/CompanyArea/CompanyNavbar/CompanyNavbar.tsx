import "./CompanyNavbar.css";

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CompanyDetails from "../CompanyDetails/CompanyDetails";
import CompanyCoupons from "../CompanyCoupons/CompanyCoupons";
import { useNavigate } from "react-router-dom";


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
            <Box sx={{ p: 3 }}>
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
    
      // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      //   setValue(newValue);
      // };
      const navigate = useNavigate(); // Add this line

      
    
      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        // Add the following lines to handle navigation
        if (newValue === 0) {
          navigate("company/getCompanyCoupons"); // Replace "/details" with the actual path you want to navigate to
        } else if (newValue === 1) {
          navigate("company/getCompanyDetails"); // Replace "/coupons" with the actual path you want to navigate to
        }
      };
    
      return (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Coupons" {...a11yProps(0)} style={{
              color: value === 0 ? 'purple' : '#483248'}}/>
              <Tab label="Details" {...a11yProps(1)} style={{
              color: value === 1 ? 'purple' : '#483248'}} />
            </Tabs>
          </Box>
          {/* <CustomTabPanel value={value} index={0}>
            <CompanyDetails/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CompanyCoupons/>
          </CustomTabPanel> */}
        </Box>
        
      );
    }




