import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTranslatedText(inputLanguage: string, outputLanguage: string, text: string) {
    console.log("Original Text: " + text);
    console.log(`${inputLanguage} to ${outputLanguage}`);


    let url = environment.base_url + "/translate";

    // params = new HttpParams {
    //   'to[0]': outputLanguage,
    //   from: inputLanguage,

    //   'api-version': '3.0',
    //   profanityAction: 'Marked',
    //   textType: 'plain'
    // };

    // let headers = {
    //   'content-type': 'application/json',
    //   'X-RapidAPI-Key': environment.X_RapidAPI_Key,
    //   'X-RapidAPI-Host': environment.X_RapidAPI_Host
    // };


    let _params = new HttpParams()
      .set('to[0]', outputLanguage)
      .set('from', inputLanguage)
      .set('api-version', '3.0')
      .set('profanityAction', 'Marked')
      .set('textType', 'plain');

    if(!outputLanguage){
      _params.set('to[0]', 'en');
    }
    else{
      _params.set('to[0]', outputLanguage);
    }

    if(inputLanguage !== ""){
      _params.set('from', inputLanguage);
    }


    let _headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-RapidAPI-Key', environment.X_RapidAPI_Key,)
      .set('X-RapidAPI-Host', environment.X_RapidAPI_Host)


  
    let data = [
      {
        Text: text
      }
    ]


    return this.http.post(url,data, {headers: _headers, params: _params});

  }






}
