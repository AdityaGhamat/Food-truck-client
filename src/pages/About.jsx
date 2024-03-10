import React, { useEffect } from "react";
import UserTable from "../components/UserTable";
import { useLoaderData } from "react-router-dom";
const About = () => {
  const data = useLoaderData();
  const user = data.user;
  return (
    <div>
      <UserTable user={user} />
    </div>
  );
};

export default About;
