import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from "moment"

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function DateAndTimePickers(props) {
    let date;
    if (props.defaultDate) {
        date = props.defaultDate;
    }
     const classes = useStyles();
    if (props.defaultDate) {
         date = props.defaultDate
    }
 
     const [dateTime, setDateTime] = useState();
     useEffect(() => {
        setDateTime(moment(date).format('YYYY-MM-DDThh:mm'))

    }, [date]
    )
 
    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                type="datetime-local"
                value={dateTime}
                disabled={false}
                className={classes.textField}
                onChange={(e) => {
                    setDateTime(e.target.value)
                    props.changeDate(e.target.value)
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}
export default DateAndTimePickers