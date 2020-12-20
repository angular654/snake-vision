import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  url = "http://127.0.0.1:8000/upload"

  constructor(private http: HttpClient) { }
  upload(file: any): Promise<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this.url, formData).toPromise()
  }
} 