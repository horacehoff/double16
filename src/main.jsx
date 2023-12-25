import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Home.jsx'
import './index.css'
import "./main.css"
import Navbar from "./Navbar.jsx";
import Explore from "./Explore.jsx";
import CodePage from "./CodePage.jsx";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import AccountPage from "./AccountPage.jsx";
import Search from "./Search.jsx";
import ResetPassword from "./ResetPassword.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/explore" element={<Explore/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/code" element={<CodePage/>}/>

                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>

                <Route path="/user" element={<AccountPage/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
