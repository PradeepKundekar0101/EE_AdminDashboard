// UserList.tsx
import React, { useState } from 'react';
import { List, Avatar, Input } from 'antd';
import { IUser } from '../../types/data';


interface UserListProps {
  onSelectUser: (userId: string) => void;
  traders: IUser[],
}

const UserList: React.FC<UserListProps> = ({ onSelectUser,traders }) => {

  const [searchTerm, setSearchTerm] = useState('');



  const filteredUsers = traders?.filter((user:IUser) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <List

        
        itemLayout="horizontal"
        dataSource={filteredUsers}
        renderItem={user => (
          <List.Item
            onClick={() => onSelectUser(user._id)}
            style={{ cursor: 'pointer' }}
          >
            <List.Item.Meta
              avatar={<Avatar src={user.profile_image_url} />}
              title={`${user.firstName} ${user.lastName}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UserList;