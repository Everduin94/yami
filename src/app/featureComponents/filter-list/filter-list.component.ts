import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentStateService } from 'src/app/services/content-state.service';
import { ClientStateService } from 'src/app/services/client-state.service';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {

  @Input() activeContent;
  @Output() clickedEvent = new EventEmitter();
  @Input() category;
  @Input() categories;
  @Input() content;

  constructor(
    public cs: ContentStateService,
    private client: ClientStateService) { }

  ngOnInit() {

  }

  raiseClickedEvent(content) {
    // TODO: Add DB call up higher, this is still needed for patch form
    this.clickedEvent.emit(content);

    if (this.activeContent !== content) {
      this.client.updateActiveContent(content);
    }

  }

  changeCategory(c) {
    this.client.updateCategory(c.value);
  }
}
