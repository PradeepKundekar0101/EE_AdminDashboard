import { Route, Routes } from 'react-router-dom'

import CreateMentor from '../../../pages/form/CreateMentor'
import Questions from '../../../pages/questions/Questions'
import UserProfile from '../../../pages/user-profile/UserProfile'

const AuthenticatedLayout = () => {
  return (
    <div>
      <Routes>
        <Route path='/create-mentor' element={<CreateMentor />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/user-profile' element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default AuthenticatedLayout
