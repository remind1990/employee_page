'use client';
import { createContext, useContext, useReducer } from 'react';
const AuthContext = createContext();
const initialState = {
  user: null,
  userExist: false,
  isRegistered: false,
  isAuthenticated: false,
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
    default:
      throw new Error('Unknown action');
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isRegistered, userExist }, dispatch] =
    useReducer(reducer, initialState);

  async function login(data) {
    dispatch({ type: 'login', payload: data });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  function commitThatUserExist(data) {
    const { _id, registered } = data;
    dispatch({ type: 'commitUser', payload: { _id, registered } });
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
        commitThatUserExist,
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
