import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Event} from 'app/front/class/event';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8081/gnb/event';

  private events: Event[] = [];

  constructor(private http: HttpClient) { }

  retrieveAllevents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/all`);
  }

  assignEventToUser(id_event: number, id_user: number): Observable<any> {
    const url = `${this.baseUrl}/${id_event}/assign/${id_user}`;
    return this.http.post(url, {});
  }


  updateEventLikes(eventId: number, userId: number, action: string): Observable<Event> {
    const url = `${this.baseUrl}/likes/${eventId}?userId=${userId}&action=${action}`;
    return this.http.patch<Event>(url, null)
        .pipe(
            tap(updatedEvent => {
              const index = this.events.findIndex(event => event.id_event === updatedEvent.id_event);
              if (index !== -1) {
                this.events[index].likes = updatedEvent.likes;
                this.events[index].dislikes = updatedEvent.dislikes;
              }
            })
        );
  }

  updateEventDislikes(eventId: number, userId: number, action: string): Observable<Event> {
    const url = `${this.baseUrl}/dislikes/${eventId}?userId=${userId}&action=${action}`;
    return this.http.patch<Event>(url, null)
        .pipe(
            tap(updatedEvent => {
              const index = this.events.findIndex(event => event.id_event === updatedEvent.id_event);
              if (index !== -1) {
                this.events[index].likes = updatedEvent.likes;
                this.events[index].dislikes = updatedEvent.dislikes;
              }
            })
        );
  }

  likeEvent(eventId: number, userId: number, action: string): Observable<Event> {
    const url = `${this.baseUrl}/likes/${eventId}?userId=${userId}&action=${action}`;
    return this.http.patch<Event>(url, {});
  }

  dislikeEvent(eventId: number, userId: number): Observable<Event> {
    const url = `${this.baseUrl}/${eventId}/dislike/${userId}`;
    return this.http.put<Event>(url, null);
  }



  deleteevent(id_event: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${id_event}`;
    return this.http.delete<void>(url);
  }


  addevent(event: Event): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.baseUrl}/add`, event, { headers });
  }
  updateEvent(id_event: number, updatedEvent: Event): Observable<Event> {
    const url = `${this.baseUrl}/${id_event}`;
    return this.http.put<Event>(url, updatedEvent);
  }
  getEvent(id: number): Observable<Event> {
    const url = `${this.baseUrl}/get/${id}`;
    return this.http.get<Event>(url);
  }

}
