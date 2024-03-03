import axiosClient from "./axiosClient";

class SummaryAPI {
    getSummary = (month, year) => {
        const url = `TongKet/get-tongketthang/${month}/${year}`;
        return axiosClient.get(url);
    }
}

const summaryAPI = new SummaryAPI();
export default summaryAPI;