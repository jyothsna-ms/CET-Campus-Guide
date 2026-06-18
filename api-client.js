const api = (() => {
  async function request(path, options = {}) {
    const response = await fetch(path, {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json", ...(options.headers || {})},
      ...options,
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (!response.ok) throw new Error(data?.error || "Request failed");
    return data;
  }
  return {
    session: () => request("/api/session"),
    signup: body => request("/api/auth/signup", {method: "POST", body}),
    login: body => request("/api/auth/login", {method: "POST", body}),
    logout: () => request("/api/auth/logout", {method: "POST", body: {}}),
    guide: () => request("/api/guide"),
    saveGuide: body => request("/api/guide", {method: "POST", body}),
    locations: () => request("/api/locations"),
    createLocation: body => request("/api/locations", {method: "POST", body}),
    updateLocation: (id, body) => request(`/api/locations/${encodeURIComponent(id)}`, {method: "PUT", body}),
    deleteLocation: id => request(`/api/locations/${encodeURIComponent(id)}`, {method: "DELETE"}),
    profile: () => request("/api/profile"),
    saveProfile: body => request("/api/profile", {method: "POST", body})
  };
})();

