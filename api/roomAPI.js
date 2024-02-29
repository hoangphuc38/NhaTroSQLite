import axiosClient from "./axiosClient";

class RoomAPI {
    getAll = () => {
        const url = 'Phong/get-all';
        return axiosClient.get(url);
    }

    getDetailRoom = (id) => {
        const url = `Phong/get-detail/${id}`
        return axiosClient.get(url);
    }
}

const roomAPI = new RoomAPI();
export default roomAPI;