import React from "react";

import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { HomeScreen } from "./Screens/Home/HomeScreen";
import { EventsScreen } from "./Screens/Events/EventsScreen";
import { Layout, Menu } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import MenuItem from "antd/lib/menu/MenuItem";
import { SearchScreen } from "./Screens/Search/SearchScreen";

function App() {
  return (
    <Layout className="App">
      <Sider className="sidebar">
        <Sidebar />
        <Menu theme="dark" mode="inline">
          <MenuItem>
            <Link to={"/"}>Home</Link>
          </MenuItem>
          <MenuItem>
            <Link to="events">Events</Link>
          </MenuItem>
          <MenuItem>
            <Link to="search">Search</Link>
          </MenuItem>
        </Menu>
      </Sider>
      <Content className="main-cointainer">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/events" element={<EventsScreen />} />
          <Route path="/search" element={<SearchScreen />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
