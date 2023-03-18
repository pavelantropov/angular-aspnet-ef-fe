import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateQuestionRequest, Question, UpdateQuestionRequest } from './components/question/types';
import { Subject } from 'rxjs';

@Injectable()
class ApiService {
  private selectedQuestion = new Subject<any>();
  questionSelected = this.selectedQuestion.asObservable();

  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get(`${environment.apiUrl}/questions`);
  }

  getQuestion(guid: string) {
    return this.http.get(`${environment.apiUrl}/questions/${guid}`);
  }

  postQuestion(question: CreateQuestionRequest) {
    this.http
      .post(`${environment.apiUrl}/questions`, question)
      .subscribe((res) => {
        console.log(res);
      });
  }

  putQuestion(question: UpdateQuestionRequest) {
    this.http
      .put(`${environment.apiUrl}/questions/${question.guid}`, question)
      .subscribe((res) => {
        console.log(res);
      });
  }

  selectQuestion(question: Question) {
    this.selectedQuestion.next(question);
    console.log(`question "${question.text} was selected"`);
  }
}

export default ApiService;
