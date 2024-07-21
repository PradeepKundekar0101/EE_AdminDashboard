import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Button, List, Typography, message, Upload } from 'antd';
import { SendOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { useSupabase } from '../../context/supaBaseContext';
import { useAppSelector } from '../../redux/hooks';
import CustomLayout from '../../components/layout/custom-layout/CustomLayout';

const { TextArea } = Input;
// const { } = Typography;
const {  Content, Sider } = Layout;

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderProfile: string;
  createdAt: string;
  mediaUrl?: string;
}

const ChatPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const supabase = useSupabase();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [channel] = useState('global');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel(`chat:${channel}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const newMessage = payload.new as Message;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [channel, supabase]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('channel', channel)
      .order('createdAt', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === '' && !uploadedFile) return;

    let mediaUrl = '';

    if (uploadedFile) {
      const fileExt = uploadedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${channel}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-media')
        .upload(filePath, uploadedFile);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        message.error('Failed to upload file');
        return;
      }

      const { data } = supabase.storage.from('chat-media').getPublicUrl(filePath);
      mediaUrl = data.publicUrl;
    }

    const newMessage = {
      channel,
      content: inputMessage,
      senderId: user?._id || 'anonymous', // Allow anonymous user
      senderName: user ? `${user.firstName} ${user.lastName}` : 'Anonymous',
      senderProfile: user?.profile_url_image || '/avatar.png',
      mediaUrl,
    };

    const { error } = await supabase.from('messages').insert(newMessage);

    if (error) {
      console.error('Error sending message:', error);
      message.error('Failed to send message');
    } else {
      setInputMessage('');
      setUploadedFile(null);
    }
  };

  const handleFileUpload = (info: any) => {
    const file = info.file.originFileObj;
    setUploadedFile(file);
    message.success(`${file.name} ready to upload`);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    message.success('File removed');
  };

  return (
    <CustomLayout>
      <Layout style={{ height: '90vh' }}>
        <Sider width={200} theme="light" collapsible>
          <Menu
            mode="inline"
            defaultSelectedKeys={['global']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="global">Global Channel</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<img src={item.senderProfile} alt={item.senderName} style={{ width: 32, height: 32, borderRadius: '50%' }} />}
                    title={item.senderName}
                    description={
                      <>
                        {item.content}
                        {item.mediaUrl && (
                          <div>
                            <img src={item.mediaUrl} alt="Uploaded media" style={{ maxWidth: '100%', maxHeight: 200, marginTop: 8 }} />
                          </div>
                        )}
                      </>
                    }
                  />
                  <div>{new Date(item.createdAt).toLocaleString()}</div>
                </List.Item>
              )}
              style={{ flexGrow: 1, overflowY: 'auto' }}
            />
            <div style={{ display: 'flex', marginTop: '20px', flexDirection: 'column' }}>
              <TextArea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message"
                autoSize={{ minRows: 1, maxRows: 4 }}
                style={{ flexGrow: 1, marginBottom: '10px' }}
              />
              {uploadedFile && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt="Uploaded preview"
                    style={{ maxWidth: 200, maxHeight: 200, marginRight: '10px' }}
                  />
                  <Button icon={<CloseOutlined />} onClick={handleRemoveFile}>
                    Remove
                  </Button>
                </div>
              )}
              <div style={{ display: 'flex' }}>
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    setUploadedFile(file);
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />} style={{ marginRight: '10px' }}>
                    Upload
                  </Button>
                </Upload>
                <Button type="primary" icon={<SendOutlined />} onClick={sendMessage}>
                  Send
                </Button>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </CustomLayout>
  );
};

export default ChatPage;
