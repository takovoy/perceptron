import {Component, Input} from '@angular/core';
import {User} from '../../../models/user.model';
import {USERS} from '../../../stubs/users.stubs';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
  @Input() user: User = USERS[0];
  private _userPhoto: string;
  public sanitizedImage: SafeStyle;
  @Input() get userPhoto (): string {
    return this._userPhoto;
  }
  set image (value: string) {
    this._userPhoto = value;
    this.sanitizedImage = this.sanitizer.bypassSecurityTrustStyle('url(' + value + ')');
  }
  constructor (
    public sanitizer: DomSanitizer
  ) {
    this.image = this.user.image;
  }
}
