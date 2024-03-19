import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../admin/container/Products/Products';
import Layout from '../admin/component/Layout/Layout';
// import { Reviews } from '@mui/icons-material';
import Reviews from '../admin/container/Reviews/Reviews';


function AdminRoutes(props) {
    return (

        <Layout>
            <Routes>
                <Route exact path='/Product' element={<Products />} />
                <Route exact path='/Review' element={<Reviews />} />
            </Routes>
        </Layout>

    );
}

export default AdminRoutes;