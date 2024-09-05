interface User {
  name: string;
  age: number;
  email: string;
  createdAt: Date;
}

// For a profile display, only pick `name` and `email`
type UserProfile = Pick<User, "name" | "email">;

function displayUserProfile(user: UserProfile) {
  console.log("Name: ", user.name, "Email: ", user.email);
}

displayUserProfile({ name: "Ebu", email: "afridiebrahimck@gmail.com" });
// function sumOfAge(user1: User,  user2: User) {
//   return user1.age + user2.age;
// }

// const TotalAge = sumOfAge({ name: "Ebu", age: 24 }, { name: "Mama", age: 45 });

// console.log(TotalAge);
