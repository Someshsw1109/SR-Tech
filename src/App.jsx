import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Navbar from "./components/core/Homepage/common/Navbar.jsx"
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from "./pages/ForgotPassword.jsx"
import VerifyOtp from "./pages/VerifyOtp";
import About from './pages/About.jsx'
import ContactUs from './pages/Contact.jsx'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Dashboard from "./pages/Dashboard.jsx";
import OpenRoute from './components/core/Auth/OpenRoute.jsx'
import PrivateRoute from "./components/core/Auth/PrivateRoute.jsx"
import MyProfile from "./components/core/Dashboard/MyProfile.jsx";
import Settings from "./components/core/Dashboard/Settings.jsx";
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses.jsx'
import Cart from "./components/core/Dashboard/Cart/index.jsx"
import { ACCOUNT_TYPE } from "../utils/constant.js";
import AddCourse from "./components/core/Dashboard/AddCourse/index.jsx";
import MyCourses from './components/core/Dashboard/MyCourses/MyCourses.jsx'
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse.jsx'
import Catalog from './pages/Catalog.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard.jsx";
import SearchCourse from './pages/SearchCourse.jsx'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails.jsx'
import AdminPanel from "./components/core/Dashboard/AdminPanel.jsx"

function App() {
  const user=useSelector((state)=>state.profile.user);
  console.log("account type:",user?.ACCOUNT_TYPE)
  console.log("instructor account type:",ACCOUNT_TYPE.INSTRUCTOR)
  const dispatch=useDispatch();
  
  return (
    <>
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar></Navbar>

      <Routes>
       <Route path='/' element={<Home/>}></Route>
       <Route path='/catalog/:catalog' element={<Catalog/>}></Route>
       <Route path="/about" element={<About />} />
       <Route path="/contact" element={<ContactUs />} />
       <Route path="/courses/:courseId" element={<CourseDetails />} />
       <Route path="/search/:searchQuery" element={<SearchCourse />} />
       <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
       <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
       />
       <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/verify-email" element={<VerifyOtp />} />


       <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          
        <Route path="dashboard/my-profile" element={<MyProfile />} />
        <Route path="dashboard/settings" element={<Settings />} />
          
        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses></EnrolledCourses>}></Route>
            </>
        )}

        {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/instructor" element={<InstructorDashboard />}/>

              {/* My-courses */}
              <Route path="dashboard/my-courses" element={<MyCourses></MyCourses>}/>
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse></EditCourse>}></Route>
            </>
        )}


         {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path='dashboard/admin-panel' element={<AdminPanel/>}></Route>
            </>
        )}
        </Route>
      </Routes>
      
    </div>
    </>
  )
}

export default App
