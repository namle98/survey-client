/* eslint-disable no-restricted-imports */
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    }
}))

const CheckboxDemo = (props) => {
    const classes = useStyles()
    const [inputFields, setInputFields] = useState([
        { question: '', answer: '', isQuesion: true },
    ]);
    let data = [];
    const [checkboxData, setCheckboxData] = useState([]);


    const handleSubmit = (e) => {

        e.preventDefault();
        inputFields.forEach((item, i) => {
            if (item.isQuesion) {
                data.push(
                    <div>
                        <h2 for="male">{item.question}</h2>
                    </div>)
            } else {
                data.push(
                    <div><input type="radio" id="male" name="gender" value="male" />
                        {"  "}<label for="male">{item.answer}</label>
                    </div>)
            }

        });
        setCheckboxData(data);

    };

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { question: '', answer: '', isQuesion: false }])
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }
    const handleAddQuesion = () => {
        setInputFields([...inputFields, { question: '', answer: '', isQuesion: true }])
    }

    return (
        <Container>
            {checkboxData}
            <form className={classes.root} onSubmit={handleSubmit}>
                {inputFields.map((inputField, index) => (
                    <div key={index}>
                        {
                            inputField.isQuesion === true &&

                            <TextField
                                name="question"
                                label="Câu hỏi"
                                variant="filled"
                                style={{ width: '800px' }}
                                value={inputField.question}
                                onChange={event => handleChangeInput(index, event)}
                            />

                        }
                        {
                            inputField.isQuesion === false &&
                            <TextField
                                name="answer"
                                label="Câu trả lời"
                                style={{ width: '400px' }}
                                variant="filled"
                                value={inputField.answer}
                                onChange={event => handleChangeInput(index, event)}
                            />
                        }

                        <IconButton
                            onClick={() => handleRemoveFields(index)}
                        >
                            <RemoveIcon />
                        </IconButton>
                        {
                            inputField.isQuesion === true &&
                            <IconButton
                                onClick={() => handleAddFields()}
                            >
                                <AddIcon />
                            </IconButton>
                        }
                        {
                            inputField.isQuesion === false &&
                            <IconButton
                                onClick={() => handleAddQuesion()}
                            >
                                <AddIcon />
                            </IconButton>
                        }

                    </div>
                ))}
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<Icon>send</Icon>}
                    onClick={handleSubmit}
                >Send</Button>
            </form>
        </Container>
    );
};
export default CheckboxDemo;
