export const configuration = (): {
  database: {
    host: string
    port: number
    username: string
    password: string
    database: string
  }
  appPort: number
} => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  },
  appPort: Number(process.env.APP_PORT)
})
