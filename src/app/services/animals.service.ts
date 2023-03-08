import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from 'src/utils/types/Animal';
import { FormData } from 'src/utils/types/FormData';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  constructor(private _http: HttpClient) {}

  animalsURL = 'http://localhost:3000/animals';

  getAllAnimals(filter: string) {
    return this._http.get<Animal[]>(
      this.animalsURL + (filter == 'All' ? '' : `?group=${filter}`)
    );
  }

  addAnimal(animal: Partial<FormData>) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(animal);
    return this._http.post<Response>(this.animalsURL, body, {
      headers: headers,
    });
  }

  deleteAnimal(id: string | number) {
    return this._http.delete<Response>(this.animalsURL + `/${String(id)}`);
  }
}
