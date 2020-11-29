import React from 'react';
import Navbar from './navbar';

const Layout = (props) => {
    return (
        <div className="container-fluid">
            <Navbar></Navbar>
            {props.children}
        </div>
    )
}

export default Layout;