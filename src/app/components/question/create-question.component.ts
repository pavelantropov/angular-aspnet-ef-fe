import { Component } from '@angular/core';

@Component({
  selector: 'create-question',
  templateUrl: './create-question.component.html',
})
class CreateQuestionComponent {
  question!: string;

  handleCreateQuestion(question: string) {
    console.log(`Question was created (well, actually not).\nThe question: ${question}`);
  }
}

export default CreateQuestionComponent;
