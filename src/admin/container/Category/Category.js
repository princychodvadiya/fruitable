import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';

export default function FormDialog() {

    const [open, setOpen] = React.useState(false);
    const [data, setdata] = useState([]);
    const [update, setupdate] = useState(null);

    const columns = [
        { field: 'category', headerName: 'Name' },
        { field: 'description', headerName: 'Description' },
        {
            field: 'delete', headerName: 'Delete',
            renderCell: (params) => (
                <DeleteIcon onClick={() => handleDelete(params.row.id)} />
            ),
        },
        {
            field: 'edit', headerName: 'Edit',
            renderCell: (params) => (
                <EditIcon onClick={() => handleEdit(params.row)} />
            ),
        }
    ];

    const handleDelete = (id) => {
        // console.log(id);
        let localData = JSON.parse(localStorage.getItem('category'));

        localData = localData.filter((v) => v.id !== id);
        // console.log(localData);
        localStorage.setItem('category', JSON.stringify(localData))
        getdata()
    }

    const handleUpdate = (data) => {
        let localdata = JSON.parse(localStorage.getItem('category'));
        let index = localdata.findIndex(v => v.id === data.id)
        localdata[index] = data;
        localStorage.setItem("category", JSON.stringify(localdata))
        getdata();
    }

    let CategorySchema = object({
        category: string().required("please enter name"),
        description: string().required("please enter description")
    });

    const getdata = () => {
        let localData = JSON.parse(localStorage.getItem('category'));

        if (localData) {
            setdata(localData)
        }
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
        onSubmit: (values, { resetForm }) => {
            if (update) {
                handleUpdate(values);
            } else {
                handleAdd(values);
            }
            resetForm()
            // handleAdd(values)
            handleClose();
        },
    })

    const { handleSubmit, handleChange, handleBlur, errors, values, touched, setValues } = formik;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAdd = (data) => {
        console.log(data);
        const rNo = Math.floor(Math.random() * 1000)

        let localData = JSON.parse(localStorage.getItem("category"));
        if (localData) {
            localData.push({ ...data, id: rNo });
            localStorage.setItem('category', JSON.stringify(localData))

        } else {
            localStorage.setItem('category', JSON.stringify([{ ...data, id: rNo }]));
        }
        getdata()
    }

    const handleClose = () => {
        setOpen(false);
        formik.resetForm(data)
        setupdate(null)
        // handleClickOpen()
    };

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data)
        setOpen(true);
        setupdate(data);
        // formik.resetForm();
        // handleClickOpen();
    }

    return (
        <div>
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
                                <Button type="submit">{update ? 'update' : 'add'}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}