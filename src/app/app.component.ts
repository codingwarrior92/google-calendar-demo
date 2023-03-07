import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentDialog, ISchedule } from './mdialog/create-appointment-dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public selected = Date();
  public appointment: ISchedule = {};
  constructor(public dialog: MatDialog) { }
  openCreateAppointment() {
    console.log(this.appointment, 'app');
    const dialogRef = this.dialog.open(CreateAppointmentDialog, {
      data: {
        title: "",
        currentTime: new Date().getHours() + ":00/" + new Date(this.selected).toLocaleDateString("en-GB"),
        description: "",
        dateString: new Date(this.selected).toLocaleDateString("en-GB"),
        hour: new Date().getHours(),
        appointment: this.appointment
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointment = result;
      }
    });
  }
}
