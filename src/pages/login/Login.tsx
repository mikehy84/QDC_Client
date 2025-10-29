import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IUserLogin } from '../../shared/interfaces/IUserLogin';
import { useLoginUserMutation } from '../../Api/AuthApi';
import IApiResponse from '../../shared/interfaces/IApiResponse';
import { IUser } from '../../shared/interfaces/IUser';
import { setLoggedInUser } from '../../Redux/UserAuthSlice';
import loadingGif from "../../shared/style/images/addLoadingGif.gif";
import toastNotify from '../../Helper/ToastNotify';
import { Recaptcha } from '../../shared/components/Recaptcha';
import ReCAPTCHA from 'react-google-recaptcha';



interface Props {
    verified: boolean
    setVerified: React.Dispatch<React.SetStateAction<boolean>>
    captchaRef: React.RefObject<ReCAPTCHA>
}




export const Login = ({ verified, setVerified, captchaRef }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState<IUserLogin>({
        userName: "",
        password: ""
    });


    useEffect(() => {

        if (captchaRef.current !== null) {
            captchaRef.current.reset();
        }
        setVerified(false);
    }, [setVerified]);


    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const target = evt.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setLoginInfo(() => {
            return { ...loginInfo, [name]: value }
        });
    };


    const [LoginUser] = useLoginUserMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const response: IApiResponse = await LoginUser(loginInfo);
        if (response.data) {
            const { token } = response.data.result;
            sessionStorage.setItem("token", token);
            const { id, fullName, email, role }: IUser = jwt_decode(token);
            dispatch(setLoggedInUser({ id, fullName, email, role }));
            navigate("/admin");

            // console.log(response.data);
            setLoginInfo(
                { userName: "", password: "" }
            );
            toastNotify("You are logged in successfully!");
            // console.log("You are logged in successfully!");


            if (captchaRef.current !== null) {
                captchaRef.current.reset();
            }
            setVerified(false);


            setLoading(false);
            // window.location.reload();

        } else if (response.error) {
            toastNotify(response.error.data.errorMessages[0], "error");
            // console.log(response.error.data.errorMessages[0], "error");
            setError(response.error.data.errorMessages[0]);
        };

        setLoading(false);
    };

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        };
    };

    return (
        <div className='login-page'>
            <div className='container'>
                <form method="post" onSubmit={handleSubmit} className="register-form">
                    <Link to="/" className='closeX'>X</Link>
                    <h3 className="list-title" style={{ marginTop: "0" }}>Login</h3>
                    <input
                        type="text"
                        name='userName'
                        className="register-in"
                        placeholder="Enter Username"
                        required
                        value={loginInfo.userName}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name='password'
                        className="register-in"
                        placeholder="Enter Password"
                        required
                        value={loginInfo.password}
                        onChange={handleChange}
                        onKeyDown={handleEnter}
                    />

                    <Recaptcha setVerified={setVerified} captchaRef={captchaRef} />


                    {loading ? (
                        <img src={loadingGif} className="list-btn" style={{ marginRight: "0" }} />
                    ) : (
                        <div className='typ-item-btnBox' style={{ justifyContent: 'center', gap: '1rem' }}>
                            <button onClick={() => navigate(-1)} className="typ-item-btn btnSecondary"> Back </button>
                            <button type="submit" className="typ-item-btn btnPrimary" style={{ flexGrow: "1" }} > Login </button>
                        </div>
                    )}

                    {/* <div className='typ-item-btnBox' style={{ justifyContent: 'center', gap: '1rem' }}>
                        <p>Do not have an account?</p>
                        <Link to="/register" style={{ textDecoration: 'none' }}> Register </Link>
                    </div> */}


                </form>
            </div>
        </div>
    )
}
