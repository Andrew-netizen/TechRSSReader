import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isAuthenticated$: Observable<boolean>;

  ngOnInit(): void {
    this.isAuthenticated$ = this.authorizeService.isAuthenticated();
  }

  constructor(private authorizeService: AuthorizeService) {}
}
