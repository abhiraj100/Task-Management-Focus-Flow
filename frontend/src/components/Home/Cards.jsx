import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  // const data = [
  //   {
  //     title: "The Best Coding Channel",
  //     desc: "I have to create my channel.",
  //     status: "In Complete",
  //   },
  //   {
  //     title: "CPP Concepts",
  //     desc: "I need to clear basics of Cpp.",
  //     status: "Complete",
  //   },
  //   {
  //     title: "Assignment",
  //     desc: "My assignment on 20 march.",
  //     status: "In Complete",
  //   },
  //   {
  //     title: "Projects",
  //     desc: "For project I need to see tutorials of the abhiraj youtube channel.",
  //     status: "Complete",
  //   },
  // ];

  //   const [importantButton, setImportantButton] = useState("Incomplete");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3300/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      // console.log(response);
      // alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3300/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      // console.log(response);
      // alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3300/api/v2/delete-task/${id}`,
        { headers }
      );
      // console.log(response);
      // alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between border shadow-lg bg-gray-500 rounded-xl p-4"
          >
            <div className="">
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 font-semibold my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex flex-row items-center">
              <button
                className={`${
                  items.complete === false ? "bg-red-500" : "bg-green-700"
                }
                text-black font-semibold w-3/6 p-2 rounded`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? " Completed" : "In Completed"}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>
                {home !== "false" && (
                  <button>
                    <FaEdit
                      onClick={() =>
                        handleUpdateTask(items._id, items.title, items.desc)
                      }
                    />
                  </button>
                )}
                <button onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {/* Add More Tasks */}
      {home === "true" ? (
        <button
          onClick={() => setInputDiv("fixed")}
          className="flex flex-col justify-center items-center border shadow-lg bg-gray-500 rounded-xl p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Tasks</h2>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cards;
