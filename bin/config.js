module.exports = {
  env: process.env.NODE_ENV,
  localhost: 'local.dev',
  domain: 'nuotron.co',
  db: 'library',
  port: function() {
    const val = process.env.PORT || '3000'
    const port = parseInt(val, 10)

    if(isNaN(port)) return val
    if(port >= 0) return port
    return false
  },
  url: function() {
    if(this.env === 'development')
      return `${this.localhost}:${this.port()}`)
    else if(this.env === 'production')
      return this.domain
  },
  database: function() {
    if(this.env === 'development')
      return `mongodb://${this.localhost}/${this.db}`)
    else if(this.env === 'production')
      return `mongodb://${this.domain}/${this.db}`)
  }
}
