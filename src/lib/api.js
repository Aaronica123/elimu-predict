// API client for communicating with the Spring Boot backend
// Update BASE_URL when deploying or connecting to the real backend
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
class ApiClient {
    getToken() {
        return sessionStorage.getItem("elimu_token");
    }
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        };
        if (token)
            headers["Authorization"] = `Bearer ${token}`;
        const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
        if (res.status === 401) {
            sessionStorage.removeItem("elimu_token");
            sessionStorage.removeItem("elimu_user");
            window.location.href = "/login";
            throw new Error("Session expired");
        }
        if (!res.ok) {
            const err = await res.json().catch(() => ({ message: "Request failed" }));
            throw new Error(err.message || `HTTP ${res.status}`);
        }
        return res.json();
    }
    get(endpoint) {
        return this.request(endpoint);
    }
    post(endpoint, body) {
        return this.request(endpoint, { method: "POST", body: JSON.stringify(body) });
    }
    put(endpoint, body) {
        return this.request(endpoint, { method: "PUT", body: JSON.stringify(body) });
    }
}
export const api = new ApiClient();
