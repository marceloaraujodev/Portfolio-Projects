// next.config.js
module.exports = {
  // ... other Next.js configurations

  // Your dynamic route configuration
  async rewrites() {
    return [
      {
        source: '/post/:id',
        destination: '/post', // This should point to the actual page component
      },
    ];
  },
};