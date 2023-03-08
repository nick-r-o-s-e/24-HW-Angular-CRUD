import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Store, select } from '@ngrx/store';
import { addAnimal } from '../../state/animalsState/animals.actions';
import { errorSelector } from 'src/app/state/animalsState/animals.selectors';
import { Observable } from 'rxjs';

//Types and variables
import { Animal } from 'src/utils/types/Animal';
import { AppState } from 'src/app/state/app.state';
import { groups } from 'src/utils/Variables';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  error$: Observable<string | null>;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.error$ = this.store.pipe(select(errorSelector));
  }
  groups = groups;
  buttonDisabled = false;

  formGroup = this.formBuilder.group({
    id: uuidv4(),
    name: [
      '',
      [Validators.required, Validators.maxLength(43)], //Maximum lenght of the animal name
    ],
    image: [''],
    group: ['', Validators.required],
  });

  clearInput(name: 'name' | 'image' | 'group') {
    this.formGroup.value[name] = '';
  }

  submitForm() {
    if (this.formGroup.valid) {
      this.buttonDisabled = true;

      this.store.dispatch(
        addAnimal({ animal: this.formGroup.value as Animal })
      );
      this.error$.subscribe((err) => {
        //Reset submit button if error (after 3 seconds)
        setTimeout(() => {
          this.buttonDisabled = false;
        }, 3000);
      });
    }
  }
}
