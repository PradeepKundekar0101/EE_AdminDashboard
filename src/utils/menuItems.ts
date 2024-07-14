import React from "react";

import {HomeFilled,BookFilled,QuestionCircleFilled,TeamOutlined, UserOutlined} from "@ant-design/icons"
export const adminItems = [
    {
      key: "1",
      icon: React.createElement(HomeFilled),
      label: "Dashboard",
      path: "/admin/",
    },
    {
      key: "2",
      icon: React.createElement(TeamOutlined),
      label: "Users",
      path: "/admin/users",
    },
    {
      key: "3",
      icon: React.createElement(UserOutlined),
      label: "Mentors",
      path: "/admin/mentors",
    },
    {
      key: "4",
      icon: React.createElement(QuestionCircleFilled),
      label: "Questions",
      path: "/admin/questions",
    },
    {
      key: "5",
      icon: React.createElement(BookFilled),
      label: "Journal",
      path: "/admin/journals",
    },
    

  ];


  export const mentorItems = [
    {
      key: "1",
      icon: React.createElement(HomeFilled),
      label: "Dashboard",
      path: "/mentor/home",
    },
    {
      key: "2",
      icon: React.createElement(TeamOutlined),
      label: "Users",
      path: "/mentor/users",
    },
    
    {
      key: "3",
      icon: React.createElement(BookFilled),
      label: "Journal",
      path: "/mentor/journals",
    },

  ];