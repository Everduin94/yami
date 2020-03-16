import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private af: AngularFirestore) { }

  getAll(tableName) {
    return this.af.collection(tableName);
  }

  get(tableName, id): AngularFirestoreDocument<any> {
    return this.getAll(tableName).doc(id);
  }

  getWhere(tableName, fn: (ref: CollectionReference) => any) {
    return this.af.collection(tableName, fn);
  }

  delete(tableName, id) {
    return this.get(tableName,id).delete();
  }

  create(tableName, entry: any) {
    return this.getAll(tableName).add(entry);
  }

  createItemsEntryById(tableName, userId, entry: any) {
    return this.get(tableName, userId).collection("items").add(entry);
  }

  updateItemsEntryById(tableName, userId, documentId, entry: any) {
    return this.get(tableName, userId).collection("items").doc(documentId).update(entry);
  }

  deleteItemsEntryById(tableName, userId, documentId) {
    return this.get(tableName, userId).collection("items").doc(documentId).delete();
  }

  update(tableName, id, entry: any) {
    return this.get(tableName, id).update(entry);
  }
}
