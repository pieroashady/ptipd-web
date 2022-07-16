module.exports = {
  /* config options here */
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboards/dashboard1",
        permanent: true,
      },
    ];
  },
};
