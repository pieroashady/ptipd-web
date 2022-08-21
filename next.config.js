module.exports = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["localhost", "absensmkn5-kab.xyz"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
};
