module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {key: 'Access-Control-Allow-Credentials', value: 'true'},
          {key: 'Access-Control-Allow-Origin', value: '*'},
          {key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS, PATCH, DELETE, POST, PUT'},
          {key: 'Access-Control-Allow-Headers', value: 'X-CSRF-TOKEN, X-Requested-With'},
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Access-Control-Expose-Headers', value: 'Authorization' }
        ]
      }
    ]
  }
}