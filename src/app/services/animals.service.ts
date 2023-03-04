import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from 'src/assets/types/Animal';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  constructor(private _http: HttpClient) {}

  animalsURL = 'http://localhost:3000/animals';
  getAllAnimals() {
    return this._http.get<Animal[]>(this.animalsURL);
  }

  addAnimal(
    animal: Partial<{
      name: string | null;
      image: string | null;
      group: string | null;
    }>
  ) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(animal);
    return this._http.post(this.animalsURL, body, { headers: headers });
  }

  deleteAnimal(id: string) {
    return this._http.delete(this.animalsURL + `/${id}`);
  }
}
