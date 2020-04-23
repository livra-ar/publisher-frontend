import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ContentService } from '@app/services/content.service';
import { DialogService } from '@app/services/dialog.service';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private contentService: ContentService,
    private alert: DialogService,
    private authService: AuthService,
    private router: Router
    ) { }
  content;
  id;
    user;
    loading=true;
  ngOnInit(): void {
   this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          const id = params.get('id');
          if (id.match(/^[0-9a-fA-F]{24}$/)) {
            return this.contentService.getById(id);
          } else {
              return throwError({status: 404})
          }

      })
    ).subscribe(content=>  {
      this.content = content;
      this.loading = false;
    }, err => {

      if(err.status != 404){
      this.alert.showErrorAlert(
        'An error occurred while fetching content data. Please refresh the page.',
        'Error');
      }else{
        this.router.navigate(['/not-found']);
      }
    });

    this.user = this.authService.getCurrentUser();
  }

  delete(): void{

    this.alert.showConfirm().afterClosed().subscribe(
      value => {
        if (value){
          this.contentService.deleteContent(this.content.id).subscribe(
            message => {
              this.alert.showSuccessAlert(
                'Book successfully deleted!',
                'Success');
              this.router.navigate(['/dashboard']);
            },
            err => {
              this.alert.showErrorAlert(
                'An error occurred while deleting the book. Please refresh the page and try again.',
                'Error');
            });
          }
      });

     }

}
