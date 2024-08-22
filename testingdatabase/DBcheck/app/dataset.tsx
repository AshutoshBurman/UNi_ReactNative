import Realm from "realm";

// Initialize the Realm app
const app = new Realm.App({ id: "application-0-otmhdqy" });

// Define the Dog schema
export class Dog extends Realm.Object {
  static schema = {
    name: "Dog",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      name: "string",
      age: "int",
    },
  };
}

// Function to handle data entry and Realm operations
const dataEntry = async () => {
  try {
    // Log in anonymously
    const user = await app.logIn(Realm.Credentials.anonymous());

    // Open the Realm with the Dog schema
    const realm = await Realm.open({
      schema: [Dog],
      sync: { user, flexible: true },
    });

    // Update subscriptions (Flexible Sync)
    await realm.subscriptions.update((mutableSubs) => {
      const dogs = realm.objects("Dog").filtered('name == "Clifford" && age > 5');
      mutableSubs.add(dogs);
    });

    // Write data to the realm - Create a new dog
    realm.write(() => {
      realm.create("Dog", { name: "Clifford", age: 12 });
    });

    // Query for all dogs
    const allDogs = realm.objects("Dog");

    // Example: Update a dog's age
    realm.write(() => {
      const dogToUpdate = allDogs.filtered('name == "Clifford" && age == 12')[0];
      if (dogToUpdate) {
        dogToUpdate.age = 13;
      }
    });

    // Example: Delete a dog
    realm.write(() => {
      const dogToDelete = allDogs.filtered('name == "Clifford" && age == 13')[0];
      if (dogToDelete) {
        realm.delete(dogToDelete);
      }
    });

    // Close the realm when done
    realm.close();

  } catch (err) {
    console.error("Failed to perform Realm operations", err);
  }
};

// Call the function to perform data entry and operations
dataEntry();
