import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/core';
import {RetroItem as RetroItemModel} from './../store/retroitem';
import ItemUpdatedEvent from './itemupdatedevent';

@Component({
  selector: 'retro-item',
  templateUrl: 'app/retroitem/retroitem.html',
  styleUrls: ['app/retroitem/retroitem.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RetroItem {
  editMode = false;

  @Input()
  item: RetroItemModel;

  @Output()
  done = new EventEmitter<number>();

  @Output()
  itemUpdated = new EventEmitter<ItemUpdatedEvent>();

  doneClicked() {
    this.done.emit(this.item.id);
  }

  toggle() {
    // this.itemUpdated.emit( {
    //   itemId: this.item.id,
    //   completed: !this.item.completed
    // });
  }

  enterEditMode(element: HTMLInputElement) {
    this.editMode = true;
    if (this.editMode) {
      setTimeout(() => { element.focus(); }, 0);
    }
  }

  cancelEdit(element: HTMLInputElement) {
    this.editMode = false;
    element.value = this.item.message;
  }

  commitEdit(updatedText: string) {
    this.editMode = false;
    this.itemUpdated.emit({
      itemId: this.item.id,
      text: updatedText
    });
  }
}
