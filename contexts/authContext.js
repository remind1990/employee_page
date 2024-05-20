'use client';
import updateTranslatorStatistic from '@/services/updateTranslatorStatistic';
import { createContext, useContext, useReducer } from 'react';
import toast from 'react-hot-toast';
const AuthContext = createContext();
const initialState = {
  user: null,
  mongooseUser: null,
  userExist: false,
  isRegistered: false,
  isAuthenticated: false,
  contactEmail: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isRegistered: true,
        userExist: true,
      };
    case 'mongooseLogin':
      return {
        ...state,
        mongooseUser: action.payload,
        isAuthenticated: true,
        isRegistered: true,
        userExist: true,
      };
    case 'updateUserBalanceDay':
      return {
        ...state,
        mongooseUser: { ...state.mongooseUser, balanceDays: action.payload },
      };
    case 'logout':
      return initialState;
    case 'createNewUser':
      return { ...state, user: null, isAuthenticated: false };
    case 'commitUser':
      return {
        ...state,
        userExist: true,
        user: {
          ...state.user,
          _id: action.payload._id,
        },
        isRegistered: action.payload.registered,
      };
    case 'sendEmail':
      return { ...state, contactEmail: true };
    default:
      throw new Error('Unknown action');
  }
}

function AuthProvider({ children }) {
  const [
    {
      user,
      isAuthenticated,
      isRegistered,
      userExist,
      contactEmail,
      mongooseUser,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function login(data) {
    dispatch({ type: 'login', payload: data });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }
  function mongooseLogin(data) {
    dispatch({ type: 'mongooseLogin', payload: data.mongooseData });
  }
  function commitThatUserExist(data) {
    const { _id, registered } = data;
    dispatch({ type: 'commitUser', payload: { _id, registered } });
  }

  async function updateBalanceDays(dates) {
    if (!dates || !dates.length) {
      console.error('no dates passed in updateBalanceDays');
      return;
    }
    const res = await updateTranslatorStatistic(
      mongooseUser.translator._id,
      dates
    );
    if (!res) {
      toast.error('Something went wrong in updating balance days');
    }
    dispatch({ type: 'updateUserBalanceDay', payload: res.data.balanceDays });
  }

  function sendContactEmail() {
    dispatch({ type: 'sendEmail' });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        userExist,
        isRegistered,
        login,
        logout,
        mongooseUser,
        mongooseLogin,
        commitThatUserExist,
        sendContactEmail,
        contactEmail,
        updateBalanceDays,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Trying to use a context not inside AuthContext');
  }
  return context;
};

export { AuthProvider, useAuth };
