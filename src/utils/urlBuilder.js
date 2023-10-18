export class UrlBuilder {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  build(data) {
    const params = data?.params || {};
    const paths = data?.paths || [];

    let url = this.#baseUrl;

    if (paths.length) {
      paths.forEach((path) => {
        url += `/${path}`;
      });
    }

    if (Object.keys(params).length) {
      url += "?";
      let i = 0;
      for (const key in params) {
        if (i > 0) {
          url += "&";
        }
        url += `${key}=${params[key]}`;
        i++;
      }
    }
    return url;
  }

  getHeader(data) {
    const headers = {
      "x-session-token": data.accessToken
        ? data.accessToken
        : "Bearer invalidToken",
      "Content-Type": "application/json",
    };

    return headers;
  }
}
