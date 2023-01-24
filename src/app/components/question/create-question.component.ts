import { Component } from '@angular/core';
import ApiService from 'src/app/api.service';
import { CreateQuestionRequest } from './types';

@Component({
  selector: 'create-question',
  templateUrl: './create-question.component.html',
})
class CreateQuestionComponent {
  question : CreateQuestionRequest = {}

  constructor(private api: ApiService) {}

  handleCreateQuestion(question: CreateQuestionRequest) {
    this.api.postQuestion(question);
    console.log(`Question was sent.\nThe question: ${question.text}`);
  }
}

export default CreateQuestionComponent;
