export const cases = [
  {
    name: "create service A and routeA",
    service_name: "svcA",
    serviceUrl: "http://httpbin.konghq.com",
    serviceUrl_validate: "httpbin.konghq.com",
    routeName: "routeA",
    routePath: "/api/v1",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"]
  },
  {
    name: "create service B and routeB",
    service_name: "svcB",
    serviceUrl: "http://httpbin.konghq.com",
    serviceUrl_validate: "httpbin.konghq.com",
    routeName: "routeB",
    routePath: "/api/v1",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"]
  }
];
