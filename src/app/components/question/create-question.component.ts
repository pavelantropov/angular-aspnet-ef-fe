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
          correctAnswers: this._formBuilder.array([]),
          wrongAnswers: this._formBuilder.array([]),
        }),
      ]),
    });
  }

  get formArray(): FormArray {
    return this.formGroup.get("formArray") as FormArray;
  }

  get correctAnswers(): FormArray {
    return this.formGroup.controls["formArray"].get([0, "correctAnswers"]) as FormArray;
  }

  addCorrectAnswer() {
    const form = this._formBuilder.group({
      text: ['', Validators.required],
    });
    this.correctAnswers.push(form);
  }

  deleteCorrectAnswer(answerIndex: number) {
    this.correctAnswers.removeAt(answerIndex);
  }

  handleCreateQuestion(question: CreateQuestionRequest) {
    this._api.postQuestion(question);
    console.log(`Question was sent.\nThe question: ${question.text}`);
  }
}

export default CreateQuestionComponent;
