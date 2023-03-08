import { createAction, props } from '@ngrx/store';
import { Animal } from 'src/utils/types/Animal';

//Props types
type IdProp = { id: number | string };
type AnimalProp = { animal: Animal };
type ErrorProp = { error: string };

//GET ANIMALS
export const loadAnimals = createAction(
  '[Animals List Component] Load Animals',
  props<{ filter: string }>()
);

export const loadAnimalsSuccess = createAction(
  '[Animals List Component] Animals Load Success',
  props<{ animals: Animal[] }>()
);

export const loadAnimalsFailure = createAction(
  '[Animals List Component] Animals Load Failure',
  props<ErrorProp>()
);

//ADD ANIMAL
export const addAnimal = createAction(
  '[Form Component] Add Animal',
  props<AnimalProp>()
);

export const addAnimalSuccess = createAction(
  '[Form Component] Add Animal Success',
  props<AnimalProp>()
);

export const addAnimalFailure = createAction(
  '[Form Component] Add Animal Failure',
  props<ErrorProp>()
);

//DELETE ANIMAL
export const deleteAnimal = createAction(
  '[Animals List Component] Delete Animal',
  props<{ animal: Omit<Animal, 'id'> & { id: string | number } }>()
);

export const deleteAnimalSuccess = createAction(
  '[Animals List Component] Delete Animal Success',
  props<IdProp>()
);

export const deleteAnimalFailure = createAction(
  '[Animals List Component] Delete Animal Failure',
  props<ErrorProp>()
);
