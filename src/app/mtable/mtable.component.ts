import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { range } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ISchedule, CreateAppointmentDialog } from '../mdialog/create-appointment-dialog';

@Component({
  selector: 'app-mtable',
  templateUrl: './mtable.component.html',
  styleUrls: ['./mtable.component.css']
})


export class MtableComponent {
  @Input() item = "";
  @Input() appointment: ISchedule = {} 
  timeLabels = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];
  fdate: Date = new Date();
  times = range(24); // [0...4]

  movies = [
    '1'
  ];

  drop(event: CdkDragDrop<string[]>) {
    const date = this.formatDate(this.item);
    const prevIndex = this.appointment[date].findIndex((item) => item.hour === event.previousIndex);
    const curIndex = this.appointment[date].findIndex((item) => item.hour === event.currentIndex);
    if(this.appointment[date][prevIndex]) {this.appointment[date][prevIndex].hour = event.currentIndex;}
    if(this.appointment[date][curIndex]) {this.appointment[date][curIndex].hour = event.previousIndex;}
    moveItemInArray(this.appointment[date], event.previousIndex, event.currentIndex);

  }

  formatDate(item: string) {
    return new Date(item).toLocaleDateString("en-GB");
  }
  constructor(public dialog: MatDialog) { }

  openCreateAppointment(time: any) {
    const dialogRef = this.dialog.open(CreateAppointmentDialog, {
      data: {
        title: "",
        currentTime: time + ":00/" + new Date(this.item).toLocaleDateString("en-GB"),
        description: "",
        dateString: new Date(this.item).toLocaleDateString("en-GB"),
        hour: time,
        appointment: this.appointment
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointment = result;
      }
    });
  }


  getDailySchedule(hour: number) {
    var searchDate = new Date(this.item).toLocaleDateString("en-GB");
    return this.appointment[searchDate]?.find(item => item.hour === hour);
  }

}


