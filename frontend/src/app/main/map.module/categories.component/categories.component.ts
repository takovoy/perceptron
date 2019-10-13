import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PlaceTypesDescEnum, PlaceTypesEnum} from '../../../models/place-types.enum';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent {
  @Output() categoryClick: EventEmitter<PlaceTypesEnum | 'event'> = new EventEmitter<PlaceTypesEnum | 'event'>();
  @Input() checkedCategory: PlaceTypesEnum | 'event';
  public categories: Category[] = Object.keys(PlaceTypesDescEnum).map(key => ({
    desc: PlaceTypesDescEnum[key],
    name: PlaceTypesEnum[key]
  }));
}

class Category {
  desc: PlaceTypesDescEnum;
  name: PlaceTypesEnum;
}
