import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  link: string = "";
  loading: boolean = false; 
  file: any = null; 
 
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
}
