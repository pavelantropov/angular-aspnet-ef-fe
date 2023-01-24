import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateQuestionRequest } from './components/question/types';

@Injectable()
class ApiService {
  constructor(private http: HttpClient) {}

  postQuestion(question: CreateQuestionRequest) {
    this.http
      .post(`${environment.apiUrl}/questions`, question)
      .subscribe((res) => {
        console.log(res);
      });
  }
}

export default ApiService;
