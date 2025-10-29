import jwt_decode from "jwt-decode";
import { SD_Roles } from "../Utility/StaticDetails";

const withAdminAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const accessToken = sessionStorage.getItem("token") ?? "";
        if (accessToken) {
            const decode: {
                role: string;
            } = jwt_decode(accessToken);
            if (decode.role !== SD_Roles.OWNER) {
                window.location.replace("access-denied");
                return null;
            }
        }
        else {
            window.location.replace("login");
            return null;
        }
        return <WrappedComponent {...props} />
    }
}

export default withAdminAuth;