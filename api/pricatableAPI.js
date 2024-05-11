import axiosClient from "./axiosClient";

class PriceTableAPI {
    getAll = (userId) => {
        const url = `BangGia/get-bang-gia?UserId=${userId}`;
        return axiosClient.get(url);
    }

    addContent = (userId, hangMuc, gia, donVi) => {
        const url = `BangGia/add-bang-gia?UserId=${userId}`;
        return axiosClient.post(url, { hangMuc, gia, donVi });
    }

    updateContent = (userId, id, hangMuc, gia, donVi) => {
        const url = `BangGia/update-bang-gia?UserId=${userId}&id=${id}`;
        return axiosClient.put(url, { hangMuc, gia, donVi });
    }
}

const pricetableAPI = new PriceTableAPI();
export default pricetableAPI;