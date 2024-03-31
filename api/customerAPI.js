import axiosClient from './axiosClient';

class CustomerAPI {
    getPeopleInRoom = (roomId) => {
        const url = `Nguoi/get-people-of-room/${roomId}`;
        return axiosClient.get(url);
    }

    getDetailPeople = (personId) => {
        const url = `Nguoi/get-people-by-id/${personId}`;
        return axiosClient.get(url);
    }

    newPerson = (avatar, hoTen, namSinh, isNam, noiDangKyHoKhau, cccd, ngheNghiep, phongId) => {
        const url = `Nguoi/new-person`;
        return axiosClient.post(url, {
            avatar,
            hoTen,
            namSinh,
            isNam,
            noiDangKyHoKhau,
            cccd,
            ngheNghiep,
            phongId
        })
    }
}

const customerAPI = new CustomerAPI();
export default customerAPI;