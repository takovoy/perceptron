import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from '../../../models/event.model';
import {EventTypesDescEnum, EventTypesEnum} from '../../../models/event-types.enum';

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss']
})
export class EventDescriptionComponent {
  @Output() close: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Input() public event: Event;
  public getTypeDesc (typeName: EventTypesEnum) {
    let result: EventTypesDescEnum;
    Object.keys(EventTypesEnum).forEach(key => {
      result = result || EventTypesEnum[key] === typeName && EventTypesDescEnum[key];
    });
    return result;
  }
}
