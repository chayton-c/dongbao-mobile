import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.less']
})
export class TutorialsComponent implements OnInit {

  tutorialType: ('video'|'image') = 'video';

  underReview?: number;

  @ViewChild('takeoutVideoPlayer') takeoutVideoPlayer?: ElementRef;
  takeoutVideoPlaying = false;

  startTakeoutVideo(): void {
    // underReview
    console.log("startTakeoutVideo")
    console.log(this.takeoutVideoPlaying)
    if (this.takeoutVideoPlaying) {
      this.takeoutVideoPlaying = false;
      this.takeoutVideoPlayer!.nativeElement.pause();
    } else {
      this.takeoutVideoPlaying = true;
      this.takeoutVideoPlayer!.nativeElement.play();
    }
  }

  @ViewChild('shoppingVideoPlayer') shoppingVideoPlayer?: ElementRef;
  shoppingVideoPlaying = false;

  startShoppingVideo(): void {
    console.log("startShoppingVideo")
    console.log(this.shoppingVideoPlaying)
    if (this.shoppingVideoPlaying) {
      this.shoppingVideoPlaying = false;
      this.shoppingVideoPlayer!.nativeElement.pause();
    } else {
      this.shoppingVideoPlaying = true;
      this.shoppingVideoPlayer!.nativeElement.play();
    }
  }

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.underReview) this.underReview = queryParams.underReview;
      else this.underReview = 0;
    });
  }

}
