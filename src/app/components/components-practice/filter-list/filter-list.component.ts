import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Output() contentLoadedEvent = new EventEmitter();
  @Input() category;
  @Input() groups;

  _content;
  @Input() set content(v) { 
    this._content = v;
    if (this.content) this.contentLoadedEvent.emit(); 
  };
  get content() { return this._content; }

  constructor(public cs: ContentStateService, private client: ClientStateService) { }

  ngOnInit() {
  }

  raiseClickedEvent(content) {
    this.clickedEvent.emit(content);
    if (this.activeContent !== content) { 
      this.client.setActiveFlashcard({id: content.id});
      this.client.updateNavigation('edit');
    }
  }

  changeCategory(c) {
    this.client.updateCategory(c.value);
  }

}
