import axios from "axios";
import { createContext, useReducer } from "react";
import {
  USER_LOGIN,
  GET_USER_LIST,
  USER_REG,
  GET_USER_ISSUE,
  USER_INSERT_ISSUE,
  ADMIN_LOGIN,
  GET_ADMIN_ISSUE,
} from "../Actions/ActionType";
import { UserReducer } from "../Reducers/userReducer";

export const UserAuth = createContext();

const initialState = {
  isLogin: false,
  loggedRollNo: [],
  isMessage: "",
  studentInfo: [],
  isReg: false,
  isComplaint: false,
  issueInfo: [],
  isAdminLogin: false,
  issueAdmin: [],
  isInfo: false,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const UserRegister = (props) => {
    axios
      .post("https://hostel-backend-agn2.vercel.app/user/register", props.user)
      .then((res) => {
        dispatch({ type: USER_REG, payload: res.data });
      });
  };

  const UserLogin = (props) => {
    axios.post("https://hostel-backend-agn2.vercel.app/user/login", props.user).then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({ type: USER_LOGIN, payload: res.data });
    });
  };

  const get_userList = async () => {
    await axios
      .post(
        "https://hostel-backend-agn2.vercel.app/user/getuser",
        {},
        {
          headers: { authorization: `bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        dispatch({ type: GET_USER_LIST, payload: res.data });
      })
      .catch((error) => console.log(error));
  };

  const get_userIssue = async () => {
    await axios
      .post("https://hostel-backend-agn2.vercel.app/user/findissues", {
        rollNo: state.studentInfo.rollNo,
      })
      .then((res) => {
        dispatch({ type: GET_USER_ISSUE, payload: res.data });
      })
      .catch((error) => console.log(error));
  };

  const user_insertIssue = (props) => {
    axios
      .post("https://hostel-backend-agn2.vercel.app/user/issues", props.updatedUser)
      .then((res) => {
        dispatch({ type: USER_INSERT_ISSUE, payload: res.data });
      });
  };

  const AdminLogin = (props) => {
    axios
      .post("https://hostel-backend-agn2.vercel.app/user/adminlogin", props.admin)
      .then((res) => {
        dispatch({ type: ADMIN_LOGIN, payload: res.data });
      });
  };

  const get_adminIssue = async () => {
    await axios
      .post("https://hostel-backend-agn2.vercel.app/user/getadminissues", {}
      )
      .then((res) => {
        dispatch({ type: GET_ADMIN_ISSUE, payload: res.data });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <UserAuth.Provider
        value={{
          state,
          dispatch,
          UserLogin,
          get_userList,
          UserRegister,
          get_userIssue,
          user_insertIssue,
          AdminLogin,
          get_adminIssue,
        }}
      >
        {children}
      </UserAuth.Provider>
    </>
  );
};
