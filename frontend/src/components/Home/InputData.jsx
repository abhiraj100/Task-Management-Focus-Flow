import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputData = ({ inputDiv, setInputDiv, updatedData, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  const navigatge = useNavigate();

  useEffect(() => {
    setData({ title: updatedData.title, desc: updatedData.desc });
  }, [updatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // change function
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  // submitData function
  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.post("http://localhost:3300/api/v2/create-task", Data, {
        headers,
      });
      setInputDiv("hidden");
      setData({ title: "", desc: "" });
      navigatge("/");
    }
  };

  // update task
  const UpdateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.put(`http://localhost:3300/api/v2/update-task/${updatedData.id}`, Data, {
        headers,
      });
      setUpdatedData({ id: "", title: "", desc: "" });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  return (
    <>
      <div
        className={` ${inputDiv}  top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={` ${inputDiv}  top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded ">
          <div className="flex justify-end text-xl ">
            <button
              onClick={() => {
                setInputDiv("hidden");
                setUpdatedData({ id: "", title: "", desc: "" });
                setData({ title: "", desc: "" });
              }}
              className="bg-red-500 rounded-full p-1"
            >
              <RxCross2 className="font-semibold" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Title"
            name="title"
            className="bg-gray-700 px-3 py-2 rounded w-full my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            placeholder="Enter the description"
            className="px-3 bg-gray-700 py-2 rounded w-full my-3"
            value={Data.desc}
            onChange={change}
          ></textarea>

          {updatedData.id === "" ? (
            <button
              className="px-3 py-2 bg-blue-600 rounded text-black text-xl font-semibold "
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-600 rounded text-black text-xl font-semibold "
              onClick={UpdateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
