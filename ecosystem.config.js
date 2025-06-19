module.exports = {
  apps: [
    {
      name: "client",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/root/client",
      env: {
        NODE_ENV: "production",
        NEXTAUTH_URL: "http://82.29.184.137:3000",
        NEXTAUTH_SECRET: "your-secret-key", // must match your JWT signing secret
        NEXTAUTH_DEBUG: "true",
      },
    },
  ],
};
