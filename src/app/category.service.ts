import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable, Query } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories').valueChanges();
  }
}
