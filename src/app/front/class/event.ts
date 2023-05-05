import {User} from "./user";

export class Event {

    id_event?: number;
    name_event?: string;
    type_event?: string;
    price_event?: any;
    place_event?: string;
    date_event?: Date;
    description_event?: string;
    likes?: number;
    dislikes?: number;
    user?: User;
    imageUrl?: string;



}
