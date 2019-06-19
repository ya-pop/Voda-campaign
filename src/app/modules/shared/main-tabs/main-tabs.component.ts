import { Component, OnInit, Output } from '@angular/core';
import { SideMenuService } from '../../../services/sidemenu.service';
import { BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'app-main-tabs',
  templateUrl: './main-tabs.component.html',
  styleUrls: ['./main-tabs.component.css']
})
export class MainTabsComponent implements OnInit {
  // tslint:disable: indent
  @Output() segments = [];
  @Output() details;
  segmentsMenuArray = [];
  selectedTab = 0;
  selectedTabMenu: string;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(
    private SideMenuService: SideMenuService,
    private BreadcrumbService: BreadcrumbService
  ) {}
  onTabChange(e: any) {
    this.BreadcrumbService.changeBreadcrumb(this.segments[e.index]);
    this.selectedTab = e.index;
  }
  handleClose(e: any) {
    this.segments.splice(e.index, 1);
    this.segmentsMenuArray.splice(e.index, 1);
    if (e.index === this.selectedTab) {
      this.BreadcrumbService.changeBreadcrumb(this.segments[0]);
      this.selectedTab = 0;
    } else if (e.index < this.selectedTab) {
      this.selectedTab = this.selectedTab - 1;
    }
  }
  search(nameKey: any, myArray: any[]) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id === nameKey) {
        return myArray[i];
      }
    }
  }

  ngOnInit() {
    this.SideMenuService.segment.subscribe((segment: any) => {
      const resultObject = this.search(segment.id, this.segments);
      if (resultObject === undefined) {
        this.segments.push(segment);
        const segmentItem = {
          label: segment.label,
          command: event => {
            this.selectedTab = this.segments.indexOf(segment);
          }
        };
        this.selectedTab = this.segments.length - 1;
        this.segmentsMenuArray.push(segmentItem);
        this.selectedTabMenu = segmentItem.label;
      } else {
        this.selectedTab = this.segments.indexOf(resultObject);
      }
    });
  }
}
