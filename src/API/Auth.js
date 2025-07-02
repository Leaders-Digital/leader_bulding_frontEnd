import Axios from "../Config/Axios";

export const login = async (email, password) => {
    try {
        const response = await Axios.post("/user/login", {email, password});
        console.log("Login", response);
        return response.data;
    } catch (e) {
        console.error(e);
        throw new Error(e.response.data?.message || "login failed");
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await Axios.get("/user/getCurrentUser", {});

        return response.data;
    } catch (e) {
        throw new Error(
            e.response.data?.message || "failed to get the currnt user"
        );
    }
};

export const userlogout = async () => {
    try {
        const response = await Axios.post("/user/logout", {});
        console.log("Logout", response);
        return response.data;
    } catch (e) {
        throw new Error(
            e.response.data?.message || "failed to get the currnt user"
        );
    }
};
