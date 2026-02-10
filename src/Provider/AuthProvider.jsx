import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../../firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);
  const [userStatus, setUserStatus] = useState("");

  const CreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.email) {
      setRole("");
      setUserStatus("");
      setRoleLoading(false);
      return;
    }

    setRoleLoading(true);
    axios.get(`https://assignment11-mocha-kappa.vercel.app/users/role/${user.email}`)
      .then((res) => {
        setRole(res.data.role);
        setUserStatus(res.data.status);
        setRoleLoading(false);
      })
      .catch(() => setRoleLoading(false));
  }, [user]);

  const authdata = {
    user,
    setUser, // <--- NOW EXPORTED
    loading,
    CreateUser,
    logout,
    role,
    roleLoading,
    userStatus
  };

  return (
    <AuthContext.Provider value={authdata}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;