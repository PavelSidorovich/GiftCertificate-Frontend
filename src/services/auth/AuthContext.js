import axios from "axios";

import { apiUrl } from "../../constants/Constants";

class AuthContext {
  constructor() {
    this.apiUrl = apiUrl;
  }

  init = () => {
    const apiToken = window.localStorage.getItem("ACCESS_TOKEN");
    const headers = {
      Accept: "application/json",
    };
    if (apiToken) {
      headers.Authorization = `Bearer ${apiToken}`;
    }
    return axios.create({
      baseURL: this.apiUrl,
      timeout: 31000,
      headers: headers,
    });
  };

  signUp(credentials) {
    return this.init().post("/auth/register", credentials);
  }

  async login(credentials) {
    return this.init()
      .post("/auth/login", credentials)
      .then((res) => {
        window.localStorage.setItem("ACCESS_TOKEN", res.data);
        window.localStorage.setItem(
          "ROLE",
          this.parseJwt(res.data).roles[0].authority
        );
        return { data: res.data, status: res.status };
      });
  }

  logout() {
    window.localStorage.removeItem("ACCESS_TOKEN");
    window.localStorage.removeItem("ROLE");
  }

  isLoggedIn() {
    if (
      window.localStorage.getItem("ACCESS_TOKEN") &&
      window.localStorage.getItem("ROLE")
    ) {
      return true;
    }

    return false;
  }

  getAuthenticatedUserRole() {
    if (this.isLoggedIn) {
      return window.localStorage.getItem("ROLE");
    }
  }

  isAdmin() {
    const role = window.localStorage.getItem("ROLE");
    return role ? role.includes("ADMIN") : false;
  }

  getAuthenticatedUserEmail() {
    if (this.isLoggedIn()) {
      return this.parseJwt(window.localStorage.getItem("ACCESS_TOKEN")).sub;
    }
  }

  getAuthenticatedUserId() {
    if (this.isLoggedIn()) {
      return this.parseJwt(window.localStorage.getItem("ACCESS_TOKEN")).id;
    }
  }

  getAuthenticatedUser() {
    if (this.isLoggedIn()) {
      const params = { email: this.getAuthenticatedUserEmail() };
      return this.init().get(`/users`, { params: params });
    }
  }

  parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
}

const AUTH_CONTEXT = new AuthContext();

export default AUTH_CONTEXT;
