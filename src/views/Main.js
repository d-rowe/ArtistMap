import React from "react";
import Search from "../components/Search";
import Map from "../components/Map";
import "./style.scss";

const MainView = () => {
  return (
    <div className="main-view">
      <Search />
      <Map />
    </div>
  );
};

export default MainView;
