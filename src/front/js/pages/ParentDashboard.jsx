import React, { useContext, useState } from "react";
import ParentSideBar from "../component/leftMenuParent/ParentSideBar.jsx";
import MainDashboard from "../component/leftMenuParent/MainDashboard.jsx";
import ChatComponent from "../component/chatComponent";
import styled from "styled-components";
import img from "./../../img/background.jpg";
import { Context } from "../store/appContext.js";


let Content = styled.div`
  flex: 1;
  padding: 1rem;
  background-image: url(${img});
  background-size: cover;
  overflow-y: auto;
  aspect-ratio: 16 / 9;
`;

const ParentDashboard = () => {
  const [activeKey, setActiveKey] = useState("home");
  const { store, actions } = useContext(Context);
  const [info, setInfo] = useState("");
  const [infoEventos, setInfoEventos] = useState([]);
  const [infoEstudiantes, setInfoEstudiantes] = useState([]);
  const handleSelect = key => {
    setActiveKey(key);
    console.log("Selected:", key);
  };

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!store.personalInfo) {
        await actions.getParentInfo();
      }
    };

    fetchPersonalInfo();
  }, [store.personalInfo]);

  useEffect(() => {
    if (store.personalInfo) {
      setInfoEventos(store.personalInfo.calendario);
      setInfoEstudiantes(store.personalInfo.statusResume);
    }
  }, [store.personalInfo]);

  const handleContentRender = key => {
    switch (key) {
      case "materias":
        break;

      default:
        return (
          <MainDashboard
            dataEvents={infoEventos}
            estudiantes={infoEstudiantes}
          />
        );
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", paddingTop: "100px" }}>
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

const menuItems = [
  {
    key: "main",
    label: "Dashboard",
    icon: <i className="bi bi-speedometer2"></i>,
  },
  {
    key: "review",
    label: "Revisar",
    icon: <i className="bi bi-journal-check"></i>,
  },
  {
    key: "settings",
    label: "Settings",
    icon: <i className="bi bi-journal-text"></i>,
  },
  {
    key: "messages",
    label: "Mensajes",
    icon: <i className="bi bi-chat-left-text"></i>,
  },
];
