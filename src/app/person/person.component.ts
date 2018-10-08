import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PersonService } from '../person.service';
import { PersonFormComponent } from '../person-form/person-form.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons: any;
  confirmationDialogRef: MatDialogRef<ConfirmationDialogComponent>;
  personAddUpdateDialogRef: MatDialogRef<PersonFormComponent>;

  constructor(private personService: PersonService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadPersons();
  }

  openSaveDialog() {
    this.personAddUpdateDialogRef = this.dialog.open(PersonFormComponent, {
      data: { operation: 'add' },
    });
    this.personAddUpdateDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result) {
        this.personAddUpdateDialogRef.close();
        this.loadPersons();
      }
      this.personAddUpdateDialogRef = null;
    });
  }



  openUpdateDialog(person) {
    this.personAddUpdateDialogRef = this.dialog.open(PersonFormComponent, {
      data: { operation: 'update', personData: person },
    });

    this.personAddUpdateDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result) {
        this.personAddUpdateDialogRef.close();
        this.loadPersons();
      }
      this.personAddUpdateDialogRef = null;
    });
  }

  openDeleteDialog(id) {
    this.confirmationDialogRef = this.dialog.open(ConfirmationDialogComponent);

    this.confirmationDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result) {
        this.personService.deletePersons(id)
          .subscribe(res => {
            alert('Person deleted successfully');
            this.loadPersons();
          }, (err) => {
            console.log(err);
          });
      }
      this.confirmationDialogRef = null;
    });
  }

  loadPersons() {
    this.personService.getPersons()
      .subscribe(res => {
        console.log(res);
        this.persons = res;
      }, err => {
        console.log(err);
      });
  }
}
