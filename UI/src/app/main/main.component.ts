import { Component, OnInit } from '@angular/core';
import {FileUploadService} from '../file-upload.service'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  link: string = "";
  loading: boolean = false; 
  file: any = null; 
  title:string = "snake-vision"
  live: boolean = false
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    this.fileUploadService.upload(this.file).then(
      (res: any) => {
        this.link = res;
        this.loading = false;  
      }
    ).catch((err) => {
      console.log(err)
    })
  }
  toLive() {
    this.live = !this.live
  }
}
