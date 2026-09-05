import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime"

interface PublicRouteProps {
    children: JSX.Element
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const token = useSelector((state: any) => state.jwt)
    if (token) {
        const user:any=jwtDecode(token);
            console.log(user);
            //navigate('${user?.role?.toLowerCase}/dashboard');
        return <Navigate to={`/${user?.role?.toLowerCase()}/dashboard`} />
    }
    return children;
}

export default PublicRoute;


// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// interface PublicRouteProps {
//     children: React.ReactElement;
// }

// const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
//     const token = useSelector((state: any) => state.jwt);

//     if (token) {
//         return <Navigate to="/patient/dashboard" replace />;
//     }

//     return children;
// };

// export default PublicRoute;