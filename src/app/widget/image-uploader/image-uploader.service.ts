import { Injectable } from '@angular/core';
import { ImageUploaderComponent } from './image-uploader.component';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {

    constructor() { }

    public currentModel: ImageUploaderComponent;

    public initialize(uploaderObject) {
        this.currentModel = uploaderObject;
    }

    public openModal() {
        this.currentModel.openModal();
    }

    public closeModal() {
        this.currentModel.closeModal();
    }


}
