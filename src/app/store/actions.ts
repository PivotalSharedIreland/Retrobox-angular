import { ITodoAction } from './reducer';

export function removeItem(itemId: number): ITodoAction {
  return {
    type: 'REMOVE',
    itemId
  };
}

export function updateItemText(itemId: number, text: string): ITodoAction {
  return {
    type: 'UPDATE_ITEM_TEXT',
    itemId,
    text
  };
}

export function updateItemCompletion(itemId: number, completed: boolean): ITodoAction {
  return {
    type: 'UPDATE_ITEM_COMPLETION',
    itemId,
    completed
  };
}
