import axiosClient from "./axiosClient";

class SummaryAPI {
    getSummary = (month, year, userId) => {
        const url = `TongKet/get-tongketthang/${month}/${year}?UserId=${userId}`;
        return axiosClient.get(url);
    }
}

const summaryAPI = new SummaryAPI();
export default summaryAPI;