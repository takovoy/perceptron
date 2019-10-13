import {Component, Input} from '@angular/core';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-admin-page-container',
  templateUrl: './admin-page-container.component.html',
  styleUrls: ['./admin-page-container.component.scss']
})
export class AdminPageContainerComponent {
  @Input() user: User;
}
