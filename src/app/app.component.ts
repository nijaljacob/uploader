import { Component } from '@angular/core';
import { ImageUploaderService } from './widget/image-uploader/image-uploader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public croppedImage = 'https://via.placeholder.com/250/666/FFFFFF/?text=No Image';
    public imageName = 'No Image Added';

    constructor(
        private imageUploaderService: ImageUploaderService
    ) {}

    public showUploader() {
        this.imageUploaderService.openModal();
    }

    public onAfterUpload(imgObj) {
        this.croppedImage = imgObj.image;
        this.imageName = imgObj.name;
    }
}
