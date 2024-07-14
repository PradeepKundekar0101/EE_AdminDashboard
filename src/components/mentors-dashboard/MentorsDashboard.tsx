import React, { useEffect, useState } from "react";
import { Button, Tag } from "antd";
import { ArrowRightOutlined, CloudDownloadOutlined, UserAddOutlined } from "@ant-design/icons";
import { Flex } from "antd"; // Assuming you have a Flex component from Ant Design
import { useNavigate } from "react-router-dom";
import useMentorService from "../../hooks/useMentor";
import { IUser } from "../../types/data";
import { ColumnsType } from "antd/es/table";
import { useAppSelector } from "../../redux/hooks";
import CustomTable from "../common/table/CustomTable";

const MentorsDashboard: React.FC = () => {
  const { getAllMentors } = useMentorService();
  const { user } = useAppSelector((state) => {
    return state.auth;
  });

  const [mentors, setMentors] = useState<IUser[]>([]);
  const [totalMentors, setTotalMentors] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllMentors = async () => {
    try {
      setIsLoading(true);
      const res = await getAllMentors();
      if (res.status === 200) {
        setMentors(res.data.data);
        setTotalMentors(res.data.data.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);
  const columns: ColumnsType<IUser> = [
    {
      title: "Mentor",
      dataIndex: "firstName",
      key: "firstName",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Traders",
      dataIndex: "traders",
      key: "traders",
      render:()=>{ return <Button iconPosition="end" icon={<ArrowRightOutlined/>}> 0 Traders </Button> }

    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" href={`/${user?.role}/user/${record._id}`}>
          View Profile
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All MENTORS</h1>
      <div className="border border-[#EAECF0]">
        <Flex justify="space-between" align="center" className="px-6 py-6">
          <div>
            <p>
              <span className="text-lg font-bold mr-2"> Mentors</span>
              <Tag color="cyan">Total Mentors: {totalMentors}</Tag>
            </p>
            <p className="text-light-grey">List of all mentors </p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                navigate("/admin/create-mentor");
              }}
              type="default"
              icon={<UserAddOutlined />}
            >
              Create Mentor
            </Button>
            <Button type="default" icon={<CloudDownloadOutlined />}>
              Export
            </Button>
          </div>
        </Flex>
      </div>

      <CustomTable
        columns={columns}
        data={mentors}
        loading={isLoading}
        totalDocuments={mentors.length}
      />
      {/* <MentorsTable isLoading={isLoading} mentors={mentors} /> */}
    </div>
  );
};

export default MentorsDashboard;
