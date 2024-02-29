import axiosClient from "./axiosClient";

class PriceTableAPI {
    getAll = () => {
        const url = 'BangGia/get-bang-gia';
        return axiosClient.get(url);
    }
}

const pricetableAPI = new PriceTableAPI();
export default pricetableAPI;