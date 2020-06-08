import {Component, ViewChild} from '@angular/core';
import {BackendService} from 'app/services/backend.service';

@Component({
  selector: 'app-index-screen',
  templateUrl: './index.screen.component.html',
  styleUrls: ['./index.screen.component.scss']
})
export class IndexScreenComponent {
  public isLoading: boolean;

  constructor(private backendService: BackendService) {}

  public onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const imageBinary = inputElement.files[0];
    this.sendImage(imageBinary);
  }

  public sendImage(image: Blob) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.backendService.post('look-at-image', image)
      .then(response => {
        this.isLoading = false;
        console.log(response);
      });
  }
}
