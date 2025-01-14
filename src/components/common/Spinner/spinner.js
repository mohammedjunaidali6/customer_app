import Spinner from 'react-spinner-material';
import React, { Component } from 'react';
import './spinner.css';

export default function Loader(props) {
    return (
        <div style={{ display: props.show ? 'block' : 'none' }} className='spinner_overlay'>
            <Spinner className='spinner' radius={40} color={"#007BFF"} stroke={2} visible={true} />
        </div>
    );
}