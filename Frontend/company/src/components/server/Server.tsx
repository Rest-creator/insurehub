import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000'; // Ensure this matches your FastAPI server URL
const API_URL = ' http://127.0.0.1:8000';  // Your machine's IP on the local network

class Server {
    static companySignin(data) {
       return axios.post(`${API_URL}/company/login/`, data, {
            headers: { "Content-Type": "application/json" },
        });
    }
    static signup(data) {
        return axios.post(`${API_URL}/company/signup/`, data, {
            headers: { "Content-Type": "application/json" },
        });
    }

    static signin(data) {
        return axios.post(`${API_URL}/auth/login/`, data, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // add article
    static addArticle(data) {
        return axios.post(`${API_URL}/articles/`, data, {
            headers: { "Content-Type": "application/json" },
        });
    }
    // get all articles
    static getArticles() {
        return axios.get(`${API_URL}/articles/`, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // add marketplace product
    static addMarketplaceProduct(data) {
        return axios.post(`${API_URL}/companies/product/email`, data, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // get all marketplace products
    static getMarketplaceProducts() {
        return axios.get(`${API_URL}/products`, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // get admin dashboard stats
    static getAdminDashboardStats() {
        return axios.get(`${API_URL}/counts/`, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // add company profile
    static addCompanyProfile(data) {
        return axios.post(`${API_URL}/companies/`, data, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // get company profile
    static getCompanyProfile(email) {
        return axios.get(`${API_URL}/companies/email/${email}/`, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // get all companies
    static getCompanies() {
        return axios.get(`${API_URL}/companies/`, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // get company claims
    static getCompanyClaims(company_id) {
        return axios.get(`${API_URL}/claims/company/${company_id}/`, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // get user stats
    static getUserStats(email) {
        return axios.get(`${API_URL}/policies/${email}/`, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // get user claims stats
    static getUserClaimsStats(email) {
        return axios.get(`${API_URL}/claims/stats-optimized/${email}/`, {
            headers: { "Content-Type": "application/json" },
        });
    }

    // file a claim
    static fileClaim(data) {
        return axios.post(`${API_URL}/claims/`, data, {
            headers: { "Content-Type": "application/json" },
        });
    }
}
export default Server