import { Route, Routes } from 'react-router-dom'
import Group from './Group'
import GroupCreator from './GroupCreator'
import GroupDetails from './GroupDetails'
import GroupSettings from './GroupSettings'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import NotFound from './NotFound'
import PostCreator from './PostCreator'
import Profile from './Profile'
import ProfileSettings from './ProfileSettings'
import SignUp from './SignUp'



export default function AppRoutes() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/profile/:id/settings' element={<ProfileSettings />} />
      <Route path='/post-creator' element={<PostCreator />} />
      <Route path='/group/:id' element={<Group />} />
      <Route path='/group/:id/settings' element={<GroupSettings />} />
      <Route path='/group/:id/details' element={<GroupDetails />} />
      <Route path='/group-creator' element={<GroupCreator />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}