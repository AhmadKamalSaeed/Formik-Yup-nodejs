import React from 'react';
import { Link } from 'react-router-dom';

import {
    Button
} from '@material-ui/core';


const AdminLayout = (props) => {
    return(
        <>
            <div className="row adminLayout">
                <nav className="col-md-2 d-none d-md-block sidebar">
                    <div>
                            <Button variant="contained"
                        className="mt-3"
                        color="primary"
                        size="small"
                        >
                            
                                <Link style={{ textDecoration:'none', color:'white' }} to={`/`}>
                                    Back
                                </Link>
                            </Button>
                        
                    </div>
                </nav>

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                        <h1 className="h2">{props.section}</h1>
                    </div>
                        {props.children}
                </main>
            </div>
        </>
    )
}

export default AdminLayout;