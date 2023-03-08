import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AnimalState } from './animals.reducer';

export const selectAnimals = (state: AppState) => state.animals;

export const allAnimalsSelector = createSelector(
  selectAnimals,
  (state: AnimalState) => state.animals
);
export const animalsSelector = createSelector(
  selectAnimals,
  (state: AnimalState) => state.animals
);
export const errorSelector = createSelector(
  selectAnimals,
  (state: AnimalState) => state.error
);
export const loadingSelector = createSelector(
  selectAnimals,
  (state: AnimalState) => state.isLoading
);
