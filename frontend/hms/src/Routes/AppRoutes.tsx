import { BrowserRouter, Route, Routes } from "react-router-dom";
import Random from "../Components/Random1";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoutes";
import PatientDashboard from "../Layout/PatientDashboard";
import PatientProfilePage from "../Pages/Patient/PatientProfilePage";
import AdminDashboard from "../Layout/AdminDashboard";
import DoctorDashboard from "../Layout/DoctorDashboard";
import DoctorProfilePage from "../Pages/Doctor/DoctorProfilePage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

                <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<Random />} />
                    <Route path="/pharmacy" element={<Random />} />
                    <Route path="/patients" element={<Random />} />
                    <Route path="/doctors" element={<Random />} />
                </Route>

                <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>}>
                    <Route path="dashboard" element={<Random />} />
                     <Route path="profile" element={<DoctorProfilePage />} />
                    <Route path="pharmacy" element={<Random />} />
                    <Route path="patients" element={<Random />} />
                    <Route path="doctors" element={<Random />} />
                </Route>

                <Route path="/patient" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
                    <Route path="dashboard" element={<Random />} />
                    <Route path="profile" element={<PatientProfilePage />} />
                    <Route path="appointments" element={<Random />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;


// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Random from '../Components/Random1';
// import LoginPage from '../Pages/LoginPage';
// import RegisterPage from '../Pages/RegisterPage';
// import PublicRoute from './PublicRoute';
// import ProtectedRoute from './ProtectedRoutes';
// import PatientDashboard from '../Layout/PatientDashboard';
// import PatientProfilePage from '../Pages/Patient/PatientProfilePage';


// const AppRoutes = () => {
//     return (
//         <BrowserRouter>

//             <Routes>

//                 <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>}></Route>
//                 <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>}> </Route>

//                 <Route path='/patient' element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>}>
//                     <Route path='dashboard' element={< Random />} />
//                     <Route path='profile' element={<PatientProfilePage />} />
//                     <Route path='appointments' element={< Random />} />

//                 </Route>
//             </Routes>

//         </BrowserRouter>
//     )
// }

// export default AppRoutes


// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import Random from "../Components/Random1";
// import LoginPage from "../Pages/LoginPage";
// import RegisterPage from "../Pages/RegisterPage";
// import PublicRoute from "./PublicRoute";
// import ProtectedRoute from "./ProtectedRoutes";
// import PatientDashboard from "../Layout/PatientDashboard";

// const AppRoutes = () => {
//     return (
//         <BrowserRouter>
//             <Routes>

//                 <Route
//                     path="/"
//                     element={<Navigate to="/login" replace />}
//                 />

//                 <Route
//                     path="/login"
//                     element={
//                         <PublicRoute>
//                             <LoginPage />
//                         </PublicRoute>
//                     }
//                 />

//                 <Route
//                     path="/register"
//                     element={
//                         <PublicRoute>
//                             <RegisterPage />
//                         </PublicRoute>
//                     }
//                 />

//                 <Route
//                     path="/patient"
//                     element={
//                         <ProtectedRoute>
//                             <PatientDashboard />
//                         </ProtectedRoute>
//                     }
//                 >
//                     <Route
//                         path="dashboard"
//                         element={<Random />}
//                     />

//                     <Route
//                         path="profile"
//                         element={<Random />}
//                     />

//                     <Route
//                         path="appointments"
//                         element={<Random />}
//                     />
//                 </Route>

//                 <Route
//                     path="*"
//                     element={<Navigate to="/login" replace />}
//                 />

//             </Routes>
//         </BrowserRouter>
//     );
// };

// export default AppRoutes;
