import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const ImportantTasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://task-management-focus-flow.onrender.com/api/v2/get-imp-tasks",
        { headers }
      );
      // console.log(response);
      setData(response.data.data);
    };
    fetch();
  });

  // console.log(Data);

  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default ImportantTasks;
