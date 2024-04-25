import axiosClient from "./axiosClient";

class AuthAPI {
    login = (userName, password) => {
        const url = `TaiKhoan/dang-nhap`;
        return axiosClient.post(url, { userName, password });
    }

    register = (userName, password, name) => {
        const url = `TaiKhoan/dang-ky`;
        return axiosClient.post(url, { userName, password, name });
    }
}

const authAPI = new AuthAPI();
export default authAPI;