import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  link: string = "";
  search:string = "Опознанный питон"
  loading: boolean = false;
  file: any = null;
  title: string = "snake-vision"
  live: boolean = false
  types = [
    
      {
        type: "person",
        used: true
      },
      {
        type: "bicycle",
        used: true
      },
      {
        type: "car",
        used: true
      },
      {
        type: "motorcycle",
        used: true
      },
      {
        type: "airplane",
        used: true
      },
      {
        type: "bus",
        used: true
      },
      {
        type: "train",
        used: true
      },
      {
        type: "truck",
        used: true
      },
      {
        type: "boat",
        used: true
      },
      {
        type: "traffic light",
        used: true
      },
      {
        type: "fire hydrant",
        used: true
      },
      {
        type: "stop_sign",
        used: true
      },
      {
        type: "parking meter",
        used: true
      },
      {
        type: "bench",
        used: true
      },
      {
        type: "bird",
        used: true
      },
      {
        type: "cat",
        used: true
      },
      {
        type: "dog",
        used: true
      },
      {
        type: "horse",
        used: true
      },
      {
        type: "sheep",
        used: true
      },
      {
        type: "cow",
        used: true
      },
      {
        type: "elephant",
        used: true
      },
      {
        type: "bear",
        used: true
      },
      {
        type: "zebra",
        used: true
      },
      {
        type: "giraffe",
        used: true
      },
      {
        type: "backpack",
        used: true
      },
      {
        type: "umbrella",
        used: true
      },
      {
        type: "handbag",
        used: true
      },
      {
        type: "tie",
        used: true
      },
      {
        type: "suitcase",
        used: true
      },
      {
        type: "frisbee",
        used: true
      },
      {
        type: "skis",
        used: true
      },
      {
        type: "snowboard",
        used: true
      },
      {
        type: "sports ball",
        used: true
      },
      {
        type: "kite",
        used: true
      },
      {
        type: "baseball bat",
        used: true
      },
      {
        type: "baseball glove",
        used: true
      },
      {
        type: "skateboard",
        used: true
      },
      {
        type: "surfboard",
        used: true
      },
      {
        type: "tennis racket",
        used: true
      },
      {
        type: "bottle",
        used: true
      },
      {
        type: "vine glass",
        used: true
      },
      {
        type: "cup",
        used: true
      },
      {
        type: "fork",
        used: true
      },
      {
        type: "knife",
        used: true
      },
      {
        type: "spoon",
        used: true
      },
      {
        type: "bowl",
        used: true
      },
      {
        type: "banana",
        used: true
      },
      {
        type: "apple",
        used: true
      },
      {
        type: "sandwich",
        used: true
      },
      {
        type: "orange",
        used: true
      },
      {
        type: "broccoli",
        used: true
      },
      {
        type: "carrot",
        used: true
      },
      {
        type: "hot dog",
        used: true
      },
      {
        type: "pizza",
        used: true
      },
      {
        type: "donot",
        used: true
      },
      {
        type: "cake",
        used: true
      },
      {
        type: "chair",
        used: true
      },
      {
        type: "couch",
        used: true
      },
      {
        type: "potted plant",
        used: true
      },
      {
        type: "bed",
        used: true
      },
      {
        type: "laptop",
        used: true
      },
      {
        type: "mouse",
        used: true
      },
      {
        type: "tv",
        used: true
      },
      {
        type: "remote",
        used: true
      },
      {
        type: "keyboard",
        used: true
      },
      {
        type: "cell phone",
        used: true
      },
      {
        type: "microwave",
        used: true
      },
      {
        type: "oven",
        used: true
      },
      {
        type: "toaster",
        used: true
      },
      {
        type: "sink",
        used: true
      },
      {
        type: "refrigerator",
        used: true
      },
      {
        type: "book",
        used: true
      },
      {
        type: "clock",
        used: true
      },
      {
        type: "vase",
        used: true
      },
      {
        type: "scissors",
        used: true
      },
      {
        type: "teddy bear",
        used: true
      },
      {
        type: "toothbrush",
        used: true
      }
    ]
  constructor(private fileUploadService: FileUploadService) {
    
   }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.filteredData(this.types)
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
  filteredData(todos = this.types) {
    const s = this.search.toLowerCase();
    return todos.filter((n) => {
      return Object.values(n).some((m) =>
        m.toString().toLowerCase().includes(s)
      );
    })
  }
  onKey(event: any) { // without type info
    this.search = event.target.value ;
  }
}
