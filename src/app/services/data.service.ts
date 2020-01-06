import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  loadCheckpoints() {
    return localStorage.getItem('checkpoints');
  }

  saveCheckpoints(data: string) {
    return localStorage.setItem('checkpoints', data);
  }
}
