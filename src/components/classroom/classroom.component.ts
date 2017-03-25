import {Component, OnInit} from '@angular/core';
import {ClassService} from "../../services/class.service";
import {Feedback} from "../../models/Feedback";
import {Question} from "../../models/Question";
import {Lecture} from "../../models/Lecture";
import {ActivatedRoute, Router, Params} from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  moduleId:module.id,
  selector: 'classroom',
  templateUrl: `components/classroom/classroom.component.html`,
  providers:[ClassService]
})

export class ClassRoomComponent{


  classRoomName:string;
  feedbackCount=0;
  lectureCount=0;
  questionCount=0;


  lectures:Lecture[];

  currentViewingQuestion:Question;
  currentViewingQuestionAnswer:string;

  submitFeedback={details:"",semantic:"",_lecture:""};
  submitQuestion={title:"",details:"",link:"",_lecture:""};
  submitMaterial={type:"",details:"",link:"none",_lecture:""};
  createLectureDetails={_class:"",lectureTitle:"",lectureSummary:"", lectureNumber:0};

  constructor(private classService:ClassService,private route: ActivatedRoute,private router:Router){
    this.classRoomName="This Class Name";


    let q=new Question();
    q.title="";
    q.details="";
    this.currentViewingQuestion=q;



    //taking the lectures
    this.route.params
      .switchMap(params => this.classService.getLectures(params['id']))
      .subscribe(lectures => {
        console.log("We came to this point also 4444444");

        if (lectures){
          this.lectures = lectures;
          console.log(lectures);
        }
        else console.log('error');
      });

    //initialing the class id
    this.route.params.subscribe((params:Params)=>{
      this.createLectureDetails._class=params['id'];
    });
    console.log("Doneee the constructors");

  }


  /**
   *  ===================================================================
   *          FEEDBACK RELATED FUNCTIONS
   *  ===================================================================
   *
   * */

  saveFeedback(){
    console.log(this.submitFeedback);
    this.classService.createFeedback(this.submitFeedback).subscribe(data=>{
      if(data.success){
        console.log("Feedback created");
        this.updateLecture();
      }
      else{
        console.log(data.msg);
      }
    });
    // this.currentLectureFeedbackByStudent="";
  }

  removeFeedback(feedbackId){
    console.log(feedbackId);
    this.classService.removeFeedback(feedbackId).subscribe(res=>{
      console.log(res);
      this.updateLecture();
    });
  }


  /**
   *  ===================================================================
   *          QUESTION RELATED PROFILE ROUTES
   *  ===================================================================
   *
   * */

  saveQuestion(){
    console.log(this.submitQuestion);
    this.classService.createQuestion(this.submitQuestion).subscribe(data=>{
      if(data.success){
        console.log("Question created");
        this.updateLecture();
      }
      else{
        console.log(data);
      }
    });
  }

  viewAnswerQuestionModal(questionId){
    console.log("Haioooooooooo");
    for(var i=0;i<this.lectures.length;i++){
      for(var j=0;j<this.lectures[i].questions.length;j++){
        if(this.lectures[i].questions[j]._id==questionId) {
          this.currentViewingQuestion = this.lectures[i].questions[j];
          console.log(this.currentViewingQuestion);
        }
      }
    }
    console.log("This is the id: "+questionId);
  }

  saveAnswer(){
    console.log(this.currentViewingQuestionAnswer);
  }

  viewAnswer(questionId){
    console.log("This is the question id: "+questionId);
  }

  removeQuestion(questionId){

  }

  showAskQuestionModal(lectureId){
    this.submitQuestion._lecture=lectureId;
  }


  /**
   *  ===================================================================
   *          MATERIAL RELATED FUNCTIONS
   *  ===================================================================
   *
   * */
  saveMaterial(){
    console.log(this.submitMaterial);
    this.classService.createMaterial(this.submitMaterial).subscribe(data=>{
      if(data.success){
        console.log("Material Created");
        this.updateLecture();
      }
      else{
        console.log(data);
      }
    });
  }

  removeLectureMaterial(id){
    console.log("Remove the id: "+id);
  }

  downloadLectureMaterial(id,link){
    console.log("Download");
  }

  addMaterial(lectureId){
    console.log('add lecture material');
    this.submitMaterial._lecture=lectureId;
  }


  showAddFeedbackModal(lectureId){
    console.log("Lecture ID is  ::: "+lectureId);
    this.submitFeedback._lecture=lectureId;
  }


  /**
   *  ===================================================================
   *          LECTURE RELATED FUNCTIONS
   *  ===================================================================
   *
   * */

  createLecture(){
    console.log("Create new lecture");

    this.classService.createLecture(this.createLectureDetails).subscribe(data=>{
      if(data.success){
        console.log("Class Created");
      }
      else{
        console.log(data.msg);
      }
    });
  }

  updateLecture(){
    //taking the lectures
    this.route.params
      .switchMap(params => this.classService.getLectures(params['id']))
      .subscribe(lectures => {
        if (lectures){
          this.lectures = lectures;
        }
        else console.log('error');
      });
  }


}
