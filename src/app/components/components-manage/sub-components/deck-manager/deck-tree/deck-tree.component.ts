import { Component, OnInit, Input } from '@angular/core';
import { ContentStateService } from 'src/app/services/content-state.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { DeckManagerUtil } from '../deck-manager-util';


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
}

@Component({
  selector: 'app-deck-tree',
  templateUrl: './deck-tree.component.html',
  styleUrls: ['./deck-tree.component.css']
})
export class DeckTreeComponent implements OnInit {

  @Input() aggregateGroupData;

  private _transformer = (node: DeckOrGroupNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      type: node.type,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private cs: ContentStateService) {
    
  }

  ngOnInit(): void {
    this.dataSource.data = DeckManagerUtil.buildTreeData(this.aggregateGroupData);
  }


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  removeItem(node) {
    console.log(node);
  }
  
}
