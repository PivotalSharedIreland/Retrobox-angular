interface ItemUpdatedEvent {
  itemId: number;
  text?: string;
  completed?: boolean;
}

export default ItemUpdatedEvent;
