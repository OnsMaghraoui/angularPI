import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../front/service/event.service";
import * as Rellax from "rellax";
import {IAlert} from "../../../front/components/notification/notification.component";
import {Event} from 'app/front/class/event'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpHeaders} from "@angular/common/http";
import { TypeEvent } from '../../../front/class/TypeEvent';







@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  id_event: number;
  isUpdate: boolean = false;
  event: Event = new Event();
  eventForm: FormGroup;

  events: Event[];
  alerts: Array<IAlert> = [];
  updateMode: boolean = false;

  showUpdateForm = false;


  constructor(private eventService: EventService,private router: Router, private route: ActivatedRoute, private formBuilder : FormBuilder) {
  }


  ngOnInit(): void {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');


    this.eventForm = this.formBuilder.group({
      name_event: ['', Validators.required],
      type_event: ['', Validators.required],
      price_event: ['', Validators.required],
      place_event: ['', Validators.required],
      date_event: ['', Validators.required],
      description_event: ['', Validators.required]
    });


    this.route.paramMap.subscribe(params => {
      const id = +params.get('id'); // add a plus sign to convert the string to a number
      if (id) {
        this.updateMode = true;
        this.eventService.getEvent(id).subscribe(event => {
          this.eventForm.setValue({
            id: event.id_event,
            name: event.name_event,
            type: event.type_event,
            price: event.price_event,
            place: event.place_event,
            date: event.date_event,
            description: event.description_event
          });
        });
      } else {
        this.eventForm.reset();
        this.updateMode = false;
      }
    });

    this.showEvent();
    this.getEvent();



  }
  showEvent():void{
    this.eventService.retrieveAllevents().subscribe(
        events => {
          this.events = events;
        }
    );
  }

  getEvent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(id).subscribe(event => (this.event = event));
  }

  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
  }


  updateEvent(id_event: number, eventData: Event) {
    this.eventService.updateEvent(id_event, eventData).subscribe(
        updatedEvent => {
          this.event = updatedEvent;
          this.alerts.push({
            id: 2,
            type: 'success',
            strong: 'Success!',
            message: 'Event updated successfully.',
            icon: 'ui-2_like'
          });
          this.showUpdateForm = false; // hide the form after successful update
        },
        error => {
          this.alerts.push({
            id: 3,
            type: 'danger',
            strong: 'Error!',
            message: 'Failed to update event.',
            icon: 'ui-1_bell-53'
          });
        }
    );
  }





  onSubmit(form) {
    if (this.isUpdate) {
      this.eventService.updateEvent(this.id_event, this.event).subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err)
      );
    } else {
      this.eventService.addevent(form.value).subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err)
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }



  addEvent(eventData: Event) {
    this.eventService.addevent(eventData).subscribe(() => {
      console.log('Event added successfully');
      // Reset the form fields
      this.event = {};
    });

  }

  assignEventToUser(id_event: number) {
    const id_user = 2; // replace with actual user ID
    this.eventService.assignEventToUser(id_event, id_user).subscribe(
        Response => {
          console.log('Event assigned to user');
          this.alerts.push({
            id: 2,
            type: 'success',
            strong: 'Success!',
            message: 'An email was sent to the user to inform them.',
            icon: 'ui-2_like'
          });

        },
        error => {
          console.error('Error assigning event to user:', error);
        }
    );
    window.location.reload();
  }

  deleteevent(id_event:number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteevent(id_event).subscribe(
          Response=>{
            // Show success message
            this.alerts.push({
              id: 2,
              type: 'success',
              strong: 'Success!',
              message: 'event deleted successfully.',
              icon: 'ui-2_like'
            });
            window.location.reload();
          }
      );
    } else {
      this.alerts.push({
        id: 3,
        type: 'warning',
        strong: 'Cancelled!',
        message: 'event deletion cancelled.',
        icon: 'ui-1_bell-53'
      });
    }

  }


  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteevent(id).subscribe(() => {
        this.events = this.events.filter(event => event.id_event !== id);
        alert('Event deleted successfully.');
      });
    }
  }


  closeAlert(alert: any) {
    setTimeout(() => {
      const index: number = this.alerts.indexOf(alert);
      if (index !== -1) {
        this.alerts.splice(index, 1);
      }
    }, alert.visibleTime);
  }

}
