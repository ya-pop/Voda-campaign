import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {
  @Input() type: any;
  segmentTab;
  moreActions: MenuItem[];
  constructor() {}

  ngOnInit() {
    this.segmentTab = 'segmentDetails';
    this.moreActions = [
      { label: 'save', icon: 'icon-save' },
      { label: 'pause', icon: 'icon-pause' },
      { label: 'stop', icon: 'icon-stop' },
      { label: 'copy', icon: 'icon-copy' },
      { label: 'delete', icon: 'icon-delete' }
    ];
  }

  changeTab(tab: string) {
    this.segmentTab = tab;
    // tslint:disable: no-unused-expression
  }
}
