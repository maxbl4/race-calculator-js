import { Injectable } from '@angular/core';
import Backendless from 'backendless';

@Injectable()
export class DataService {
  async loadCheckpoints(): Promise<string> {
    var whereClause = "name = 'checkpoints'";
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause( whereClause );
    const found: any = await Backendless.Data.of('TestTable').findFirst(queryBuilder);
    console.log(found);
    if (found) return found.data;
    return null;
  }

  async saveCheckpoints(data: string): Promise<object> {
    return Backendless.Data.of('TestTable').save({ name: 'checkpoints', data: data })
  }
}
