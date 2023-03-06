import { createAction, props } from '@ngrx/store';
import { Animal } from 'src/assets/types/Animal';

export const setAnimals = createAction("[Animals List Component] GetData", props<{data: Animal[]}>());
export const deleteAnimal = createAction("[Animals List Component] Delete", props<{id: (string|number)}>());
export const addAnimal = createAction("[Animals List Component] Add", props<{data: Animal}>());
