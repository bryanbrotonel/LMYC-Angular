
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        selectable: true,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: data

      };
    });
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay,
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }

  dayClick(model: any) {
    var date = new Date(model.date);
    alert("dayClicked! Day:" + date.getDay() + " Month " + date.getMonth() + "-------" + model.date.format() );
  }

  select(startDate: any, endDate : any) {
    alert('selected ' + startDate.format() + ' to ' + endDate.format());
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

}
