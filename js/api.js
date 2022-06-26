const axios = require("axios").default;

const apiUrl = "http://localhost:8080";

class CertificateApi {
  constructor() {
    this.apiToken = null;
    this.client = null;
    this.apiUrl = apiUrl;
  }

  init = (headers) => {
    // this.apiToken = Cookies.get("ACCESS_TOKEN");
    if (!headers) {
      headers = {
        Accept: "application/json",
      };
    }
    if (this.apiToken) {
      headers.Authorization = `Bearer ${this.apiToken}`;
    }
    this.client = axios.create({
      baseURL: this.apiUrl,
      timeout: 31000,
      headers: headers,
    });
    return this.client;
  };

  getUsers(params) {
    return this.init().get("/users", { params: params });
  }

  createTag(tag) {
    return this.init().post("/tags", tag);
  }

  getTags(params) {
    return this.init().get("/tags", { params: params });
  }

  deleteTag(id) {
    return this.init().delete(`/tags/${id}`);
  }

  createCertificate(data) {
    return this.init().post("/certificates", data);
  }

  getCertificates(params) {
    return this.init().get("/certificates", { params: params });
  }

  getCertificateById(id) {
    return this.init().get(`/certificates/${id}`);
  }

  updateCertificate(id, data) {
    return this.init().patch(`/certificates/${id}`, data);
  }

  deleteCertificate(id) {
    return this.init().delete(`/certificates/${id}`);
  }

  getUserOrders(id, params) {
    return this.init().get(`/users/${id}/orders`, { params: params });
  }

  getUserOrder(userId, orderId, params) {
    return this.init().get(`/users/${userId}/orders/${orderId}`, {
      params: params,
    });
  }

  getUserCart(id) {
    return this.init().get(`/users/${id}/cart`);
  }

  checkoutUserCart(userId) {
    return this.init().post(`/users/${userId}/cart`);
  }

  addToCart(userId, certificateId) {
    return this.init().post(`/users/${userId}/cart/${certificateId}`);
  }

  removeFromCart(userId, certificateId) {
    return this.init().delete(`/users/${userId}/cart/${certificateId}`);
  }

  getWidelyUsedTag() {
    return this.init().get(`/stats/tags`);
  }

  getRevenueChartData(params) {
    return this.init().get(`/stats/revenue`, { params: params });
  }

  getIncomeByDays(params) {
    return this.init().get(`/stats/day-orders`, { params: params });
  }

  getReport(params) {
    return this.init().get(`/reports/company-statistics`, {
      params: params,
      responseType: "blob",
    });
  }

  getUserOrderBill(userId, orderId) {
    return this.init().get(`/reports/bill/${userId}/orders/${orderId}`, {
      responseType: "blob",
    });
  }

  getUser(id) {
    return this.init().get(`/users/${id}`);
  }

  updateUser(user) {
    return this.init().patch(`/users`, user);
  }

  changePassword(user) {
    return this.init().patch(`/users/password`, user);
  }
}

const api = new CertificateApi();

module.exports = { api };
