import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const CompletedTasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://task-management-focus-flow.onrender.com/api/v2/get-complete-tasks",
        { headers }
      );
      // console.log(response);
      setData(response.data.data);
    };
    fetch();
  });

  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default CompletedTasks;
