import React, { useEffect } from "react";
import { Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { withStyles } from '@mui/styles';
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/task";
import { useToasts } from "react-toast-notifications";
import dayjs from "dayjs";


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: 4,
            minWidth: 230,
        }
    },
    formControl: {
        margin: 4,
        minWidth: 230,
    },
    smMargin: {
        margin: 4,
    }
})

const initialFieldValues = {
    title: '',
    description: '',
    isCompleted: '',
    dueDate: ''
    // bloodGroup: '',
    // address: ''
}


const UpdateTask = ({ classes, ...props }) => {
    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        if ('isCompleted' in fieldValues)
            temp.isCompleted = fieldValues.isCompleted !== "" ? "" : "This field is required."
        if ('dueDate' in fieldValues)
            temp.dueDate = fieldValues.dueDate ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            console.log(props.currentId)
            if (props.currentId == 0)
                props.createTask(values, onSuccess)
            else
                props.updateTask(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        console.log({ props })
        if (props.currentId != 0) {
            const value = { ...props.taskList.find(x => x.id == props.currentId) };
            console.log(1, { value })
            if (typeof value.dueDate === 'string') value.dueDate = dayjs(value.dueDate)
            console.log(2, { value })
            setValues({ ...value })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Create Task
            </Typography>
            <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            name="title"
                            variant="outlined"
                            label="Title"
                            value={values.title}
                            onChange={handleInputChange}
                            {...(errors.title && { error: true, helperText: errors.title })}
                        />
                        <TextField
                            name="description"
                            variant="outlined"
                            label="Description"
                            value={values.description}
                            onChange={handleInputChange}
                            {...(errors.description && { error: true, helperText: errors.description })}
                        />
                        <FormControl variant="outlined"
                            className={classes.formControl}
                            {...(errors.isCompleted && { error: true })}
                        >
                            <InputLabel ref={inputLabel}>Task Status</InputLabel>
                            <Select
                                name="isCompleted"
                                variant="outlined"
                                label="Status"
                                value={values.isCompleted}
                                onChange={handleInputChange}
                                labelWidth={labelWidth}
                            >
                                <MenuItem value="">Select Task Status</MenuItem>
                                <MenuItem value={false} >Pending</MenuItem>
                                <MenuItem value={true} >Done</MenuItem>
                            </Select>
                            {errors.isCompleted && <FormHelperText>{errors.isCompleted}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {/* <TextField
                            name="dueDate"
                            variant="outlined"
                            label="Due Date"
                            value={values.dueDate}
                            onChange={handleInputChange}
                            {...(errors.dueDate && { error: true, helperText: errors.dueDate })}
                        /> */}

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Due Date"
                                value={values.dueDate}
                                onChange={(date) => handleInputChange({ target: { name: 'dueDate', value: date } })}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        helperText={errors.dueDate}
                                        error={!!errors.dueDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>

                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.smMargin}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.smMargin}
                                onClick={resetForm}
                            >
                                Reset
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    taskList: state.task.list
})

const mapActionToProps = {
    createTask: actions.create,
    updateTask: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UpdateTask));