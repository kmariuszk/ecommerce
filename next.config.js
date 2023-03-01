/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI: "mongodb+srv://mytemplateusername:mytemplatepassword@atlascluster.oewzuja.mongodb.net/?retryWrites=true&w=majority",
    STRIPE_PUBLISHABLE_KEY: "pk_test_51MdI5aGeBqWNyctHQtENbco2NBAnYTK4qGwouQzuCOJYMDnbTnjWj0MiVe7C8x8EZ0PrtFdPT5vpyZEI86AbzyEG008vXuDkSE",
    STRIPE_SECRET_KEY: "sk_test_51MdI5aGeBqWNyctHwttqsAyO4yhCh0M5rB6wuE5KWva8ONveC1VPMcjVlOBfrAZa1Avg2pQ3wXvGPqdKkeZl6VJl00LqoEs7SQ",
  },
}

module.exports = nextConfig
