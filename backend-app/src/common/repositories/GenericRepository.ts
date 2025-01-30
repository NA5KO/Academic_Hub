import { Repository, EntityTarget, DataSource } from 'typeorm';

export class GenericRepository<T> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }
}
