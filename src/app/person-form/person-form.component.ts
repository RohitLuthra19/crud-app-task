import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { PersonService } from '../person.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  personForm: FormGroup;
  submitted = false;
  name = '';
  mobileNo = '';
  emailId = '';

  constructor(private formBuilder: FormBuilder, private personService: PersonService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PersonFormComponent>) { }

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[1-9][0-9]{9}$/)]]
    });
  }

  // convenience getter for easy access to form fields
  get formField() {
    return this.personForm.controls;
  }

  getErrorMessage() {
    return this.personForm.get('emailId').hasError('required') ?
      'You must enter a value' : this.personForm.get('emailId').hasError('email') ? 'Not a valid email Id' : '';
  }

  onFormSubmit(form: NgForm, data) {
    this.submitted = true;
    if (this.personForm.invalid) {
      return;
    } else {
      if (data.operation == 'add') {
        this.personService.savePersons(form)
          .subscribe(res => {
            console.log(res);
            alert('Person added successfully');
          }, (err) => {
            console.log(err);
          });
      } else if (data.operation == 'update') {
        this.personService.updatePersons(data.id, form)
          .subscribe(res => {
            alert('Person updated successfully');
          }, (err) => {
            console.log(err);
          });
      }
      //this.personForm.reset();
    }
  }

}
