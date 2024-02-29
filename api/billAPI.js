import axiosClient from "./axiosClient";

class BillAPI {
    getHoaDonPhong = (id, month, year) => {
        const url = `HoaDonPhong/get-hoadon/${id}/${month}/${year}`;
        return axiosClient.get(url);
    }
}

const billAPI = new BillAPI();
export default billAPI;