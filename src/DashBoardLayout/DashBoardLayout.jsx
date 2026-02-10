import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../Components/SideBar';

const DashBoardLAyout = () => {
    return (
        <div className=''>
        
           <div className='lg:flex gap-6'>
             <Sidebar ></Sidebar>
             <div className='w-full'>
                <Outlet></Outlet>
             </div>
            
           </div>
        </div>
    );
};

export default DashBoardLAyout;