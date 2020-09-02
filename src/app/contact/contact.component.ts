import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { patternValidator } from '@app/shared/pattern.directive';
import { VALIDATION } from '@app/shared/validation-constants';
import { DialogService } from '@app/services/dialog.service';
import { FeedbackService } from '@app/services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm = this.fb.group({
    name : ['', Validators.required],
    subject : ['', Validators.required],
    message : ['', [
      Validators.required, Validators.minLength(100),
      Validators.maxLength(280)
    ]],
    email: ['', [
                  Validators.required,
                  patternValidator(VALIDATION.emailRegex)
                ]],
  })
  submitting = false;
  constructor(
    private fb: FormBuilder,
    private alert: DialogService,
    private feedback: FeedbackService
  ) { }

  ngOnInit(): void {
  }

  
  get name(){
    return this.contactForm.get('name');
  }

  get subject(){
    return this.contactForm.get('subject');
  }

  get message(){
    return this.contactForm.get('message');
  }

  get email(){
    return this.contactForm.get('email');
  }

  onSubmit(){
    this.submitting = true;
    this.feedback.postFeedback({
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value
    }).subscribe(success =>{
      this.alert.showSuccessAlert("Feedback Sent!");
      this.submitting = false;
    }, err => {
      this.alert.showErrorAlert('Error occured!');
      this.submitting = false;
    })
   
  }
}
