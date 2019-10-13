import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from '../../../models/event.model';
import {EventTypesDescEnum, EventTypesEnum} from '../../../models/event-types.enum';
import {Place} from '../../../models/place.model';
import {PlaceTypesDescEnum, PlaceTypesEnum} from '../../../models/place-types.enum';

@Component({
  selector: 'app-place-description',
  templateUrl: './place-description.component.html',
  styleUrls: ['./place-description.component.scss']
})
export class PlaceDescriptionComponent {
  @Output() close: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Input() public place: Place;
  public getTypeDesc (typeName: PlaceTypesEnum) {
    let result: PlaceTypesDescEnum;
    Object.keys(PlaceTypesEnum).forEach(key => {
      result = PlaceTypesEnum[key] === typeName && PlaceTypesDescEnum[key];
    });
    return result;
  }
}
