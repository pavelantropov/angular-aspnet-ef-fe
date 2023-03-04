import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import ApiService from 'src/app/api.service';
import { CreateQuestionRequest } from './types';

@Component({
  selector: 'create-question',
  templateUrl: './create-question.component.html',
})
class CreateQuestionComponent implements OnInit {
  question: CreateQuestionRequest = {};
  formGroup: FormGroup;

  constructor(private _api: ApiService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          questionText: ['', Validators.required],
        }),
        this._formBuilder.group({
          correctAnswers: this._formBuilder.array([this._formBuilder.control('', Validators.required)]),
        }),
        this._formBuilder.group({
          wrongAnswers: this._formBuilder.array([this._formBuilder.control('', Validators.required)]),
        }),
      ]),
    });
  }

  get formArray(): FormArray {
    return this.formGroup.get("formArray") as FormArray;
  }

  get questionText(): FormArray {
    return this.formArray.get([0, "questionText"]) as FormArray;
  }

  get correctAnswers(): FormArray {
    return this.formArray.get([1, "correctAnswers"]) as FormArray;
  }

  get wrongAnswers(): FormArray {
    return this.formArray.get([2, "wrongAnswers"]) as FormArray;
  }

  handleAddCorrectAnswer() {
    const answer = this._formBuilder.control('', Validators.required);
    this.correctAnswers.push(answer);
  }

  handleRemoveCorrectAnswer(index: number) {
    this.correctAnswers.removeAt(index);
  }

  handleAddWrongAnswer() {
    const answer = this._formBuilder.control('', Validators.required);
    this.wrongAnswers.push(answer);
  }

  handleRemoveWrongAnswer(index: number) {
    this.wrongAnswers.removeAt(index);
  }

  handleSubmitForm() {
    this.question = {
      text: this.questionText.value,
      correctAnswers: this.correctAnswers.value,
      wrongAnswers: this.wrongAnswers.value,
    }
    this._api.postQuestion(this.question);
    console.log(`Question was sent.\n"${this.question.text}"`);
  }
}

export default CreateQuestionComponent;
