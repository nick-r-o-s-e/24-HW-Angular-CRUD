import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatChipListboxChange } from '@angular/material/chips';

//Types and variables
import { Animal } from 'src/utils/types/Animal';
import { AppState } from 'src/app/state/app.state';
import { groups } from 'src/utils/Variables';

//Actions
import {
  deleteAnimal,
  loadAnimals,
} from '../../state/animalsState/animals.actions';

//Selectors
import {
  allAnimalsSelector,
  loadingSelector,
} from 'src/app/state/animalsState/animals.selectors';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss'],
})
export class AnimalsListComponent {
  allAnimals$: Observable<Animal[]>;
  loading$: Observable<boolean>;
  filterOption: string = '';
  groups: string[] = [];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.allAnimals$ = this.store.pipe(select(allAnimalsSelector));
    this.loading$ = this.store.pipe(select(loadingSelector));
    this.groups = groups;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const queryParam = params['group'] || 'All';
      if (this.groups.includes(queryParam)) {
        this.filterOption = queryParam;
      } else {
        this.filterOption = 'All';
        this.router.navigate(['/animals']);
      }
      this.store.dispatch(loadAnimals({ filter: this.filterOption }));
    });
  }

  selectFilter(e: MatChipListboxChange) {
    const option = e.value;
    if (option != this.filterOption) {
      const queryParams: Params = { group: option };
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      this.filterOption = option;
      this.store.dispatch(loadAnimals({ filter: this.filterOption }));
    }
  }

  deleteAnimal(animal: Animal) {
    this.store.dispatch(
      deleteAnimal({
        animal: animal as Omit<Animal, 'id'> & { id: string | number },
      })
    );
  }
}
