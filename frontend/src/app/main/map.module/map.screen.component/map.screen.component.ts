import {Component, ViewChild} from '@angular/core';
import {Event} from '../../../models/event.model';
import {EVENTS} from '../../../stubs/events.stubs';
import {PlaceTypesEnum} from '../../../models/place-types.enum';
import {Place} from '../../../models/place.model';
import {PLACES} from '../../../stubs/places.stubs';
import {MapComponent} from '../../../library/components/map.component/map.component';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map.screen.component.html',
  styleUrls: ['./map.screen.component.scss']
})
export class MapScreenComponent {
  @ViewChild(MapComponent) map: MapComponent;
  public events: Event[] = EVENTS;
  public filteredEvents: Event[] = EVENTS;
  public places: Place[] = PLACES;
  public filteredPlaces: Place[] = [];
  public checkedEvent: Event;
  public checkedCategory: PlaceTypesEnum | 'event' = 'event';
  public checkedPlace: Place;
  public filterShortCards (type: PlaceTypesEnum | 'event') {
    this.checkedCategory = type;
    this.checkedEvent = null;
    this.checkedPlace = null;
    if (type === 'event') {
      this.filteredEvents = this.events;
      this.filteredPlaces = [];
    } else {
      this.filteredEvents = [];
      this.filteredPlaces = this.places.filter(place => place.type === type);
    }
  }
  public showEvent (event: Event) {
    this.checkedEvent = event;
    this.map.showPlace(event.place);
  }
  public showPlace (place: Place) {
    this.checkedPlace = place;
    this.map.showPlace(place);
  }
}
