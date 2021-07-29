import React from "react";
import "./PageHeader.scss";
import { Link } from "react-router-dom";

function PageHeader() {
    return (
        <header className='header'>
            <div className='header__container'>
                <Link to='/' className='header__title'>
                    Clixologist
                </Link>
            </div>
        </header>
    );
}

export default PageHeader;
