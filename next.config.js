module.exports = {
  /* config options here */
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboards/absen",
        permanent: true,
      },
    ];
  },
};
