import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards.jsx";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData.jsx";
import axios from "axios";

const AllTasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();

  // to get the data

  const [updatedData, setUpdatedData] = useState({id: "", title: "", desc: ""});

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://task-management-focus-flow.onrender.com/api/v2/get-all-tasks",
        { headers }
      );
      // console.log(response);
      setData(response.data.data);
    };
    // fetch();
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
  });


  // }, []);

  // console.log(Data);

  // if(Data){
  //   console.log(Data.tasks);
  // }

  // Data && console.log(Data.tasks);

  return (
    <>
      <div>
        <div className="w-full flex justify-end items-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        {Data && (<Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData} />)}
      </div>
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setUpdatedData={setUpdatedData} />
    </>
  );
};

export default AllTasks;
