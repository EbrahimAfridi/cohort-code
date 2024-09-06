// # 6 Exclude
// type EventType = "click" | "mouseover" | "mouseout";
// type ExcludedEventType = Exclude<EventType, "click" | "mouseout">
//
// function handleMouse(event: ExcludedEventType) {
//     console.log("handleMouse", event);
// }

// handleMouse("mouseout")

// # 5 Records and Maps
// Records let you give cleaner type to objects

// type User = {
//     name: string,
//     email: string,
// }

// type Users = {
//     [key: string]: User
// }

// To solve this ugly syntax problem Records and Maps were introduced.
// Record<key-type, old-type>

// type Users = Record<string, User>
//
// const users: Users = {
//     "User1": {
//         name:  "John Smith",
//         email: "john@gmail.com",
//     },
//     "User2": {
//         name: "John Smith",
//         email: "john@gmail.com",
//     }
// }
//
// console.log(users)

// # Map
// const user = new Map<string, User>()
// user.set("User1", {name: "Ebu", email: "abc@email.com"})
// user.set("User2", {name: "Man", email: "xyz@email.com"})
// console.log(user.get("User1"));
// console.log(user.get("User2"));

// // # 4 Readonly api
// interface User {
//   name: string;
//   email: string;
//   password: string;
// }
//
// const obj: Readonly<User> = {
//   name: "John",
//   email: "john@example.com",
//   password: "password",
// }
//
// obj.name = "Jane";
// obj.email = "jane@example.com";


// interface User {
//   name: string;
//   age: number;
//   email: string;
//   // createdAt: Date;
// }
//
// // # 3 Use case of Pick: When we reuse a Type or Interface and later decide to change something in the initial type
// // # 3 we will have to change it in the second Type too which is not a good practice.
//
// const user1 = {
//   name: "Ebu",
//   age: 12,
//   email: "ebu@gmail.com",
// }
//
// type UpdateProps = Pick<User, "name" | "email" | "age">
// type PartialUpdateProps = Partial<UpdateProps>
//
// function updateProfile(updateProps: PartialUpdateProps, user1: User): User {
//   return {
//     ...user1,
//     ...updateProps,
//   }
// }
//
// const updatedUser = updateProfile({name: "John", email: "john@example.com"}, user1);
// console.log(updatedUser);


// # 2
// For a profile display, only pick `name` and `email`
// type UserProfile = Pick<User, "name" | "email">;

// function displayUserProfile(user: UserProfile) {
//   console.log("Name: ", user.name, "Email: ", user.email);
// }

// displayUserProfile({ name: "Ebu", email: "afridiebrahimck@gmail.com" });


// # 1
// function sumOfAge(user1: User,  user2: User) {
//   return user1.age + user2.age;
// }

// const TotalAge = sumOfAge({ name: "Ebu", age: 24 }, { name: "Mama", age: 45 });
// console.log(TotalAge);
