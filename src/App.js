import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import { RTPFooter } from './RTPFooter';
import { Box, Button, FormControlLabel, Input, Radio, RadioGroup, Typography } from '@mui/material';

import QrReader from 'react-qr-scanner';
import {v4} from 'uuid';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Payment } from './Payment';

function SimpleDialog(props) {
  const [pay,setPay]=useState(true);
  const [val,setVal]=useState("");
  const [fileup,setFileup]=useState();
  const { onClose, selectedValue, open,email } = props;

  const filecount=(event)=>{
    setFileup(event.target.files[0]);
     console.log('here in filcount: ',fileup==undefined);
     var count=0;
    if(fileup) {
        const reader=new FileReader();
        reader.readAsBinaryString(new Blob([fileup]));
        reader.onloadend=()=>{
             count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
            console.log('Number of Pages in file :', count);
            const price=3*count;
            setVal(`${price}₹`);
            setPay(false);
        }
    }
  };

  const [openPay,setOpenPay]=useState(false);
  const makePayment=()=>{
    setOpenPay(true);
    setPay(false);
  };
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {

  };

  return (
    <Dialog onClose={handleClose} open={open} style={{borderRadius:'40px'}}>
      <DialogTitle>Pay and Rush</DialogTitle>
      <form id="data-form" style={{borderRadius:'5px',boxShadow:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
      <List sx={{ pt: 0 }}>

      <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
            <div class="upload-btn-wrapper">
  <button class="btn">Which file you gonna print?</button>
  <input type="file" name="myfile" onChange={filecount}/>
</div>
            </ListItemButton>
      </ListItem>
      <ListItem disableGutters key={email}>
      <ListItemText primary="" />
      </ListItem>
      <ListItem disableGutters>
        <Input style={{marginLeft:"10px",marginRight:"10px",width:"100%"}} type='number' placeholder='How many copies?' name='copies'></Input>
        </ListItem>
        <ListItem disableGutters>
        <RadioGroup style={{marginLeft:"10px",marginRight:"10px",width:"100%"}}
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="baw" control={<Radio />} label="Black and whitd Print (5/-)" /><br/>
    <FormControlLabel value="color" control={<Radio />} label="Colour Print (10/-)" />
  </RadioGroup>
        </ListItem>
        <ListItem>
          <Button onClick={()=>{makePayment()}}  style={{marginLeft:"10px",marginRight:"10px",width:"100%"}} disabled={pay} className='btn btn-warning'>Pay {val}  and Print</Button>
        </ListItem>

    <Payment amount={val} open={openPay}></Payment>
      </List>
      </form>
    </Dialog>
  );
}


function App() {
  const [scan,setScan]=useState(false);
  const [uid,setUid]=useState("");
  const [rurl,setruel]=useState("");
  const [open,setOpen]=useState(false);
  var data_scan=useRef("");
  var count_safe=useRef(0);
  const notify=(result)=>{
    if(result=="scanned" && count_safe.current==1)
    toast.success(`Hurray!!! With taking your order:${uid},Now upload to get the print and carry on`, {
      position: toast.POSITION.TOP_RIGHT, 
    })
  };
  const notifyfail=(result)=>{
    if(result=="scanned" && count_safe.current==1)
    toast.error(`Sorry!!! Something wrong with the server now. Please try again.`, {
      position: toast.POSITION.TOP_RIGHT,
    })
  };
  useEffect(()=>{
    let str=v4();
      let uir=`${new Date().getTime()}${str.substring(parseInt(Math.random()%(str.length-1)+1),parseInt(Math.random()%(str.length-1)+1))}`;
      setUid(uir);
    let datah=setInterval(()=>{console.log(`In use Effect:${count_safe.current}---${data_scan.current}--`);
    if(data_scan.current!="") {

      
      console.log(`Data scanned: ${data_scan.current}`)
      setScan(false);
    }
  },2000)
  },[ ]);
  const handleClick=() =>{setScan(true);count_safe.current=0;console.log(`Sanned: ${scan}`)};
  const handleScan=(data)=>{
    console.log(`Data: ${data?.text}`)
    if(data && data?.text && data?.text!="") {
      data_scan.current=data?.text;
      count_safe.current= count_safe.current+1;
      notify('scanned');
    } 
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div className="App">
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
      <style>{
        `header {
          background-color: purple;
        }`
      } </style>
      <header className="App-header">
        <img src="rtp.png" className="App-logo" alt="logo" />
        <p>
          Congratulations, <code>Atmanirbhars</code> <strong><code style={{fontFamily: "cursive"}}><PrintRoundedIcon/></code></strong> with no-crowd , no-share.
        </p>
        <h1><a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{textDecoration: 'none',fontFamily: "fantasy"}}
        >
          readyTO print
        </a>
        </h1>
      </header>
      <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "center"
      }}
    >
      <VerticalTimeline>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'orange', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  orange' }}

    iconStyle={{ background: 'orange', color: '#fff' }}
    icon={<DirectionsWalkRoundedIcon/>}
  >
    <h3 className="vertical-timeline-element-title" style={{fontFamily:'cursive'}}>Busy Time</h3>
    <h4 className="vertical-timeline-element-subtitle" style={{fontFamily:'fantasy'}}>Let's not bother dukan bhaiya</h4>
   {
    !scan ? 
    <p>
     <Button variant='outlined' onClick={handleClick} size='medium' style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',color:'white',border:'1px solid white'}}>Scan</Button> on the RTP QrCode  and keep your documents ready
    </p> : <p><QrReader
          delay={100}
          facingMode={"environment"}
          style={{
            height: 120,
            width: 200,
          }}
          onError={err=>{console.log(err);notifyfail("scanned");}}
          onScan={handleScan}
          />
          <p>Data:{data_scan.current}</p></p>
  }
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'blue', color: 'white',border:'1px solid white' }}
    contentArrowStyle={{ borderRight: '7px solid  blue' }}
    
    
    iconStyle={{ background: 'white', color: 'blue', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}
    icon={<CloudUploadRoundedIcon/>}
  >
    <h3 className="vertical-timeline-element-title" style={{fontFamily:'cursive'}}>One click away</h3>
    <h4 className="vertical-timeline-element-subtitle" style={{fontFamily:'fantasy'}}>Just upload requirements with any hustle</h4>
    {!data_scan.current.length ? <p>
      
        Upload your document to be printed with it's requirements
      
    </p> : <p>Dost, with <strong>Order ID: {uid}</strong> , <Button variant='outlined'  size='medium' onClick={()=>{setOpen(true)}} style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',color:'white',border:'1px solid white'}}>Place the order to print</Button> </p>
    }

<SimpleDialog
        selectedValue={0}
        open={open}
        email={uid}
        onClose={handleClose}
      />
    
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'green', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  green' }}
    
    
    iconStyle={{ background: 'green', color: '#fff' }}
    icon={<PrintRoundedIcon/>}
  >
    <h3 className="vertical-timeline-element-title" style={{fontFamily:'cursive'}}>Get your print</h3>
    <h4 className="vertical-timeline-element-subtitle" style={{fontFamily:'fantasy'}}>Pay and Print - Atmanirbhar customer . Really Great!!!</h4>
    <p>
       Get your order-id noted to collect the print out instant
    </p>
  </VerticalTimelineElement>
  </VerticalTimeline>
    </div>
    
    <RTPFooter/>
    </div>
  );
}

export default App;
