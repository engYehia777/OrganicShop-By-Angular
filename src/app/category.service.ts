import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable, Query } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list<any>('/categories').snapshotChanges().pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))));
  }
}
