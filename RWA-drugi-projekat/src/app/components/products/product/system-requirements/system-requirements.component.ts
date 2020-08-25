import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-system-requirements',
  templateUrl: './system-requirements.component.html',
  styleUrls: ['./system-requirements.component.css']
})
export class SystemRequirementsComponent implements OnInit {
  @Input() model: any;

  constructor() { }

  ngOnInit(): void {
  }

}
