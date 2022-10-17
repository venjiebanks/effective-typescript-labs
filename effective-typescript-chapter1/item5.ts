// Item 5: Limit Use of the any Type

let age: number;
age = "12" as any; //OK
age += 1; // OK; at runtime, age is now "121"

function calculateAge(birthDate: Date): void {
  // ...
}
let birthDate: any = "1990-01-19";
calculateAge(birthDate); // OK