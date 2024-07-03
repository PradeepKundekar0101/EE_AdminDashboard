import { Layout, Badge, Avatar, Flex, Button } from 'antd'
import avatarImg from '../../../assets/images/dashboard/avatar.png'
import exportIcon from '../../../assets/images/dashboard/Icon.svg'


interface User {
  avatar: string
  name: string
  label: string
  clientId: string
  email: string
  contact: string
  lastLogin: string
}

interface ProfileSectionProps {
  user: User
}
const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  return (
    <div className='bg-[#262633] relative flex items-center w-full rounded-xl p-6'>
      <Avatar size={198} src={avatarImg} className='mx-8' />
      <div className='mt-4 rounded-full'>
        <Flex align='center'>
          <h2 className=' mr-2 text-3xl text-white'>{user.name}</h2>
          <Badge
            count={user.label}
            style={{ backgroundColor: 'white', color: 'black' }}
          />
        </Flex>

        <div className='mt-2 text-[#C5C5C5]'>
          <p>Client ID: {user.clientId} </p>
          <p>Email - {user.email}</p>
          <p>Contact - {user.contact} </p>
          <p>Last Login: {user.lastLogin} </p>
        </div>
      </div>
      <Button className='absolute right-5 top-5 h-10 px-4 rounded-lg' icon={<img src={exportIcon} />}>Export</Button>
    </div>
  )
}

export default ProfileSection
