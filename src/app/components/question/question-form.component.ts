import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ApiService from 'src/app/api.service';
import { Question } from './types';
import * as _ from 'lodash';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
})
class QuestionFormComponent implements OnInit {
  question: Question;
  originalQuestion: Question;
  questionFormGroup: FormGroup;

  constructor(private _api: ApiService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.questionFormGroup = this._formBuilder.group({
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

    this._api.questionSelected.subscribe(question => this.question = question);
  }

  ngDoCheck() {
    if (!_.isEqual(this.question, this.originalQuestion)) {
      this.questionText.setValue(this.question?.text);
      this.correctAnswers.setValue(this.question?.correctAnswers ?? []);
      this.wrongAnswers.setValue(this.question?.wrongAnswers ?? []);
    }
  }

  get formArray(): FormArray {
    return this.questionFormGroup.get("formArray") as FormArray;
  }

  get questionText(): FormControl {
    return this.formArray.get([0, "questionText"]) as FormControl;
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
    const question = {
      text: this.questionText.value,
      correctAnswers: this.correctAnswers.value,
      wrongAnswers: this.wrongAnswers.value,
    }
    this._api.postQuestion(question);
    console.log(`Question was sent.\n"${question.text}"`);
  }
}

export default QuestionFormComponent;
