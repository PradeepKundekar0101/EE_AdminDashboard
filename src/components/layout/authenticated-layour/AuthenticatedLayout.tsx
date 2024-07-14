import { Route, Routes } from 'react-router-dom'

import CreateMentor from '../../../pages/form/CreateMentor'
import Questions from '../../../pages/questions/Questions'
import UserProfile from '../../../pages/user-profile/UserProfile'
import Mentors from '../../../pages/mentors/Mentors'
import AllUsers from '../../../pages/all-users/AllUsers'

const AuthenticatedLayout = () => {
  return (
    <div>
      <Routes>
        <Route path='' element={<h1>Home</h1>}></Route>
        <Route path='/create-mentor' element={<CreateMentor />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/mentors' element={<Mentors />} />
        <Route path='/users' element={<AllUsers />} />
      </Routes>
    </div>
  )
}

export default AuthenticatedLayout
