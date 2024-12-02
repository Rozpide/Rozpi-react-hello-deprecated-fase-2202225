import React, { useContext, useState } from "react";
import ParentSideBar from "../component/leftMenuParent/ParentSideBar.jsx";
import MainDashboard from "../component/leftMenuParent/MainDashboard.jsx";
import ChatComponent from "../component/chatComponent";
import styled from "styled-components";
import img from "./../../img/background.jpg";
import { Context } from "../store/appContext.js";


let Content = styled.div`
  background-image: url(${img});
  flex: 1;
  padding: 1rem;
  aspect-ratio: 16 / 9;
`;

const ParentDashboard = () => {
  const [activeKey, setActiveKey] = useState("home");
  const { store, actions } = useContext(Context);
  const [info, setInfo] = useState("");

  const menuItems = [
    {
      key: "main",
      label: "Dashboard",
      icon: <i className="bi bi-speedometer2"></i>,
    },
    {
      key: "profile",
      label: "Profile",
      icon: <i className="bi bi-journal-text"></i>,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <i className="bi bi-journal-text"></i>,
    },
    {
      key: "reports",
      label: "Reports",
      icon: <i className="bi bi-journal-text"></i>,
    },
  ];

  const handleSelect = key => {
    setActiveKey(key);
    console.log("Selected:", key);
  };

  const handleContentRender = key => {
    switch (key) {
      case "materias":
        break;

      default:
        return <MainDashboard />;
    }
  };

  return (
    <div style={{ display: "flex", paddingTop: "100px" }}>
      <ParentSideBar
        items={menuItems}
        activeKey={activeKey}
        onSelect={handleSelect}
      />

      <Content>
        {handleContentRender(activeKey)}
        {store.isChatVisible && <ChatComponent />}
      </Content>
    </div>
  );
};

export default ParentDashboard;
