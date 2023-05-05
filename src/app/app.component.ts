import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';
import { Observable, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'translator-app';

  inputText: string | null | undefined = "";
  translatedText: string | null | undefined = "";

  languages = [
    {iso:"en", name:"English"}, 
    {iso:"es", name:"Spanish"},
    {iso:"fr", name:"French"},
    {iso:"it", name:"Italian"},
  ];


  inputLanguage:string | null | undefined= this.languages[0].iso;
  outputLanguage:string | null | undefined = this.languages[1].iso;



  constructor(public apiService: ApiService){

  }

  translationForm = new FormGroup({
    inputString: new FormControl("",[Validators.required]),
    inputLang: new FormControl("en"),
    outputLang: new FormControl("fr")
  });

  ngOnInit(): void {
    this.translationForm.valueChanges.pipe(debounceTime(350)).subscribe(()=>this.formSubmit());
    
  }

  async formSubmit(){

    console.log(this.translationForm.value);
    this.inputText = this.translationForm.value.inputString;
    this.inputLanguage = this.translationForm.value.inputLang;
    this.outputLanguage = this.translationForm.value.outputLang;

    
    
    this.apiService.getTranslatedText(this.inputLanguage!, this.outputLanguage!, this.inputText!).subscribe(
      (res: any) => {
        console.log(res)
        this.translatedText = res['0']['translations'][0].text;
      }
    );
  }

  switchLanguages(){

    console.log("SWITCHING LANGUAGES");
    let oldInputLanguage = this.translationForm.value.inputLang;
    let oldOutputLanguage = this.translationForm.value.outputLang;

    let oldInputText = this.inputText;
    let oldTranslatedText = this.translatedText;


    this.translationForm.value.inputLang = oldOutputLanguage;
    this.translationForm.value.outputLang = oldInputLanguage;

    this.inputLanguage = oldOutputLanguage;
    this.outputLanguage = oldInputLanguage;

    this.inputText = oldTranslatedText;
    this.translatedText = oldInputText;

  }


}
