export class DeckManagerUtil {

  public static buildTreeData(aggregateGroupData) {
   
    if (!aggregateGroupData || !aggregateGroupData.defaultDecks || !aggregateGroupData.groups) return [];

    const emptyArray = [];

    aggregateGroupData.defaultDecks.forEach(element => {
        emptyArray.push({name: element.value, id: element.id, type: 'deck'});
    });

    aggregateGroupData.groups.forEach(element => {
        emptyArray.push({name: element.value, type: 'group', children: this.buildDecks(element.decks)});
    });

    return emptyArray;
  } // TODO: How do we functionally aggregate this data?

  private static buildDecks(decks) {
    return decks.map(d => ({name: d.value, id: d.id, type: 'deck'}));
  }



  removeGroup() {
    // 0) get group ID and user ID from payload

    // 1) firebase remove group

    // 2) firebase get items from deck where group === id and username === userid

    // 3) Iterate over decks, set group to ''

    // 4) firebase post update
  }

  removeDeck() {
    // 0) get deck ID and user ID from payload

    // 1) firebase remove deck

    // 2) firebase get items from flash_cards where deck === id and username === userid

    // 3) delete all flash_cards from where clause
  }

}