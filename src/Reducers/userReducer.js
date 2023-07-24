import {
  USER_LOGIN,
  GET_USER_LIST,
  USER_REG,
  GET_USER_ISSUE,
  USER_INSERT_ISSUE,
  GET_ADMIN_ISSUE,
  ADMIN_LOGIN,
} from "../Actions/ActionType";

export const UserReducer = (state, action) => {
  if (action.type === USER_LOGIN) {
    if (action.payload.status === 200) {
      return {
        ...state,
        isLogin: true,
        loggedRollNo: action.payload.data,
        isError: false,
        isMessage: action.payload.message,
      };
    } else {
      return {
        ...state,
        isLogin: false,
        isError: true,
        isMessage: action.payload.message,
      };
    }
  }
  if (action.type === USER_REG) {
    if (action.payload.status === 200) {
      return {
        ...state,
        isReg: true,
        isError: false,
        isMessage: action.payload.message,
      };
    } else {
      return {
        ...state,
        isReg: false,
        isError: true,
        isMessage: action.payload.message,
      };
    }
  }
  if (action.type === GET_USER_LIST) {
    if (action.payload.status === 200) {
      return {
        ...state,
        studentInfo: action.payload.data,
        isInfo:true,
        isError: false,
        isMessage: action.payload.message,
      };
    } else {
      return {
        ...state,
        isLogin: false,
        isError: true,
        isMessage: action.payload.message,
      };
    }
  }
  if (action.type === USER_INSERT_ISSUE) {
    if (action.payload.status === 200) {
      return {
        ...state,
        isComplaint: true,
        isError: false,
        isMessage: action.payload.message,
      };
      
    } else {
      return {
        ...state,
        isComplaint: false,
        isError: true,
        isMessage: action.payload.message,
      };
    }
  }
  if (action.type === GET_USER_ISSUE) {
    if (action.payload.status === 200) {
      return {
        ...state,
        issueInfo: action.payload.data,
        isError: false,
        isMessage: action.payload.message,
      };
    } else {
      return {
        ...state,
        isLogin: false,
        isError: true,
        isMessage: action.payload.message,
      };
    }
  }
  if (action.type === GET_ADMIN_ISSUE) {
    if (action.payload.status === 200) {
      return {
        ...state,
        issueAdmin: action.payload.data,
        isError: false,
        isMessage: action.payload.message,
      };
    } else {
      return {
        ...state,
        isAdminLogin: false,
        isError: true,
        isMessage: action.payload.message,
      };
    }
  }
  if (action.type === ADMIN_LOGIN) {
    if (action.payload.status === 200) {
      return {
        ...state,
        isAdminLogin: true,
        isError: false,
        isMessage: action.payload.message,
      };
    } else {
      return {
        ...state,
        isAdminLogin: false,
        isError: true,
        isMessage: action.payload.message,
      };
    }
  }

  throw new Error(`No Matching ${action.type}- action type`);
};
