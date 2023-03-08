import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FirstLayer } from '../components/FirstLayer';
import { SecondLayer } from './../components/SecondLayer';

export const MyRoutes = ({name, clan}) => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    
                    <Route path="/" element={''} />
                    <Route path="/imageTranformer" element={<SecondLayer name1={name} clan1={clan} />} />
                </Routes>
                <h1>{name + " " + clan}</h1>

            </BrowserRouter>
        </div>
    )
}
