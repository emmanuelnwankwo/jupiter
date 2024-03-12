import { DataSource, type DataSourceOptions } from 'typeorm'
import { configuration } from '..'

export const dataSourceOptions: DataSourceOptions = {
  ...configuration().database,
  type: 'postgres',
  //   synchronize: true,
  // migrations: [__dirname + '/migrations/*{.ts,.js}'
  // ],
  migrationsRun: true,
  entities: [__dirname + '/dist/**/*.entity.js'],
  migrations: [__dirname + '/dist/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
