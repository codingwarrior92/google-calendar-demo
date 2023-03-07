import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
    selector: 'create-appointment-dialog',
    templateUrl: './create.appointment.dialog.html',
    styleUrls: ['./create.appointment.dialog.css']
})
export class CreateAppointmentDialog {
    public appointment: ISchedule;
    public titleFormControl = new FormControl('', [Validators.required]);
    public matcher = new MyErrorStateMatcher();
    constructor(
      public dialogRef: MatDialogRef<CreateAppointmentDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { 
        this.appointment = data.appointment;
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    onSaveClick(): void {
      var dailycontent: IContent = {
        hour: this.data.hour,
        title: this.data.title,
        description: this.data.description,
  
      };
      console.log(this.data.dateString, typeof (this.data.dateString));
      var exsitingData = this.appointment[this.data.dateString] ?? [];
      this.appointment = {
        [this.data.dateString]: [...exsitingData, dailycontent]
      };
      this.dialogRef.close(this.appointment);
    }
    onDelete(): void {
      const index = this.appointment[this.data.dateString]?.findIndex((item) => item.hour === this.data.hour);
      this.appointment[this.data.dateString]?.splice(index, 1);
      console.log(index);
      this.dialogRef.close(this.appointment);
    }
    getTitle(event: any) { // without type info
      this.data.title = event.target.value;
    }
    getDescription(event: any) { // without type info
      this.data.description = event.target.value;
    }
  
    getExistingData(): IContent | undefined {
        console.log(this.appointment);
      return this.appointment[this.data.dateString]?.find((item) => item.hour === this.data.hour);
    }
  
  }
  export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

  export interface DialogData {
    title: "",
    currentTime: null;
    description: "",
    year: null,
    month: null,
    day: null,
    hour: null,
    dateString: string,
    appointment: ISchedule
  }
  export interface IContent {
    hour?: number | null,
    title?: string,
    description?: string,
  }
  export interface ISchedule {
    [key: string]: IContent[],
  }