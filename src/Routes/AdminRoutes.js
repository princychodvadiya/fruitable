import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../admin/container/Products/Products';
import Layout from '../admin/component/Layout/Layout';
// import { Reviews } from '@mui/icons-material';
import Reviews from '../admin/container/Reviews/Reviews';
import Category from '../admin/container/Category/Category';
import Counter from '../admin/container/Counter/Counter';
import { Provider } from 'react-redux';
import { configStore } from '../redux/store';


function AdminRoutes(props) {
    const store = configStore()
    return (
        <Provider store={store}>
            <Layout>
                <Routes>
                    <Route exact path='/Product' element={<Products />} />
                    <Route exact path='/Review' element={<Reviews />} />
                    <Route exact path='/Category' element={<Category />} />
                    <Route exact path='/Counter' element={<Counter />} />
                </Routes>
            </Layout>
        </Provider>
    );
}

export default AdminRoutes;