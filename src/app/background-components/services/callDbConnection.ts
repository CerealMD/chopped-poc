import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class dbConnectionService {
  public showSpinnerSub: BehaviorSubject<any> = new BehaviorSubject({});
  public showHeaderFooter: BehaviorSubject<any> = new BehaviorSubject({});
  public username: BehaviorSubject<any> = new BehaviorSubject({});
  public password: BehaviorSubject<any> = new BehaviorSubject({});
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
  getPairings(): Observable<responseItem[]> {
    const url =
      'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/pairing';
    return this.http.get<responseItem[]>(url);
  }
  getReplace(): Observable<responseItem[]> {
    const url =
      'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/replace';
    return this.http.get<responseItem[]>(url);
  }
  PostItem2List(string) {
    const body = {
      ingredient: string,
    };
    console.log(body);
    /*Example 
    {
 "ingredient": "Mozzarella"
}
    */
    return this.http
      .post(
        'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/ingredients',
        body,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  PostItem2Response(obj) {
    let stringParsedObj = JSON.parse(JSON.stringify(obj));
    const body = stringParsedObj;
    console.log(body);
    /*
     Example 
    {
    "answer": "Also also I'd make a roasted garlic and grilled artichoke ravioli. And I'd use the tilapia to make a roasted mushroom fish fumet cream and I'd drizzle a bit of a sweet dragon fruit reduction on top (like a balsamic reduction)",
    "username": "Diego M.",
    "ingredients": [
      "Artichoke",
      "Tilapia",
      "Dragon Fruit"
    ]
    }
     */
    return this.http
      .post(
        'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/answers',
        body,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  postToPairing(obj) {
    let stringParsedObj = JSON.stringify(obj);
    const body = stringParsedObj;
    console.log(body)
    /*
     Example 
     {
      "index": 0,
      "pairingArray": [
        {
        "foodItem": "Blueberries"
        }
      ],
      "foodItem": "Chicken"
      }
     */
    return this.http
      .post(
        'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/pairing',
        body,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  postToReplace(obj) {
    let stringParsedObj = JSON.stringify(obj);
    const body = stringParsedObj;
    console.log(body)
    /*
     Example 
     {
      "index": 0,
      "pairingArray": [
        {
        "foodItem": "Blueberries"
        }
      ],
      "foodItem": "Chicken"
      }
     */
    return this.http
      .post(
        'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/replace',
        body,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  deleteToPairing(obj) {
    let stringParsedObj = obj;
    // let stringParsedObj = JSON.stringify(obj);
    const body = stringParsedObj;
    console.log(body)
    /*
     Example 
     {
      "index": 0,
      "pairingArray": [
        {
        "foodItem": "Blueberries"
        }
      ],
      "foodItem": "Chicken"
      }
     */
    return this.http
      .post(
        'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/pairing',
        body,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  deleteToReplacing(obj) {
    let stringParsedObj = JSON.stringify(obj);
    const body = stringParsedObj;
    console.log(body)
    /*
     Example 
     {
      "index": 0,
      "pairingArray": [
        {
        "foodItem": "Blueberries"
        }
      ],
      "foodItem": "Chicken"
      }
     */
    return this.http
      .post(
        'https://o2d6f7tcwa.execute-api.us-east-2.amazonaws.com/dev/replace',
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
  async signUp(username, password, email) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
            }
        });
        console.log(user);
        return true;
    } catch (error) {
        console.log('error signing up:', error);
        return false;

    }
}
async confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
      console.log('error confirming sign up', error);
  }
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
