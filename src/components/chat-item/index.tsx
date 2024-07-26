import {
    ArrowDownOutlined,
    CloseOutlined,
    MoreOutlined,
    PaperClipOutlined,
    SendOutlined,
  } from "@ant-design/icons";
  import {
    Button,
    Dropdown,
    Input,
    Layout,
    List,
    Menu,
    message,
    Modal,
    Upload,
  } from "antd";
  import { useEffect, useRef, useState } from "react";
  import { Message } from "../../types/data";
  import { useAppSelector } from "../../redux/hooks";
  import { Content } from "antd/es/layout/layout";
  import TextArea from "antd/es/input/TextArea";
  import useSupabase from "../../hooks/useSupabase";
  import { GLOBAL_CHANNEL_ID } from "../../constants/values";
  
  const index = ({
    messages,
    selectedConversation,
    deleteMessage,
    editMessage,
    setMessages,
  }: {
    messages: Message[];
    selectedConversation: string | null;
    deleteMessage: (messageId: string) => Promise<void>;
    editMessage: (messageId: string, newContent: string) => Promise<void>;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  }) => {
    const supabase = useSupabase();
    const user = useAppSelector((state) => state.auth.user);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editingMessage, setEditingMessage] = useState<string | null>(null);
    const [inputMessage, setInputMessage] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [editedContent, setEditedContent] = useState("");

    // const [showScrollButton, setShowScrollButton] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
  
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    
      const handleScroll = () => {
        if (listRef.current) {
          // const { scrollTop, scrollHeight, clientHeight } = listRef.current;
          // const atBottom = scrollHeight - scrollTop === clientHeight;
          // setShowScrollButton(!atBottom);
        }
      };
    
      useEffect(() => {
        scrollToBottom();
      }, [messages]);
    
      useEffect(() => {
        const listElement = listRef.current;
        if (listElement) {
          listElement.addEventListener("scroll", handleScroll);
          return () => listElement.removeEventListener("scroll", handleScroll);
        }
      }, []);

  
    const sendMessage = async () => {
      if (inputMessage.trim() === "" && !uploadedFile) return;
      let mediaUrl = "";
      if (uploadedFile) {
        const fileExt = uploadedFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${selectedConversation || "global"}/${fileName}`;
  
        const { error: uploadError } = await supabase.storage
          .from("chat-media")
          .upload(filePath, uploadedFile);
  
        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          message.error("Failed to upload file");
          return;
        }
  
        const { data } = supabase.storage
          .from("chat-media")
          .getPublicUrl(filePath);
        mediaUrl = data.publicUrl;
      }
  
      const newMessage = {
        content: inputMessage,
        senderId: user?._id || "anonymous",
        senderName: user ? `${user.firstName} ${user.lastName}` : "Anonymous",
        senderProfile: user?.profile_image_url || "/avatar.png",
        mediaUrl: mediaUrl,
        conversationId: selectedConversation || GLOBAL_CHANNEL_ID,
      };
  
      const { error } = await supabase.from("messages").insert(newMessage);
  
      if (error) {
        console.error("Error sending message:", error);
        message.error("Failed to send message");
      } else {
        setMessages((prev) => [
          ...prev,
          { ...newMessage, id: "", createdAt: `${new Date()}` },
        ]);
  
        setInputMessage("");
        setUploadedFile(null);
      }
    };
  
    const handleEditClick = (messageId: string) => {
      const message = messages.find((msg) => msg.id === messageId);
      if (message) {
        setEditingMessage(messageId);
        setEditedContent(message.content);
        setEditModalVisible(true);
      }
    };
  
    const handleEditSubmit = () => {
      if (editingMessage) {
        editMessage(editingMessage, editedContent);
      }
      setEditModalVisible(false);
    };
  
    const handleDeleteClick = (messageId: string) => {
      setEditingMessage(messageId);
      setDeleteModalVisible(true);
    };
  
    const handleDeleteConfirm = () => {
      if (editingMessage) {
        deleteMessage(editingMessage);
      }
      setDeleteModalVisible(false);
    };
  
   
  
    return (
        <Layout style={{ padding: "24px" }}>
        <Content className="flex flex-col h-[calc(100vh-64px)] bg-gray-100">
          <div 
            ref={listRef}
            className="flex-grow  overflow-y-auto px-4 py-2 relative"
          >
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(item) => (
                <List.Item
                  extra={
                    item.senderId == user?._id && (
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              key="edit"
                              onClick={() => handleEditClick(item.id)}
                            >
                              Edit
                            </Menu.Item>
                            <Menu.Item
                              key="delete"
                              onClick={() => handleDeleteClick(item.id)}
                            >
                              Delete
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <Button
                          icon={<MoreOutlined />}
                          style={{ border: "none" }}
                        />
                      </Dropdown>
                    )
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.senderProfile}
                        alt={item.senderName}
                        style={{ width: 32, height: 32, borderRadius: "50%" }}
                      />
                    }
                    title={item.senderName}
                    description={
                      <>
                        {item.content}
                        {item.mediaUrl && (
                          <div>
                            <img
                              src={item.mediaUrl}
                              alt="Uploaded media"
                              style={{
                                maxWidth: "100%",
                                maxHeight: 200,
                                marginTop: 8,
                              }}
                            />
                          </div>
                        )}
                      </>
                    }
                  />
                  <div>{new Date(item.createdAt).toLocaleString()}</div>
                </List.Item>
              )}
            />
            
            {false && (
              <Button
                className="absolute bottom-4 right-4"
                shape="circle"
                icon={<ArrowDownOutlined />}
                onClick={scrollToBottom}
              />
            )}
            <div className=" bottom-0" ref={messagesEndRef} />
          </div>
  
          <Modal
            title="Edit Message"
            visible={editModalVisible}
            onOk={handleEditSubmit}
            onCancel={() => setEditModalVisible(false)}
          >
            <Input.TextArea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={4}
            />
          </Modal>
  
          <Modal
            title="Confirm Delete"
            visible={deleteModalVisible}
            onOk={handleDeleteConfirm}
            onCancel={() => setDeleteModalVisible(false)}
          >
            <p>Are you sure you want to delete this message?</p>
          </Modal>
  
          <div className="flex pt-8">
            <TextArea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message"
              autoSize={{ minRows: 1, maxRows: 4 }}
              style={{ flexGrow: 1, marginBottom: "10px" }}
            />
            {uploadedFile && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt="Uploaded preview"
                  style={{
                    maxWidth: 200,
                    maxHeight: 200,
                    marginRight: "10px",
                  }}
                />
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => setUploadedFile(null)}
                >
                  Remove
                </Button>
              </div>
            )}
            <div className="flex">
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={(file) => {
                  setUploadedFile(file);
                  return false;
                }}
              >
                <Button icon={<PaperClipOutlined />} className="mx-3"></Button>
              </Upload>
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={sendMessage}
              >
                Send
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
    );
  };
  
  export default index;
  