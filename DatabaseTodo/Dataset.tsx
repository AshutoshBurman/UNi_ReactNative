import Realm, {ObjectSchema} from 'realm';

// Define the schema for a Todo item
export default class Todo extends Realm.Object {
  static schema: ObjectSchema = {
    name: 'Todo',
    properties: {
      _id: 'objectId',
      text: 'string',
    },
    primaryKey: '_id',
  };
}
