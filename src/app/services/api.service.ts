import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { transition } from '@angular/animations';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTranslatedText(inputLanguage: string, outputLanguage: string, text: string) {
    console.log("Original Text: " + text);
    console.log(`${inputLanguage} to ${outputLanguage}`);


    let url = environment.base_url + "/translate";

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

  getLanguages(){

    console.log("GET LANGUAGES CALLED");

    // let url = "https://microsoft-translator-text.p.rapidapi.com/languages";

    // let _params = new HttpParams()
    // .set('api-version', '3.0')
    // .set('scope', 'translation');

    // let _headers = new HttpHeaders()
    // .set('Accept-Language', 'en')
    // .set('X-RapidAPI-Key', environment.X_RapidAPI_Key,)
    // .set('X-RapidAPI-Host', environment.X_RapidAPI_Host)


    // return this.http.get(url,{ headers:_headers, params: _params, responseType:"text"});





    return this.http.get("https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation");




  }






}
