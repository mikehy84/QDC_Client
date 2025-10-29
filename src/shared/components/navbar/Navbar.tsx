import { Fragment, useState } from "react";
import cwsLogo from "../../style/images/logo/from QDC/qdc_logo.png"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import toastNotify from "../../../Helper/ToastNotify";
import { setLoggedInUser, userState } from "../../../Redux/UserAuthSlice";





export const Navbar = () => {

    const [burger, setBurger] = useState(false);
        const handleBurger = () => {
        setBurger(!burger);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("_grecaptcha");
        dispatch(setLoggedInUser({ ...userState }));
        navigate("/");
        setBurger(!burger);
        toastNotify("You are logged out successfully!");
        // console.log("You are logged out successfully!", "info");
    };

    const userInfo: IUser = useSelector((state: RootState) => state.userAuthStore);

    return (
        <nav>
            <img src={cwsLogo} />
            <div className="nav-menu">
                <Link className="nav-link" to="/">
                    home
                </Link>
                <Link className="nav-link" to="/about">
                    about us
                </Link>
                <Link className="nav-link" to="/service">
                    services
                </Link>
                <Link className="nav-link" to="/portfolio">
                    portfolio
                </Link>
                <Link className="nav-link" to="/ourteam">
                    our team
                </Link>
                <Link className="nav-link" to="/contact">
                    contact us
                </Link>

                {userInfo.id ? (
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <Link className="nav-link" to="/admin">
                            admin
                        </Link>
                        <Link className="nav-link" to="/" style={{color:"red"}} onClick={handleLogout}>
                            logout
                        </Link>
                    </div>
                ) : (
                    <Link className="nav-link" to="/login"  style={{display:'flex', flexDirection:'column'}}>
                        admin
                    </Link>
                )}

            </div>

            <div className={!burger ? "nav--burger-btn" : "nav--burger-btn open"} onClick={handleBurger}>
                <div id="burger" className="nav--burger"></div>
            </div>
            {burger ? (
                <div id="burger--list" className="burger--list">

                    <Link className="burger--link" to="/" onClick={() => setBurger(!burger)} >home</Link>
                    <Link className="burger--link" to="/about" onClick={() => setBurger(!burger)} >about us</Link>
                    <Link className="burger--link" to="/service" onClick={() => setBurger(!burger)} >services</Link>
                    <Link className="burger--link" to="/portfolio" onClick={() => setBurger(!burger)} >portfolio</Link>
                    <Link className="burger--link" to="/ourteam" onClick={() => setBurger(!burger)} >our team</Link>
                    <Link className="burger--link" to="/contact" onClick={() => setBurger(!burger)} > <span>contact us</span></Link>
                    {userInfo.id ? (
                        <>
                            <Link className="burger--link" to="/admin" onClick={() => setBurger(!burger)}>
                                admin
                            </Link>
                            <Link className="burger--link" to="/" style={{ backgroundColor:'var(--Gray-7)'}} onClick={handleLogout}>
                                logout
                            </Link>
                        </>
                    ) : (
                        <Link className="burger--link" to="/login" onClick={() => setBurger(!burger)}>
                            admin
                        </Link>
                    )}
                    <img src={cwsLogo} style={{ margin: '5rem 0'}} />

                    <div className="footer" style={{marginBottom:'auto', marginTop:'0', flexGrow:'1'}}>
                        <div className="info">
                            <div>
                                <h4  >Suite 219, 198 East Island Hwy <Link target='_blank' to="https://parksvilledowntown.ca/">Parksville,</Link>  BC, Canada</h4>
                                <h4>
                                    <a href="tel:+1250586-1914">(250)586-1914</a>
                                </h4>
                                <h4>
                                    <a href="mailto:general@qualitydraftingco.com">general@qualitydraftingco.com</a>

                                </h4>
                            </div>
                            <div>
                                <small> Copyright (C) 2022 - all rights reserved </small>
                                <small>
                                    Site By &nbsp;
                                    <a href="https://ezcode.ca" target="_blank">EZcode</a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </nav>
    )
}
