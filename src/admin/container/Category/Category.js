import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { json } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function FormDialog() {

    let CategorySchema = object({
        category: string().required("please enter name"),
        description: string().required("please enter description")

    });
    const [data, setdata] = useState([])

    const getdata = () => {
        let localData = JSON.parse(localStorage.getItem('category'));

        // localStorage.setItem("category", JSON.stringify(localData));
        // setdata(localData)
        if (localData) {
            setdata(localData)
        }
        console.log(localData);


    }

    useEffect(() => {
        getdata()
    }, [])
    const formik = useFormik({
        initialValues: {
            category: '',
            description: '',
        },
        validationSchema: CategorySchema,
        onSubmit: (values) => {
            handleAdd(values)
        },
    })

    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = formik;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (data) => {
        console.log(data);
        const rNo = Math.floor(Math.rendom * 1000);

        let localData = JSON.parse(localStorage.getItem("category"));
        if (localData) {
            localData.push({ ...data, id: rNo });
            localStorage.setItem('category', JSON.stringify(localData))

        } else {
            localStorage.setItem('category', JSON.stringify({ ...data, id: rNo }));
        }
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle>Category</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="category"
                            label="category"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category}
                            error={errors.category && errors.category ? true : false}
                            helperText={errors.category && touched.category ? errors.category : ''}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            name="description"
                            label="description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={errors.description && errors.description ? true : false}
                            helperText={errors.description && touched.description ? errors.description : ''}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">ADD</Button>
                        </DialogActions>
                    </DialogContent>

                </form>

            </Dialog>
        </React.Fragment>
    );
}