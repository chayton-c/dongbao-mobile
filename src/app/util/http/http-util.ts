import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Form} from "@angular/forms";

export class HttpUtils {

  public static createBody(params: any): FormData {
    let dataForm : FormData = new FormData();
    for (let key in params) {
      if (params[key] != undefined && params[key] != null && !Array.isArray(params[key])) {
        params[key] = params[key];
        dataForm.append(key, params[key]);
      }
    }
    return dataForm;
  }

  public static createHttpOptions(): any {
    return {
      headers: [
        'Content-Type', 'application/json'
      ]
    };
  }

  public static transform(value: any): any {
    let params: any = {};
    for (let key in value) {
      if (value[key] != undefined && value[key] != null && !Array.isArray(value[key])) {
        params[key] = value[key];
      }
    }
    return params;
  }

  public static akagi(url: string, rawHttp: HttpClient, nameWithExtention: string): void {
    // header.component.ts
    this.getFile(url, rawHttp).subscribe((data) => {

      console.log(69);
      // new Blob([data], {type: 'application/pdf'});

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = nameWithExtention;
      link.click();

    });
  }

  //download.service.ts
  public static getFile(url: string, rawHttp: HttpClient) {
    let authKey = localStorage.getItem('jwt_token');

    console.log(83);
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders('Authorization:' + authKey)
    };

    return rawHttp.get(url, httpOptions);
  }

}
