import { Button, Dialog, DialogTitle, Input, ListItem } from "@mui/material";
import { useState } from "react";

const handleClose = () => {
    
};

export function Payment({amount,oid,open,setOpen}) {
    return (
        <Dialog onClose={handleClose} open={open} style={{borderRadius:'40px'}}>
              <DialogTitle>Pay {amount} and print</DialogTitle>
            <ListItem disableGutters>
        <Input value={amount}  style={{marginLeft:"10px",marginRight:"10px",width:"100%"}} type='text'  name='payment'/>
        </ListItem>
        <ListItem>
        <Button onClick={()=>{setOpen(false)}}  style={{marginLeft:"10px",marginRight:"10px",width:"100%"}} disabled={pay} className='btn btn-warning'>CONFIRM</Button>
        </ListItem>
        </Dialog>
    );
}