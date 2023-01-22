/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI: "mongodb+srv://mytemplateusername:mytemplatepassword@atlascluster.oewzuja.mongodb.net/?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
