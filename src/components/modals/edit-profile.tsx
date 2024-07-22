import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { EditOutlined } from '@ant-design/icons';
import useUpdateData from "../../hooks/useUpdateData";
import { updateuser } from '../../redux/slices/authSlice';

interface Props {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const EditProfile: React.FC<Props> = ({ isModalOpen, handleOk, handleCancel }) => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user)
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    occupation: user?.occupation || '',
    profileImage: null as File | null,
  });
  const [isChanged, setIsChanged] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { putData: updateProfile } = useUpdateData<FormData, any>('/user/profile-image');
  const { putData: updateDetails } = useUpdateData<Partial<typeof formData>, any>('/user/update/user-details');

  useEffect(() => {
    setIsChanged(
      formData.firstName !== user?.firstName ||
      formData.lastName !== user?.lastName ||
      formData.occupation !== user?.occupation ||
      formData.profileImage !== null
    );
  }, [formData, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfileImage = async () => {
    if(!user){
        return;
    }
    if (formData.profileImage) {
      const imageFormData = new FormData();
      imageFormData.append('profile', formData.profileImage);
      try {
        const {data} = await updateProfile(imageFormData);
        dispatch(updateuser({...user,profile_url_image:data.profile_image_url}))
        message.success('Profile image updated successfully');
      } catch (error) {
        message.error('Failed to update profile image');
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const { email, phoneNumber, profileImage, ...updateData } = formData;
      await updateDetails(updateData);
      message.success('Profile updated successfully');
      handleOk();
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  return (
    <Modal
      title="Edit your profile"
      open={isModalOpen}
      onOk={handleSaveChanges}
      okText="Save changes"
      onCancel={handleCancel}
      okButtonProps={{ disabled: !isChanged }}
    >
      <div className="p-4">
        <div className="relative w-32 h-32 mx-auto mb-4 border rounded-full p-2">
          <img
            src={previewImage || user?.profile_url_image || '/avatar.png'}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <label htmlFor="profileImage" className="absolute top-0 right-0 cursor-pointer">
            <EditOutlined className="text-blue-500 text-xl" />
          </label>
          <input
            type="file"
            id="profileImage"
            hidden
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        {formData.profileImage && (
          <Button onClick={handleUpdateProfileImage} className="mb-4">
            Update Profile Image
          </Button>
        )}
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="mb-2"
        />
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="mb-2"
        />
        <Input
          name="email"
          value={formData.email}
          readOnly
          placeholder="Email"
          className="mb-2"
        />
        <Input
          name="phoneNumber"
          value={formData.phoneNumber}
          readOnly
          placeholder="Phone Number"
          className="mb-2"
        />
        <Input
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          placeholder="Occupation"
          className="mb-2"
        />
      </div>
    </Modal>
  );
};

export default EditProfile;