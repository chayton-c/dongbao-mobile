import {Component, Input} from "@angular/core";

@Component({
  selector: 'title-component',
  templateUrl: 'title-component.html',
  styleUrls: ['title-component.less']
})
export class TitleComponent {

  @Input() titleText: string = ""
  @Input() android: number = 0;
  @Input() backgroundColor?: string;

  backPreviousPage(): void {
    if (this.android) {
      // @ts-ignore
      window.Android.backPreviousPage('');
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.backPreviousPage.postMessage('');
    }
    return;
  }

;}
