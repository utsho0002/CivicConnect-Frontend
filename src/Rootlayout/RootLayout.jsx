import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/DashBoard/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-11/12 mx-auto'>
                <Outlet></Outlet>
            </div>       
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;