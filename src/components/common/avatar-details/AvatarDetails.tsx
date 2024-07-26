import {   Avatar, Flex } from 'antd'
import avatarImg from '../../../assets/images/dashboard/avatar.png'
// import exportIcon from '../../../assets/images/dashboard/Icon.svg'
import { IUser } from '../../../types/data'

interface ProfileSectionProps {
  user: IUser
}
const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  // console.log(user)
  return (
    <div className='bg-dark-blue relative flex w-full rounded-xl p-6 dark:border dark:border-white'>
      <Avatar size={198} src={avatarImg} className='mx-8' />
      <div className='mt-4 rounded-full'>
        <Flex align='center'>
          <h2 className=' mr-2 text-3xl text-white'>{user?.firstName} {user?.lastName}</h2>
          {/* <Badge
            count={user.label}
            style={{ backgroundColor: 'white', color: 'black' }}
          /> */}
        </Flex>

        <div className='mt-2 text-[#C5C5C5]'>
          {/* <p>Client ID: {user.clientId} </p> */}
          <p>Email - {user?.email}</p>
          <p>Contact - {user?.phoneNumber} </p>
          <p>Occupation: {user?.occupation || "N/A"} </p>
        </div>
      </div>
      {/* <Button className='absolute right-5 top-5 h-10 px-4 rounded-lg' icon={<img src={exportIcon} />}>Export</Button> */}
    </div>
  )
}

export default ProfileSection
