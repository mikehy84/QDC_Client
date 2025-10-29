import { Link, useNavigate } from "react-router-dom"
import { IUser } from "../../shared/interfaces/IUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { setLoggedInUser, userState } from "../../Redux/UserAuthSlice";
import toastNotify from "../../Helper/ToastNotify";


export const HomePage = () => {

  const userInfo: IUser = useSelector((state: RootState) => state.userAuthStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...userState }));
    navigate("/");
    toastNotify("You are logged in successfully!");
    console.log("You are logged out successfully!", "info");
  };

  return (
    <div className="home">
      <h1>Dedicated to Quality, <br />Service and Schedule.</h1>
      <div>
        <h3>We're Here for You</h3>
        <p>Strong business relationships and successful projects are built
          through open interactive lines of communication. The dedicated
          QDC staff ensure that every client's unique requirement are
          understood and addressed. <a className="read-more" href="/service" >Read More</a>
        </p>
      </div>

      {/* {userInfo.id ? ( */}
        {/* <a className="login-link" onClick={handleLogout}> */}
          {/* <p> ❯ </p> */}
          {/* Logout
          <i className="bi bi-chevron-compact-up"></i>
        </a> */}
      {/* ) : ( */}
        {/* <Link className="login-link" to='login'> */}
          {/* <p> ❮ </p> */}
          {/* Login */}
          {/* <i className="bi bi-chevron-compact-down"></i> */}
        {/* </Link> */}
      {/* )} */}
    </div>
  )
}
