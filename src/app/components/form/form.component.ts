import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnimalsService } from 'src/app/services/animals.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private _apiservice: AnimalsService,
    private router: Router
  ) {}

  formGroup = this.formBuilder.group({
    id: uuidv4(),
    name: ['', Validators.required],
    image: ['', Validators.required],
    group: ['', Validators.required],
  });

  clearInput(name: 'name' | 'image' | 'group', e: any) {
    if (e.pointerId != -1) {
      this.formGroup.value[name] = '';
    }
  }

  submitForm() {
    if (this.formGroup.valid) {
      this._apiservice.addAnimal(this.formGroup.value).subscribe((data) => {
        this.formGroup.reset();
        this.router.navigate(['/animals']);
      });
    }
  }
}
