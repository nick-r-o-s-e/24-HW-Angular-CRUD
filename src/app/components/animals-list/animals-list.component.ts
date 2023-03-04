import { Component } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { AnimalsService } from 'src/app/services/animals.service';
import { Animal } from 'src/assets/types/Animal';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss'],
})
export class AnimalsListComponent {
  constructor(private _apiservice: AnimalsService) {}

  data: Animal[] = [];

  animals: Animal[] = [];

  filterOption = 'All';
  ngOnInit() {
    this._apiservice.getAllAnimals().subscribe((res) => {
      this.data = res;
      this.animals = res;
    });
  }

  selectFilter(e: MatChipListboxChange) {
    const option = e.value || this.filterOption;
    this.filterOption = option;

    this.animals =
      option == 'All'
        ? this.data
        : this.data.filter((animal) => animal.group == e.value);
  }

  deleteAnimal(id: string | number) {
    this._apiservice.deleteAnimal(String(id)).subscribe((res) => {
      this.ngOnInit();
    });
  }
}
