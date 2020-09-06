import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { DeckManagerUtil } from '../deck-manager-util';
import { FunctionsService } from 'src/app/services/functions.service';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface DeckOrGroupNode {
  expandable: boolean;
  children?: DeckOrGroupNode[];
  name: string;
  level: number;
  type: string;
  id: string;
}

@Component({
  selector: 'app-deck-tree',
  templateUrl: './deck-tree.component.html',
  styleUrls: ['./deck-tree.component.css']
})
export class DeckTreeComponent implements OnInit, OnChanges {
  

  @Input() aggregateGroupData;

  loading: string = '';

  private _transformer = (node: DeckOrGroupNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id,
      type: node.type,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private cs: ContentStateService, private fs: FunctionsService) {
    
  }

  // TODO: Replace with pipe? 
  ngOnInit(): void {
    this.dataSource.data = DeckManagerUtil.buildTreeData(this.aggregateGroupData);
  }

  ngOnChanges(): void {
    this.dataSource.data = DeckManagerUtil.buildTreeData(this.aggregateGroupData);
  }


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  async removeItem(node) {
    let message = node.type === 'deck' ? 
    'Are you sure you want to delete this deck?\nThis will delete all cards associated with this deck.' :
    'Are you sure you want to delete this group?\nThis will move all decks associated with this group to default (no group)'
    const confirm = window.confirm(message);
    if (confirm) {
      this.loading = node.id;
      await this.fs.removeDeckOrGroup({name: node.name, id: node.id, type: node.type});
      this.loading = '';
    }
  }

  updateItem(node, update) {
    this.fs.updateDeckOrGroup({name: node.name, id: node.id, type: node.type, update})
  }
  
}
