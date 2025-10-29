import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../../shared/components/footer/Footer";
import { Navbar } from "../../shared/components/navbar/Navbar";
import { HomePage } from "../home/HomePage";
import { Portfolio } from "../portfolio/Portfolio";
// import { motion as m } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Ourteam } from "../ourteam/Ourteam";
import { About } from "../about/About";
import { Service } from "../services/Service";
import { Contact } from "../contact/Contact";
import { AdPortfolioPage } from "../admin/adPortfolio/AdPortfolioPage";
import { AdTeamPage } from "../admin/adTeam/AdTeamPage";
import { Register } from "../register/Register";
import { Login } from "../login/Login";
import { IUser } from "../../shared/interfaces/IUser";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser, userState } from "../../Redux/UserAuthSlice";
// import { ToastContainer } from "react-toastify";
import { NotFoundPage } from "../auth/NotFoundPage";
import { AccessDenied } from "../auth/AccessDenied";
import  AuthenticationTest from "../auth/AuthenticationTest";
import AuthenticationTestAdmin from "../auth/AuthenticationTestAdmin";
import AdminPanel from "../admin/AdminPanel";
// import { RootState } from "../../Redux/Store";
// import toastNotify from "../../Helper/ToastNotify";
import ReCAPTCHA from "react-google-recaptcha";


function Main() {

  /// defining a variablle for ReCAPTCHA
  const captchaRef = useRef<ReCAPTCHA>(null);

  // defining defining a variablle to sitekey is verified or not
  const [verified, setVerified] = useState(() => {
    return false;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const localToken = sessionStorage.getItem("token");
    if (localToken) {
      const { id, fullName, email, role }: IUser = jwt_decode(localToken);
      dispatch(setLoggedInUser({ id, fullName, email, role }));
    }
  },[])

  const [motion, setMotion] = useState({
        initial: {y: "-100%" },
        animate: { y: "0%" },
        transition: {duration: 0.5, ease:"easeInOut"},
        exit: { y: "0%", opacity: 0},
    });
  const location = useLocation();

  // const userInfo: IUser = useSelector((state: RootState) => state.userAuthStore);
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   sessionStorage.removeItem("token");
  //   sessionStorage.removeItem("_grecaptcha");
  //   dispatch(setLoggedInUser({ ...userState }));
  //   navigate("/");
  //   toastNotify("You are logged in successfully!");
  //   console.log("You are logged out successfully!", "info");
  // };


  return (
    <>
      {/* {userInfo.id ? (
        <a className="login-link" onClick={handleLogout}>
          Logout
          <i className="bi bi-chevron-compact-up"></i>
        </a>
      ) : (
        <Link className="login-link" to='login'>
          Login
          <i className="bi bi-chevron-compact-down"></i>
        </Link>
      )} */}
      <Navbar />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="" element={<HomePage />} />
          <Route path="about" element={<About motion={motion} />} />
          <Route path="service" element={<Service motion={motion} />}/>
          <Route path="contact" element={<Contact motion={motion} />}/>
          <Route path="portfolio" element={<Portfolio motion={motion} />}/>
          <Route path="ourteam" element={<Ourteam motion={motion} />} />

          <Route path="*" element={<NotFoundPage />} />

          <Route path="access-denied" element={<AccessDenied />} />
          <Route path="authentication" element={<AuthenticationTest />} />
          <Route path="authorization" element={<AuthenticationTestAdmin />} />

          <Route path="register" element={<Register verified={verified} setVerified={setVerified} captchaRef={captchaRef} />} />
          <Route path="login" element={<Login verified={verified} setVerified={setVerified} captchaRef={captchaRef} />} />
          <Route path="admin" element={<AdminPanel />} >
            <Route path="portfolio" element={<AdPortfolioPage />} />
            <Route path="team" element={<AdTeamPage  />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default Main;
