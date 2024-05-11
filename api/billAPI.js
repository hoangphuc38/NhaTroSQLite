import axiosClient from "./axiosClient";

class BillAPI {
    getHoaDonPhong = (id, month, year) => {
        const url = `HoaDonPhong/get-hoadon/${id}/${month}/${year}`;
        return axiosClient.get(url);
    }

    createHoaDonPhong = (
        userId,
        soDienThangTruoc,
        soDienThangNay,
        tongSoDien,
        tongGiaDien,
        soNuocThangTruoc,
        soNuocThangNay,
        tongSoNuoc,
        tongGiaNuoc,
        soNgayO,
        tongTienPhong,
        tongHoaDon,
        ghiChu,
        phongId,
    ) => {
        const url = `HoaDonPhong/new-hoadon?UserId=${userId}`;
        return axiosClient.post(url, {
            soDienThangTruoc,
            soDienThangNay,
            tongSoDien,
            tongGiaDien,
            soNuocThangTruoc,
            soNuocThangNay,
            tongSoNuoc,
            tongGiaNuoc,
            soNgayO,
            tongTienPhong,
            tongHoaDon,
            ghiChu,
            phongId,
        })
    }

    updateHoaDonPhong = (
        userId,
        id,
        soDienThangTruoc,
        soDienThangNay,
        tongSoDien,
        tongGiaDien,
        soNuocThangTruoc,
        soNuocThangNay,
        tongSoNuoc,
        tongGiaNuoc,
        soNgayO,
        tongTienPhong,
        tongHoaDon,
        ghiChu,
        phongId,
    ) => {
        const url = `HoaDonPhong/update-hoadon/${id}?UserId=${userId}`;
        return axiosClient.put(url, {
            soDienThangTruoc,
            soDienThangNay,
            tongSoDien,
            tongGiaDien,
            soNuocThangTruoc,
            soNuocThangNay,
            tongSoNuoc,
            tongGiaNuoc,
            soNgayO,
            tongTienPhong,
            tongHoaDon,
            ghiChu,
            phongId,
        })
    }
}

const billAPI = new BillAPI();
export default billAPI;