import { useContext, createContext, useState, useEffect } from "react";

const UserContext = createContext();

export default function UserContextProvider({children}) {

    const [loggedIn, setLoggedIn] = useState(false);

    const [UserInfo, setUserInfo] = useState({});

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        const savedUser = localStorage.getItem("userInfo");

        if (savedToken) {
            setToken(savedToken);
            setLoggedIn(true);
        }

        if (savedUser) {
            try {
                setUserInfo(JSON.parse(savedUser));

            } catch {
                localStorage.removeItem("userInfo");
            }
        }

        setLoading(false);

    }, []);

    async function login(usernameOrEmail, password) {
        const res = await fetch("http://localhost:3000/login", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                usernameOrEmail: usernameOrEmail,
                password: password
            }),
        });

        const data = await res.json();
        if (res.status === 200) {
            setToken(data.token);
            setUserInfo(data.otherInfo);
            setLoggedIn(true);

            localStorage.setItem("token", data.token);
            localStorage.setItem("userInfo", JSON.stringify(data.otherInfo));

            return { success: true };

        } else {
            return { success: false, message: data.message || data.error || "Login failed"};
        }
    }

        function logout() {
        setToken("");
        setUserInfo({});
        setLoggedIn(false);

        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        }


return(
    
    <UserContext.Provider value={{ loggedIn, UserInfo, token, login, loading, logout }}>

        {children}
    </UserContext.Provider>

    );
}

export function useUserContext() {
    return useContext(UserContext);
}