import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  if (isLoggedIn === true) {
    navigate("/");
  } 
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // const history = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      // Reset error message on each submission
      setErrorMessage("");

      if (
        Data.username.trim() === "" ||
        Data.email.trim() === "" ||
        Data.password.trim() === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:3300/api/v1/sign-in",
          Data
        );
        console.log(response);
        setData({ username: "", email: "", password: "" });
        console.log(response.data.user);
        alert("Signup successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      const errorResponse =
        error.response?.data?.message || "Signup failed. Please try again.";
      setErrorMessage(errorResponse); // Set the error message to display it to the user
      alert(errorResponse);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-full max-w-md rounded bg-gray-800">
        <div className="text-2xl font-semibold text-white mb-4">Signup</div>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          value={Data.username}
          onChange={change}
        />
        <input
          type="email"
          required
          name="email"
          placeholder="Enter your email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          value={Data.email}
          onChange={change}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex justify-between items-center mt-4">
          <button
            className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded hover:bg-blue-500 transition"
            onClick={submit}
          >
            Signup
          </button>
          <Link
            to="/login"
            className="text-gray-300 hover:text-gray-100 underline font-semibold"
          >
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Signup = () => {
//   const [Data, setData] = useState({ username: "", email: "", password: "" });
//   const change = (e) => {
//     const { name, value } = e.target;
//     setData({ ...Data, [name]: value });
//   };

//   const submit = async () => {
//     try {
//       if (Data.username === "" || Data.email === "" || Data.password === "") {
//         alert("All fields are required");
//       } else {
//         const response = await axios.post(
//           "http:localhost:3300/api/v1/sign-in",
//           Data
//         );
//         console.log(response);
//       }
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };

//   return (
//     <div className=" h-[98vh] flex items-center justify-center">
//       <div className="p-4 w-2/6 rounded bg-gray-800">
//         <div className="text-2xl font-semibold">Signup</div>
//         <input
//           type="username"
//           name="username"
//           placeholder="username"
//           className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
//           value={Data.username}
//           onChange={change}
//         />
//         <input
//           type="email"
//           required
//           name="email"
//           placeholder="email"
//           className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
//           value={Data.email}
//           onChange={change}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="password"
//           className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
//           value={Data.password}
//           onChange={change}
//         />
//         <div className="w-full flex justify-between items-center">
//           <button
//             className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded"
//             onClick={submit}
//           >
//             Signup
//           </button>
//           <Link
//             to="/login"
//             className="mr-4 text-gray-300 hover:text-gray-100 underline font-semibold"
//           >
//             Already having an account ? Login here{" "}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
