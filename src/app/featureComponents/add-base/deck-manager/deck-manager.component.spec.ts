import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckManagerComponent } from './deck-manager.component';
import { DeckManagerUtil } from './deck-manager-util';

describe('DeckManagerComponent', () => {

  const testData = {"defaultDecks":[{"value":"Random Default","id":"k1K2T63bRf8MSYX8NMy0","group":""}],"groups":[{"value":"Regex","id":"6IFnORtBWyQ9dfwGCUXs","decks":[{"value":"Regex Starter","id":"3ST5eriIDtRuZNpZZaCp","group":"6IFnORtBWyQ9dfwGCUXs"}]},{"value":"NKdSGfDTeC7VEN2daIZ6","id":"GFgekGhnNScCaqlNSJwZ","decks":[]},{"value":"RxJS","id":"c4CeiDdIubwYGCW2BnX8","decks":[{"value":"RxJS 04/2020","id":"m4lbxauQIZ7YLjy8Cfec","group":"c4CeiDdIubwYGCW2BnX8"}]},{"value":"Dev-Do-Not-Edit","id":"lRW9a0xlwhEoxLe6Mak9","decks":[{"value":"DEMO","id":"6ondTOrDGVMZJLo3P8aN","group":"lRW9a0xlwhEoxLe6Mak9"},{"value":"History","id":"KJ5amCvGv3TzD6scmgjP","group":"lRW9a0xlwhEoxLe6Mak9"},{"value":"FIB-TEST","id":"rxlhi6UzMIdAjDch3VoT","group":"lRW9a0xlwhEoxLe6Mak9"}]}]}

  it('should return decks first given they do not have a group', () => {
    const treeData = DeckManagerUtil.buildTreeData(testData);
    const expectedName = 'Random Default';
    const expectedType = 'deck';
    const actualName = treeData[0].name;
    const actualType = treeData[0].type;
    expect(actualName).toEqual(expectedName);
    expect(actualType).toEqual(expectedType);
  });

  it('should return groups given all the default decks have been added', () => {
    const treeData = DeckManagerUtil.buildTreeData(testData);
    const expected = 'group';
    const actual = treeData[1].type;
    expect(actual).toEqual(expected);
  });

  it('should return tree decks from children given a group has decks', () => {
    const treeData = DeckManagerUtil.buildTreeData(testData);
    const expected = 'deck';
    const actual = treeData[1].children[0].type;
    expect(actual).toEqual(expected);
  });

  it('should return empty array given any poison pill', () => {
    const treeDataNull = DeckManagerUtil.buildTreeData(null);
    const treeDataMissingProps = DeckManagerUtil.buildTreeData({});
    const expected = [];
    const actual1 = treeDataNull;
    const actual2 = treeDataMissingProps;
    expect(actual1).toEqual(expected);
    expect(actual2).toEqual(expected);
  })
});
