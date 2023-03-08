import { createReducer, on } from '@ngrx/store';
import {
  deleteAnimal,
  addAnimalSuccess,
  addAnimal,
  loadAnimals,
  loadAnimalsSuccess,
  loadAnimalsFailure,
  deleteAnimalFailure,
  deleteAnimalSuccess,
  addAnimalFailure,
} from './animals.actions';
import { Animal } from 'src/utils/types/Animal';

export interface AnimalState {
  animals: Animal[];
  error: string | null;
  isLoading: boolean;
}

export const initialState: AnimalState = {
  animals: [],
  error: null,
  isLoading: false,
};

export const animalsReducer = createReducer(
  initialState,

  //LOAD ANIMALS
  on(loadAnimals, (state) => ({ ...state, isLoading: true })),

  on(loadAnimalsSuccess, (state, { animals }) => ({
    ...state,
    animals: animals,
    error: null,
    isLoading: false,
  })),

  on(loadAnimalsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  //ADD ANIMAL
  on(addAnimal, (state) => ({ ...state, isLoading: true })),

  on(addAnimalSuccess, (state, { animal }) => ({
    ...state,
    isLoading: false,
    error: null,
    animals: [...state.animals, animal],
  })),

  on(addAnimalFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  //DELETE ANIMAL

  on(deleteAnimal, (state) => ({ ...state })),

  on(deleteAnimalSuccess, (state, { id }) => ({
    ...state,
    error: null,
    animals: state.animals.filter((animal) => animal.id != id),
  })),

  on(deleteAnimalFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
