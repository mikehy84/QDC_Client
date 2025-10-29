import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SD_Roles } from '../../Utility/StaticDetails';
import { IUser } from '../../shared/interfaces/IUser';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';
import { useRegisterUserMutation } from '../../Api/AuthApi';
import IApiResponse from '../../shared/interfaces/IApiResponse';
import loadingGif from "../../shared/style/images/addLoadingGif.gif"
import toastNotify from '../../Helper/ToastNotify';
import { Recaptcha } from '../../shared/components/Recaptcha';
import ReCAPTCHA from 'react-google-recaptcha';


interface Props {
    verified: boolean
    setVerified: React.Dispatch<React.SetStateAction<boolean>>
    captchaRef: React.RefObject<ReCAPTCHA>
}

export const Register = ({ verified, setVerified, captchaRef }: Props) => {

    const navigate = useNavigate();
    const userInfo: IUser = useSelector((state: RootState) => state.userAuthStore);
    const [loading, setLoading] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [newUser, setNewUser] = useState<IUserRegister>(() => {
        return {
            fullName: "",
            phoneNumber: "",
            email: "",
            password: "",
            role: "employee"
        }
    });

    // const [defaultRole, setDefaultRole] = useState(SD_Roles.EMPLOYEE);
    // const handleDefaultRole = (evt: any) => {
    //     setDefaultRole(evt.target.value);
    //     setNewUser(() => {
    //         return { ...newUser, role: evt.target.value }
    //     });
    // }

    const handleChange = (evt: React.ChangeEvent<HTMLSelectElement & HTMLInputElement>) => {
        const target = evt.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setNewUser(() => {
            return { ...newUser, [name]: value }
        });
    };

    const [registerUser] = useRegisterUserMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (newUser.password !== confirmPass) {
            // toastNotify("Passwords are not match!", "error");
            console.log("Passwords are not match!")
            setLoading(false);
            return;
        };

        const response: IApiResponse = await registerUser(newUser);
        if (response.data) {
            // console.log(response.data);
            setNewUser(
                { fullName: "", phoneNumber: "", email: "", password: "", role: "" }
            );
            setConfirmPass("");
            navigate("/login");
            toastNotify("Registeration was successfull");
            // console.log("Registeration was successfull");


        } else if (response.error) {
            toastNotify(response.error.data.errorMessages[0], "error");
            // console.log(response.error.data.errorMessages[0]);
            // console.log(response);
        };

        setLoading(false);
    };

    return (
        <div className='register-page'>
            <div className='container'>
                <form method="post" className="register-form" onSubmit={handleSubmit}>
                    <Link to="/" className='closeX'>X</Link>
                    <h3 className="list-title" style={{ marginTop: "0" }}>Register</h3>
                    <input
                        type="text"
                        name='fullName'
                        className="register-in"
                        placeholder="Enter Full Name"
                        required
                        value={newUser.fullName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name='phoneNumber'
                        className="register-in"
                        placeholder="Enter Phone Number"
                        required
                        value={newUser.phoneNumber}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name='email'
                        className="register-in"
                        placeholder="Enter Email-Adrress"
                        required
                        value={newUser.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name='password'
                        className="register-in"
                        placeholder="Enter Password"
                        required
                        value={newUser.password}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name='confirmPass'
                        className="register-in"
                        placeholder="Confirm Password"
                        required
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />

                    {/* <label htmlFor="">{ newUser?.role}</label> */}
                    {userInfo.role === SD_Roles.OWNER ? (
                        <select
                            className="register-in"
                            name='role'
                            // defaultValue={newUser?.role}
                            onChange={handleChange}
                        >
                            <option >--Select Role--</option>
                            <option value={`${SD_Roles.OWNER}`}>Owner</option>
                            <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                            <option value={`${SD_Roles.EMPLOYEE}`}>Employee</option>
                            <option value={`${SD_Roles.VIEWER}`}>Viewer</option>
                        </select>
                    ) : null }

                    <Recaptcha setVerified={setVerified} captchaRef={captchaRef} />
                    {loading ? (
                        <img src={loadingGif} className="list-btn" style={{ marginRight: "0" }} />
                    ) : (
                        <div className='typ-item-btnBox' style={{ justifyContent: 'center', gap: '1rem' }}>
                            <button onClick={() => navigate(-1)} className="typ-item-btn btnSecondary"> Back </button>
                            <button type="submit" className="typ-item-btn btnPrimary" style={{ flexGrow: "1" }}> Submit </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
