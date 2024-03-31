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

    createNewRoom = (roomName, roomType, roomPrice) => {
        const url = `Phong/new-phong/?tenPhong=${roomName}&loaiPhong=${roomType}&giaPhong=${roomPrice}`;
        return axiosClient.post(url, { roomName, roomType, roomPrice })
    }

    deleteRoom = (id) => {
        const url = `Phong/delete-phong/${id}`;
        return axiosClient.delete(url);
    }

    updateRoom = (id, tenPhong, loaiPhong, giaPhong) => {
        const url = `Phong/update-phong/${id}?tenPhong=${tenPhong}&loaiPhong=${loaiPhong}&giaPhong=${giaPhong}`;
        return axiosClient.put(url);
    }
}

const roomAPI = new RoomAPI();
export default roomAPI;