import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCropperModule } from 'ngx-image-cropper';

import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImageNameTrimmerPipe } from './image-name-trimmer/image-name-trimmer.pipe';

@NgModule({
  declarations: [
    ImageUploaderComponent,
    ImageNameTrimmerPipe
],
  imports: [
    CommonModule,
    ImageCropperModule,
    ModalModule.forRoot(),
    NgxFileDropModule
  ],
  exports: [
    ImageUploaderComponent,
    ImageNameTrimmerPipe
  ]
})
export class WidgetModule { }
