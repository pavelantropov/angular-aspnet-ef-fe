import { Component, OnInit } from '@angular/core';
import ApiService from 'src/app/api.service';
import {  } from './types';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
})
class QuestionsComponent implements OnInit {
  questions: any;

  constructor(private _api: ApiService) {}

  ngOnInit() {
    this._api.getQuestions().subscribe(res => {
      this.questions = res;
    });
  }

  getList() {
    this._api.getQuestions();
  }
}

export default QuestionsComponent;
