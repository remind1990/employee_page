'use client';
import { createContext, useContext, useReducer } from 'react';
import getTranslator from '@/services/getTranslator';
const AuthContext = createContext();
const initialState = {
  user: null,
  userExist: false,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    case 'createNewUser':
      return { ...state, user: null, isAuthenticated: false };
    case 'commitUser':
      return { ...state, userExist: true };
    default:
      throw new Error('Unknown action');
  }
}

// const FAKE_USER = {
//   name: 'Visitor',
//   email: 'demo@example.com',
//   password: 'qwerty',
//   avatar: 'https://i.pravatar.cc/100?u=xy',
// };

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, userExist }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    // let users;
    // if (email && password) {
    //   const res = await fetch(`${BASE_URL}/users`);
    //   users = await res.json();
    // }
    // if (users.length > 0) {
    //   const userWithEmail = users.find(
    //     (user) => user.email === email
    //   );
    //   if (!userWithEmail) return;
    //   if (
    //     email === userWithEmail.email &&
    //     password === userWithEmail.password
    //   ) {
    //     dispatch({ type: 'login', payload: userWithEmail });
    //   }
    // }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  function commitThatUserExist() {
    dispatch({ type: 'commitUser' });
  }
  async function createNewUser(userData) {
    // const res = await fetch(`${BASE_URL}/users`);
    // const allUsers = await res.json();

    // if (allUsers.length > 0) {
    //   const userAlreadyExist = allUsers.find(
    //     (user) => user.email === userData.email
    //   );
    //   if (userAlreadyExist) {
    //     throw new Error('User already exists');
    //   }
    // }
    // const newUser = await fetch(`${BASE_URL}/users`, {
    //   method: 'POST',
    //   body: JSON.stringify(userData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const newUserData = await newUser.json();
    dispatch({ type: 'login', payload: newUserData });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        userExist,
        login,
        logout,
        createNewUser,
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
