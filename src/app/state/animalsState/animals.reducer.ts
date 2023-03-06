import { createReducer, on } from '@ngrx/store';
import { setAnimals, deleteAnimal, addAnimal} from "./animals.actions"
import { Animal } from 'src/assets/types/Animal';
export interface AnimalState {
  animals: Animal[];
  error: string|null;
  status: "pending"| "loading" | "error" | "success"
}


export const initialState:AnimalState = {
  animals: [],
  error: null,
  status: "pending"
  
};

export const animalsReducer = createReducer(
  initialState,
  // on(setAnimals, (state) => state + 1),
  on(deleteAnimal, (state, {id}) => ({
    ...state, animals: state.animals.filter(animal=> animal.id != id)
  })),
  on(addAnimal, (state, {data}) => ({
    ...state, animals: [...state.animals, data]
  }))
);


