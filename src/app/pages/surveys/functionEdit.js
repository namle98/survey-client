import React, { useEffect } from 'react'
import { Modal, Pagination, Button, Input } from "antd";
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment';


export default function Edit ( onChange, survey){
    useEffect(() => {
        const a =survey;
        console.log(JSON.stringify(a))
   });

    return(
        <div>
        </div>
    )
}