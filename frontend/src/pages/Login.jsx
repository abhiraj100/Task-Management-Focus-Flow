import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  if (isLoggedIn === true) {
    navigate("/");
  }

  const [Data, setData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  // const history = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      // Reset error message on each submission
      setErrorMessage("");

      if (Data.username.trim() === "" || Data.password.trim() === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:3300/api/v1/log-in",
          Data
        );
        setData({ username: "", password: "" });
        // console.log(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        // alert("Login successfully!");
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      const errorResponse =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      setErrorMessage(errorResponse); // Set the error message to display it to the user
      alert(errorResponse);
    }
  };

  return (
    <div className=" h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">LogIn</div>
        <input
          type="username"
          name="username"
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          value={Data.username}
          onChange={change}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex justify-between items-center">
          <button
            className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded"
            onClick={submit}
          >
            Login
          </button>
          <Link
            to="/signup"
            className="mr-4 text-gray-300 hover:text-gray-100 underline font-semibold"
          >
            Not having an account ? Signup here{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [Data, setData] = useState({ username: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate(); // Use navigate for redirection

//   const change = (e) => {
//     const { name, value } = e.target;
//     setData({ ...Data, [name]: value });
//   };

//   const submit = async () => {
//     try {
//       // Reset error message
//       setErrorMessage("");

//       // Validation for empty fields
//       if (Data.username.trim() === "" || Data.password.trim() === "") {
//         alert("All fields are required");
//         return;
//       }

//       // Send login request
//       const response = await axios.post(
//         "http://localhost:3300/api/v1/log-in",
//         Data
//       );

//       if (response.data.success) {
//         setData({ username: "", password: "" });
//         alert("Login successfully!");
//         navigate("/dashboard"); // Redirect to dashboard or another page
//       } else {
//         setErrorMessage(response.data.message || "Invalid credentials.");
//         alert(response.data.message || "Invalid credentials.");
//       }
//     } catch (error) {
//       console.error(error);
//       const errorResponse =
//         error.response?.data?.message || "Login failed. Please try again.";
//       setErrorMessage(errorResponse);
//       alert(errorResponse);
//     }
//   };

//   return (
//     <div className="h-[98vh] flex items-center justify-center">
//       <div className="p-4 w-2/6 rounded bg-gray-800">
//         <div className="text-2xl font-semibold">LogIn</div>
//         {errorMessage && (
//           <div className="text-red-500 text-sm my-2">{errorMessage}</div>
//         )}
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
//           value={Data.username}
//           onChange={change}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
//           value={Data.password}
//           onChange={change}
//         />
//         <div className="w-full flex justify-between items-center">
//           <button
//             className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded"
//             onClick={submit}
//           >
//             Login
//           </button>
//           <Link
//             to="/signup"
//             className="mr-4 text-gray-300 hover:text-gray-100 underline font-semibold"
//           >
//             Not having an account? Signup here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
