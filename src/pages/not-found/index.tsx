import { HomeOutlined } from '@ant-design/icons';
import NotFound from '../../assets/no-domain.png'
import CustomButton from '../../components/ui/button/Button';
const index = () => {
  return (
    <div className="flex items-center justify-between min-h-screen max-w-4xl mx-auto">
    <div className="p-6 bg-white shadow-md rounded-md text-left">
      <p className="text-lg text-gray-600 mb-4">Oops! Page Not found</p>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">404</h1>
      <CustomButton type="primary" icon={<HomeOutlined />} href="/" className='bg-dark-teal hover:bg-gray-700'>
        Home
      </CustomButton>
    </div>
    <div className="ml-10">
      <img 
        src={NotFound}
        alt="Page Not Found Illustration"
        // className="max-w-xs"
      />
    </div>
  </div>
  )
}

export default index