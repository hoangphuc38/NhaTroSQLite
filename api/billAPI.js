import axiosClient from "./axiosClient";

class BillAPI {
    getHoaDonPhong = (id, month, year) => {
        const url = `HoaDonPhong/get-hoadon/${id}/${month}/${year}`;
        return axiosClient.get(url);
    }

    createHoaDonPhong = (
        ngayHoaDon,
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
        const url = `HoaDonPhong/new-hoadon`;
        return axiosClient.post(url, {
            ngayHoaDon,
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