import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {
  addAnimal,
  deleteAnimal,
  addAnimalFailure,
  loadAnimals,
  loadAnimalsSuccess,
  loadAnimalsFailure,
  addAnimalSuccess,
  deleteAnimalFailure,
  deleteAnimalSuccess,
} from './animals.actions';

import { AnimalsService } from 'src/app/services/animals.service';

const getGroupTwoForms = (group: string): string[] => {
  const groupSingularForm =
    group == 'Fishes' ? group.slice(0, -2) : group.slice(0, -1);

  return [group, groupSingularForm];
};

@Injectable()
export class AnimalsEffects {
  constructor(
    private actions$: Actions,
    private animalsService: AnimalsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loadAnimals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAnimals),
      mergeMap(({ filter }) => {
        return this.animalsService.getAllAnimals(filter).pipe(
          map((animals) => loadAnimalsSuccess({ animals })),

          catchError((error) =>
            of(loadAnimalsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  addAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAnimal),
      mergeMap(({ animal }) => {
        return this.animalsService.addAnimal(animal).pipe(
          map(() => {
            const [group, groupSingularForm] = getGroupTwoForms(animal.group);

            //Navigate to created animal`s group
            this.router.navigateByUrl(
              `/animals${group == 'All' ? '' : `?group=${group}`}`
            );

            this.toastr.success(
              `New ${groupSingularForm.toLowerCase()} has been added`,
              'Success!'
            );

            return addAnimalSuccess({ animal: animal });
          }),

          catchError((error) => {
            this.toastr.error(
              'Failed to add new animal.',
              'Oopss! Something went wrong.'
            );

            return of(addAnimalFailure({ error: error.message }));
          })
        );
      })
    )
  );
  deleteAnimal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAnimal),
      mergeMap(({ animal }) => {
        return this.animalsService.deleteAnimal(animal.id).pipe(
          map(() => {
            const [_, groupSingularForm] = getGroupTwoForms(animal.group);

            this.toastr.success(
              `${groupSingularForm} has been deleted`,
              'Success!'
            );

            return deleteAnimalSuccess({ id: animal.id });
          }),

          catchError((error) => {
            this.toastr.error(
              'Failed to delete animal.',
              'Oopss! Something went wrong.'
            );

            return of(deleteAnimalFailure({ error: error.message }));
          })
        );
      })
    )
  );
}
