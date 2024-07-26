import React, { useState, useEffect } from "react";
import { Layout, Menu, message, Modal, Avatar } from "antd";
import {
  UserOutlined,
  // UserAddOutlined,
} from "@ant-design/icons";
import { GLOBAL_CHANNEL_ID } from "../../constants/values";
import useSupabase from "../../hooks/useSupabase";
import { useAppSelector } from "../../redux/hooks";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { Message, Conversation, IUser } from "../../types/data";
import UserList from "../users-list-modal";
import useFetchData from "../../hooks/useFetchData";
import Chats from "../../components/chat-item";

const { Sider } = Layout;

const ChatPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const supabase = useSupabase();

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const [isUserListVisible, setIsUserListVisible] = useState(false);

  const { data: traders } = useFetchData<{ status: string; data: IUser[] }>(
    `/user/all`
  );

  //USE_EFFECTs
  useEffect(() => {
    fetchConversations();
    setupRealtimeSubscriptions();

    return () => {
      supabase.removeAllChannels();
    };
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    } else {
      fetchGlobalMessages();
    }
  }, [selectedConversation]);

  //Setting up the realtime subscriptions with the supabase dbs
  const setupRealtimeSubscriptions = () => {
    supabase
      .channel("public:conversations")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversations" },
        handleConversationChange
      )
      .subscribe((status) => {
        console.log("Conversation subscription status:", status);
      });

    supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        handleNewMessage
      )
      .subscribe((status) => {
        console.log("Message insert subscription status:", status);
      });

    supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        handleDeleteMessage
      )
      .subscribe((status) => {
        console.log("Message delete subscription status:", status);
      });

    supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        handleEditMessage
      )
      .subscribe((status) => {
        console.log("Message edit subscription status:", status);
      });
  };

  const handleConversationChange = (payload: any) => {
    if (payload.new && payload.new.participants.includes(user?._id)) {
      setConversations((prev) => [...prev, payload.new]);
    }
  };

  const handleNewMessage = (payload: any) => {
    const newMessage = payload.new as Message;
    if (
      newMessage.conversationId === selectedConversation ||
      (!selectedConversation && newMessage.conversationId === GLOBAL_CHANNEL_ID)
    ) {
      setMessages((prev) => [...prev, newMessage]);
    }
  };
  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);
  
    if (error) {
      console.error("Error deleting message:", error);
      message.error("Failed to delete message");
    } else {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      message.success("Message deleted successfully");
    }
  };
  const editMessage = async (messageId: string, newContent: string) => {
    const { error } = await supabase
      .from("messages")
      .update({ content: newContent })
      .eq("id", messageId);
  
    if (error) {
      console.error("Error editing message:", error);
      message.error("Failed to edit message");
    } else {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: newContent } : msg
        )
      );
      message.success("Message edited successfully");
    }
  };
  const handleDeleteMessage = (payload: any) => {
    const deletedMessage = payload.old as Message;
    if (
      deletedMessage.conversationId === selectedConversation ||
      (!selectedConversation &&
        deletedMessage.conversationId === GLOBAL_CHANNEL_ID)
    ) {
      setMessages((prev) => prev.filter((msg) => msg.id !== deletedMessage.id));
    }
  };
  const handleEditMessage = (payload: any) => {
    const editedMessage = payload.new as Message;
    if (
      editedMessage.conversationId === selectedConversation ||
      (!selectedConversation &&
        editedMessage.conversationId === GLOBAL_CHANNEL_ID)
    ) {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === editedMessage.id ? editedMessage : msg))
      );
    }
  };
  const fetchConversations = async () => {
    //Fetch all the conversation from the database which include this userID in any of the Participants list.
    //Where
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .filter("participants", "cs", `{${user?._id}}`);

    if (error) {
      console.error("Error fetching conversations:", error);
    } else {
      setConversations(data || []);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    //Fetch all the messages from a given conversationID
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversationId", conversationId)
      .order("createdAt", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data || []);
    }
  };

  const fetchGlobalMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversationId", GLOBAL_CHANNEL_ID)
      .order("createdAt", { ascending: true });

    if (error) {
      console.error("Error fetching global messages:", error);
    } else {
      setMessages(data || []);
    }
  };

  const startNewConversation = async (participantId: string) => {
    const { data, error } = await supabase
      .from("conversations")
      .insert({ participants: [user?._id, participantId] })
      .select()
      .single();

    if (error) {
      console.error("Error creating conversation:", error);
      message.error("Failed to create conversation");
    } else {
      setConversations([...conversations, data]);
      setSelectedConversation(data.id);
      setIsUserListVisible(false);
    }
  };

  return (
    <CustomLayout>
      <Layout style={{ height: "90vh" }}>
        <Sider width={200} theme="light" collapsible>
          <Menu
            mode="inline"
            selectedKeys={[selectedConversation || GLOBAL_CHANNEL_ID]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={({ key }) =>
              setSelectedConversation(key === GLOBAL_CHANNEL_ID ? null : key)
            }
          >
            <Menu.Item key={GLOBAL_CHANNEL_ID}>
              <Avatar icon={<UserOutlined />} />
              <span style={{ marginLeft: "10px" }}>Global Channel</span>
            </Menu.Item>

            {conversations.map((conv) => {
              const otherUser = conv.participants.find((p) => p !== user?._id);
              const otherUserData = traders?.data.find(
                (u) => u._id === otherUser
              ); // Assuming you have a users array
              return (
                <Menu.Item key={conv.id}>
                  <Avatar
                    src={otherUserData?.profile_image_url}
                    icon={<UserOutlined />}
                  />
                  <span style={{ marginLeft: "10px" }}>
                    {otherUserData
                      ? `${otherUserData.firstName} ${otherUserData.lastName}`
                      : "Unknown User"}
                  </span>
                </Menu.Item>
              );
            })}

            <Menu.Item
              onClick={() => {
                setIsUserListVisible(true);
              }}
              key="new"
            >
              <Avatar icon={<UserOutlined />} />
              <span style={{ marginLeft: "10px" }}>New Conversation</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Chats
          messages={messages}
          selectedConversation={selectedConversation}
          deleteMessage={deleteMessage}
          editMessage={editMessage}
          setMessages={setMessages}
        />
      </Layout>
      <Modal
        title="Start New Conversation"
        visible={isUserListVisible}
        onCancel={() => setIsUserListVisible(false)}
        footer={null}
      >
        <UserList
          traders={traders?.data!}
          onSelectUser={startNewConversation}
        />
      </Modal>
    </CustomLayout>
  );
};

export default ChatPage;
