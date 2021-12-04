import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class dbConnectionService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };
  configUrl = 'assets/config.json';
  posts: any;
  constructor(private http: HttpClient) {
    this.httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    this.httpOptions.headers.append(
      'Access-Control-Allow-Method',
      'POST,GET,OPTIONS'
    );
    this.httpOptions.headers.append('Accept', 'application/json');
  }

  getItems(): Observable<foodItem[]> {
    const url =
      'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/ingredients';

    return this.http.get<foodItem[]>(url);
  }
  getAnswers(): Observable<responseItem[]> {
    const url =
      'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/answers';

    return this.http.get<responseItem[]>(url);
  }
  PostItem2List(string) {
    const body = {
      ingredient: string,
    };
    console.log(body);
    return this.http
      .post(
        'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/ingredients',
        body,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  PostItem2Response(obj) {
   let stringParsedObj =  JSON.parse(JSON.stringify(obj))
    const body = stringParsedObj
    console.log(body);
    return this.http
      .post(
        'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/answers',
        body,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log('HIT PIPE');
    if (error.error instanceof ErrorEvent) {
      console.log('An Error Occured: ', error.error.message);
    } else {
      console.log(`Backend returned ${error.status}`);
    }
    return of(error);
  }
}
export class foodItem {
  public statusFlag: boolean;
  public statusCode: string;
  public response: object;

  constructor(statusFlag: boolean, statusCode: string, response: object) {
    this.statusFlag = statusFlag;
    this.statusCode = statusCode;
    this.response = response;
  }
}
export class responseItem {
  public statusFlag: boolean;
  public statusCode: string;
  public response: object;

  constructor(statusFlag: boolean, statusCode: string, response: object) {
    this.statusFlag = statusFlag;
    this.statusCode = statusCode;
    this.response = response;
  }
}
