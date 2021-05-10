import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ImageUploaderService } from './image-uploader.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

    public modalRef: BsModalRef;
    public files: NgxFileDropEntry;
    public imageChangedEvent: any = '';
    public croppedImage: any = '';
    public imageName: string = '';
    public showCropper: boolean = false;
    public fileDropped: boolean = false;
    
    @Output() onAfterUpload = new EventEmitter<Object>();

    @ViewChild("template") template: TemplateRef<any>;
    
    constructor(
        private modalService: BsModalService,
        private imageUploaderService: ImageUploaderService
    ) {}


    ngOnInit() {
        this.imageUploaderService.initialize(this);
    }

    public openModal() {
        this.modalRef = this.modalService.show(this.template);
    }

    public closeModal() {
        this.modalRef.hide();
    }

    public imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    public onSubmit() {
        this.onAfterUpload.emit({
            image: this.croppedImage,
            name: this.imageName
            });
        this.modalRef.hide();
    }
 
    public dropped(files: NgxFileDropEntry[]) {
        this.fileDropped = true;
        const fileExtension = files[0].fileEntry.name.slice(files[0].fileEntry.name.lastIndexOf('.') + 1, files[0].fileEntry.name.length)
        
        if(['jpeg', 'png', 'tiff', 'jpg'].indexOf(fileExtension.toLowerCase()) > -1) {

            this.files = files[0];
            this.showCropper = true;

            files[0].fileEntry['file'](
                (ev) => {
                    this.imageChangedEvent = {target: {files: [ev]}}
                },
                () => console.log('Failed to load image')
            );
    

            if (this.files.fileEntry.isFile) {
            const fileEntry = this.files.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
                this.imageName = this.files.relativePath;
    
            });
            } else {
                const fileEntry = this.files.fileEntry as FileSystemDirectoryEntry;
            }
        } else {
            alert("Only jpeg, png and tiff formats are supported");
        }
    }

    public reUploadImg() {
        this.showCropper = false;
        this.fileDropped = false;
        this.croppedImage = '';
        this.imageChangedEvent = '';
        this.imageName = '';
    }

    public imageLoaded(event) {
        this.fileDropped = false;
    }

}
