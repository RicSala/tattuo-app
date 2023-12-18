import {
    ArtistProfile,
    BodyPart,
    City,
    Style,
    Tag,
    TaggedTattoo,
    Tattoo,
} from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

type HttpStatusCode = 200 | 400 | 401 | 404 | 500; // Extend as needed

interface ApiError {
    code?: string; // Application-specific error code
    message?: string;
    details?: any; // Optional detailed error information
}

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
}

export interface ApiResponse<
    T = undefined,
    A = "CREATE" | "UPDATE" | "DELETE" | "INVITE" | "EXIT",
    E = ApiError,
> {
    statusCode: HttpStatusCode;
    message?: string;
    data: T | undefined;
    ok: boolean;
    error?: E;
    meta?: any; // Additional metadata
    pagination?: PaginationInfo;
}

export type ApiRequestBody<
    T = undefined,
    A = "CREATE" | "UPDATE" | "DELETE" | "INVITE" | "EXIT",
> = {
    data: T;
    action: A;
};

export interface inviteFormBody {
    studioId: string;
    invites: {
        label: string;
        value: string;
        id: string;
    }[];
}

export interface InviteFormBody {
    inviteId: string;
}

export interface ExitFormBody {
    artistId: string;
    studioId: string;
}
// T with U
type WithProperty<T, K extends PropertyKey, V> = T & { [P in K]: V };

export type UserFormReturnType = UseFormReturn<any, any, undefined>;

type searchParams = {
    cityId?: string;
    name?: string;
    userId?: string;
    slug?: string;
    id?: string;
    style?: string;
    freeSearch?: string;
    city?: string;
    unclaimed?: string;
    styles?: string;
};

export type PageType = "ARTIST" | "STUDIO" | "CITY" | "STYLE" | "CONTENT";

export type TTattooWDTagsWStylesWBodyPartWArtistProfile = {
    tags: (TaggedTattoo & { tag: Tag })[] | null;
    styles: Style[] | null;
    bodyPart: BodyPart | null;
    artistProfile: ArtistProfile | null;
} & Tattoo;

type CityOption = {
    city: string;
    text: string;
};

type StyleOption = {
    label: string;
    value: string;
    id: string;
    text: string;
};

type BodyPartOption = {
    value: string;
    label: string;
};

export type Filter =
    | {
          label: "Ciudad";
          value: "cities";
          options: CityOption[];
      }
    | {
          label: "Estilos";
          value: "styles";
          options: StyleOption[];
      }
    | {
          label: "Parte del cuerpo";
          value: "bodyPart";
          options: BodyPartOption[];
      }
    | {
          label: "Artista";
          value: "artists";
          options: Partial<ArtistProfile[]>;
      };

//   Utility type: Make a specific property nullable
export type MakeNullable<T, K extends keyof T> = Omit<T, K> & // First we ommit the whole property
    Partial<Pick<T, K>>; // Then we add it as a partial property

// ### LEARNING TYPESCRIPT ###
// // Utility type to make all properties of T readonly
// // export type ReadOnly<T> = {
// //     readonly [P in keyof T]: T[P];
// // };

// // Discriminated union type example:
// type Shape =
//     | { whatever: "circle"; radius: number }
//     | { whatever: "square"; sideLength: number }
//     | { whatever: "rectangle"; width: number; height: number };
// // | { broken: "nonexistent"; width: number; angle: number }; // Thiw would break the switch statement and the discriminated union

// function getArea(shape: Shape) {
//     switch (shape.whatever) {
//         case "circle":
//             return Math.PI * shape.radius ** 2;
//         case "square":
//             return shape.sideLength ** 2;
//         case "rectangle":
//             return shape.width * shape.height;
//     }
// }

// // Example of use of a implements clause to let infer the type of a union

// interface Picture {
//     url: string;
//     width: number;
//     height: number;
// }

// interface CustomUser {
//     name: string;
//     picture: Picture | string;
// }

// const exampleUser: CustomUser = {
//     name: "John Doe",
//     picture: {
//         url: "https://example.com/john-doe.jpg",
//         width: 100,
//         height: 100,
//     },
// };

// // We only get this two methods:
// // exampleUser.name
// // exampleUser.picture

// // Here you only get this two methods because you are using the interface directly
// // You are explicitly telling TS that the type of exampleUser is CustomUser, which has picture as a union -> string | Picture so the available methods are those that are common to both types

// // But we can do this using satisfies clause:
// const betterExampleUser = {
//     name: "John Doe",
//     picture: {
//         url: "https://example.com/john-doe.jpg",
//         width: 100,
//         height: 100,
//     },
// } satisfies CustomUser;

// // And like that, ts is able to infer the type of the picture property and you get all the methods available for that type

// // betterExampleUser.picture.height
// // betterExampleUser.picture.url
// // betterExampleUser.picture.width

// // It's saying: this "satisfies the custom user interface, but you do the inference"

// // Exmaple of using TYPEGUARDS.
// // What are typeguards? Functions that return a boolean and are used to narrow down the type of a variable
// // The are "js functions" but whose return type lets TS know if the type of a variable is one or another
// // Let's use typeguards instead of discriminated unions in the getArea function

// type Circle = { polygon: "circle"; radius: number };
// type Square = { polygon: "square"; sideLength: number };

// function isCircle(shape: unknown): shape is Circle {
//     // First we check if shape is an object. If not, we return false (as it cannot be a Circle)
//     if (typeof shape !== "object") return false;
//     // Check if it has a property called "polygon". If not, we return false (as it cannot be a Circle)
//     if (!("polygon" in shape)) return false;
//     // If it does, we check if its value is "circle"
//     if ((shape as Circle).polygon !== "circle") return false;

//     // Here we are sure that shape is a Circle
//     return true;
// }

// // We can do the same for Square, in a much more concise way (remember that expressions on the right of the && operator are only evaluated if the expression on the left is true)
// function isSquare(shape: unknown): shape is Square {
//     // The typeguard depends on this "shape is Square" clause (not only boolean)
//     return (
//         typeof shape === "object" &&
//         "polygon" in shape &&
//         (shape as Square).polygon === "square"
//     );
// }

// // Now we can use the typeguards in the getArea function
// const getAreaWithGuards = (shape: unknown) => {
//     if (isCircle(shape)) {
//         // It's narrowed down to Circle thanks to the typeguard
//         return Math.PI * shape.radius ** 2; // We can access the properties of the Circle type without casting
//         // Indeed, hovering shape shows that it is a Circle here
//     }

//     if (isSquare(shape)) {
//         return shape.sideLength ** 2; // We can access the properties of the Square type without casting
//     }

//     // The only thing we know here is that shape is not a Circle nor a Square
// };

// // discriminated unions and typeguards are not mutually exclusive. You can use both in the same function:

// type Shape = Circle | Square;
// type Circle = { polygon: "circle"; radius: number };
// type Square = { polygon: "square"; sideLength: number };

// const newIsCircle = (shape: Shape): shape is Circle => {
//     return shape.polygon === "circle"; // We don't need to check if shape is an object or if it has a property called "polygon" because we are sure that shape is a Shape (Circle | Square) and we use the discriminated union to narrow down the type
// };

// const newIsSquare = (shape: Shape): shape is Square => {
//     return shape.polygon === "square";
// };

// // NOW LET'S LEARN ABOUT UTILITY TYPES

// // Partial<T> makes all properties of T optional. Is like adding "?" to all properties of T
// type PartialCircle = Partial<Circle>; // now polygon and radius are optional

// // Required<T> makes all properties of T required. Is like removing "?" to all properties of T
// type RequiredCircle = Required<PartialCircle>; // now polygon and radius are required again

// // Readonly<T> makes all properties of T readonly
// type ReadonlyCircle = Readonly<Circle>; // now polygon and radius are readonly

// // Record<K, T> creates an object type whose property keys are K and whose property values are T
// type CircleRecord = Record<"polygon" | "radius", number>; // is the same as Circle
// // you could also do this:
// type CircleRecord2 = {
//     polygon: number;
//     radius: number;
// };
// // Student: Are those the same???
// // Expert ts dev: Yes, they are the same. But the first one is more concise and easier to read.
// // Student: Ok, what if you need different types for each property?
// // Expert ts dev: Then you would do this:
// type CircleRecord3 = Record<"polygon", number> & Record<"radius", string>;

// // Pick<T, K> creates a type with only the properties of T whose keys are in the union K
// type CirclePick = Pick<Circle, "polygon">; // it only has the polygon property now

// // Omit<T, K> creates a type with all properties of T except those whose keys are in the union K
// type CircleOmit = Omit<Circle, "polygon">; // it only has the radius property now

// // You can combine utility types
// type CirclePartialPick = Partial<Pick<Circle, "polygon">>; // only has the polygon property and it is optional

// // There is also a ReturnType<T> utility type that returns the type of the return value of a function. For example:

// const sum = (a: number, b: number) => {
//     return a + b;
// };

// type SumReturnType = ReturnType<typeof sum>; // First we get the type of the function, then we extract the type of the return value

// // Nullable<T> makes all properties of T nullable -> Does not exist! You have to create it.

// type Nullable<T> = {
//     // Now all properties of T are optional and can be null
//     [P in keyof T]: T[P] | null;
// };

// // Why is it allowing me to assign null to a property that is not nullable?
// // ??????
// const user: { name: string; age: number } = {
//     name: null,
//     age: null,
// };

// // Let's now learn about generic functions

// // A generic function is a function that can operate on values of any type, and we need to provide the type of the value when we call the function

// // Let's create a function that returns the first element of an array

// function firstElement(arr) {
//     return arr[0];
// }

// // We do not know the type in the array, so we cannot type the return value of the function
// // firstElement([1, 2, 3]).toUpperCase(); // This is not an error because TS does not know the type of the return value. it's just "any"

// // We can use generics to solve this problem

// function firstElementWithGenerics<T>(arr: T[]): T {
//     return arr[0];
// }

// // We could also do this:

// const anotherFunction = <T>(arr: T[]): T => {
//     // Add the generic just before the parenthesis, then use it as a type
//     return arr[0];
// };

// // We could also declara the whole function type using generics

// type FirstElementFunction = <T>(arr: T[]) => T; // and then...

// const anotherFunction2: FirstElementFunction = (arr) => {
//     return arr[0];
// };

// // Now we can call the function and TS will know the type of the return value
// // firstElementWithGenerics([1, 2, 3]).toUpperCase(); // This is an error because TS knows that the return value is a number!!

// // Generics are like function arguments, but for types. Indeed they are also called type parameters

// // You can use generics in react components too so you can get the relationship between props. For example a component that receives the theme options and the selected theme. Its props would be something like this:

// type Props<T> = {
//     theme: T; // string; // The type of the theme options. could be string, number, etc
//     options: T[]; // string[]; // The type of the theme options. could be string, number, etc
// };
// // Now props "accepts" any type of theme and options as far as they are related like we have defined in the Props type

// // How can we restrict the types that T can be?
// // We can use extends. For example, let's say theme can only be a string or a number

// type Props2<T extends string | number> = {
//     theme: T;
//     options: T[];
// };

// // Extends mean that T can be any type that extends string or number. So it can be string, number, or any other type that extends string or number

// // When youc call a generic function, you ca specify the type of the generic like this:

// // firstElementWithGenerics<string>(["a", "b", "c"]); // Now TS knows that the return value is a string.
// // But it's usually not necessary because TS can infer the type of the generic from the arguments
// // Can be usefull when you want to be more specific than TS can infer. For example if you have a Theme type that is a union of strings:

// type Theme = "dark" | "light";

// // Then you may want to specify that the generic can only be a Theme

// // firstElementWithGenerics<Theme>(["dark", "light"]); // Now TS knows that the return value is a Theme.

// // Other topics
// // You can also extract types from something else. For example, from an object

// const user = {
//     name: "John Doe",
//     age: 30,
//     address: {
//         street: "Main St",
//         city: "New York",
//     },
// };

// type Address = typeof user.address; // Or
// type Address2 = (typeof user)["address"]; // Or

// // You may want to use interfaces to augment types of external libraries. For example, let's say you use a library that has a "MyCustomSession" type. You can augment it like this:

// // This would be coming from the library
// interface MyCustomSession {
//     userId: string;
//     expires: number;
// }

// // This would be in your code
// interface MyCustomSession {
//     name: string;
// }

// // And now MyCustomSession has both properties

// let session: MyCustomSession = {
//     expires: 123456,
//     userId: "abc-123",
//     name: "John Doe",
// };

// // So you have augmented the type of the library without modifying the library itself using interfaces. That's called "declaration merging"
// // The problem with that is that interfaces may be merged in unexpected ways.
// // There some ways to avoid that. For example, you can use namespaces to avoid merging interfaces. Or you could use module augmentation.

// // Namespaces

// // Module augmentation

// // Another topic: You can create React components whose props are dependent on the value of another prop. For example:

// type props =
//     | ({ name: string } & {
//           adult: true;
//           smokes: boolean;
//       })
//     | {
//           adult: false;
//           favoriteGame: string;
//       };

// // Now, if adult is true, smokes is required. If adult is false, favoriteGame is required

// const example1: props = {
//     name: "John Doe",
//     adult: true,
//     smokes: false,
// };

// const example2: props = {
//     name: "John Doe",
//     adult: false,
//     favoriteGame: "Chess",
// };

// // That's useful when working with components with variants.
// // Problem with this is that you won't be able to destruct the props. You will have to use "props" and then use type guards to narrow down the type of the props in the component

// // Type inference some times maybe vague, but it's usually true.
// // Explicit Return types, can be indeed not true. For example:

// type AnotherUser = {
//     name: string;
//     age: number;
// };

// const returnUser = (): AnotherUser => {
//     const newUser = {
//         name: "John Doe",
//         age: 30,
//         password: "123456",
//     };
//     return newUser;
// };

// const user = returnUser();
// // user.age // exist
// // user.name // exist
// // user.password // EXIST BUT TS DOES NOT KNOW ABOUT IT. IT'S LOST IN TS LAND.
// //  You could use "as const"

// const returnUserWithAsConst = () => {
//     const newUser = {
//         name: "John Doe",
//         age: 30,
//         password: "123456",
//     } as const;
//     return newUser;
// };

// const userWithAsConst = returnUserWithAsConst();

// //REVIEW:  SO... BETTER AVOID EXPLICIT RETURN TYPES. LET TS INFER THEM.
// //  So to they say: https://www.youtube.com/watch?v=I6V2FkW1ozQ
// //  The vast majority of the time, TS will infer the correct return type. And you can "help" ts by using "as const" when you want to be more specific

// // What is a function overload???

// // Generics can also be inferred from the arguments of a function. For example:

// function firstElement<T>(arr: T[]): T {
//     return arr[0];
// }

// // We do not need to specify the type of the generic when we call the function because TS can infer it from the arguments.

// const firstNumber = firstElement([1, 2, 3]); // TS knows that the return value is a number --> for some reason is not working here... it's returning "any"

// // When you use generic functions you usually want to put constraints on the type of generics can be used by using extends. For example:

// type MyCustomType = string | number;

// function firstElement<T extends MyCustomType>(arr: T[]): T {
//     return arr[0];
// }

// // Now the generic can only be a string or a number

// // You can also get the parametters of a function usin the Parameters<T> utility type. For example:

// const logPerson = (name: string, age: number, city: string) => {
//     console.log(name, age, city);
// };

// type LogpersonParams = Parameters<typeof logPerson>;
// // And you can also get only the second parameter, using the index of the parameter in the function
// type LogPersonSecondParam = Parameters<typeof logPerson>[1];

// // We can also extract the "awaited" type of a promise using the Awaited<T> utility type. For example:

// const promise = new Promise<string>((resolve) => {
//     // The string is wrapped in a promise
//     resolve("done");
// });

// type PromiseType = Awaited<typeof promise>; // string

// const doSometingAsync = async () => {
//     return {
//         name: "John Doe",
//         age: 30,
//     };
// };

// type AwaitedPerson = Awaited<ReturnType<typeof doSometingAsync>>;
// // typeof -> gets the type of the function
// // ReturnType -> gets the return type of the function
// // Awaited -> gets the awaited type of the promise, which is the person object

// const testtingFrameworks = {
//     jest: "jest",
//     mocha: "mocha",
//     chai: "chai",
//     jasmine: "jasmine",
// };

// type TestingFramework = keyof typeof testtingFrameworks;

// // typeof -> gets the type of the function.
// // typeof is a way to go frm the "runtime world" to the "type world"

// // Given a discrinated union like this:

// type CustomEvent =
//     | {
//           type: "click";
//           event: MouseEvent;
//           condition: "something";
//       }
//     | {
//           type: "keydown";
//           event: KeyboardEvent;
//           condition: boolean;
//       }
//     | {
//           type: "load";
//           event: Event;
//       };

// // We can get the event of the "click" type like this:
// type ClickEvent = Extract<CustomEvent, { type: "click" }>["event"];

// // We can also do the opposite: given a type, exclude some properties from it that meet a condition
// type ExcludeCondition = Exclude<CustomEvent, { condition }>; // Exclude all the types that have a condition property
// type ExcludeCondition = Exclude<CustomEvent, { condition: boolean }>; // Exclude all the types that have a condition property that is a boolean

// // Extract types from an object

// const fakeSettingDefaults = {
//     name: "John Doe",
//     age: 30,
//     city: "New York",
//     adult: true,
//     address: {
//         street: "Main St",
//         number: 123,
//     },
// };

// // If we do it in two steps, we can first get the type of the object:
// type FakeSettingDefaults = typeof fakeSettingDefaults;
// // then get the type of the properties we want:
// type Address = FakeSettingDefaults["address"]; // We access it with the key of the property we want to extract.
// // This is the index access type operator
// // You cannot use the dot notation!

// // REVIEW: Does that mean that we could build an object with the types of all my api responses and request and access them like that?

// type EventTypes = CustomEvent["type"];

// // Let's now say we have an enum that maps backend values to frontend values (labels) like this:
// // We want the type to be the label itself, not just a string.
// // We can do it with the "as const" keyword
// const enumToLabel = {
//     XLARGE: "XLarge",
//     LARGE: "Large",
//     MEDIUM: "Medium",
//     SMALL: "Small",
//     XSMALL: "XSmall",
// } as const;
// // It means two things:
// // - The types now are the values themselves, not just strings.
// // - The object is now immutable. You cannot change it. At ANY level.

// // Let's think now we want to get a union of all the non extra small or large sizes.
// //  We want to get this type: "Medium" | "Small" | "XLarge". We can do it like this:

// type KeyOfEnumToLabel = keyof typeof enumToLabel; // "XLARGE" | "LARGE" | "MEDIUM" | "SMALL" | "XSMALL"
// type SizeLabels = (typeof enumToLabel)[KeyOfEnumToLabel]; // The extra small and large sizes are still there. We need to exclude them
// type Sizes = Exclude<Sizes, "XSmall" | "Large">; // Now we have the type we want

// // Or you can pass a union into an index access type
// type XSizes = (typeof enumToLabel)["XSMALL" | "XLARGE"]; // "XSmall" | "Large"

// // REVIEW:
// // - typeof -> let's as move from the runtime world to the type world
// // - keyof -> let's us get the keys of an object
// // - [] -> let's us access the type of a property of an object
// // - We can access the property with [] and then get the type (OF THAT PROPERTY) with typeof
// // - Exclude -> let's us exclude types from a union
// // - You can pass union type into an index access type, resulting in a union of the types of the properties of the union
// // - When you use keyof inside the [] operator, is like you are passing a union of ALL the keys of the object
// //  (The pattern looks something like: type Something = Object[keyof Object]) )

// // Let's now play with an array of fruits

// const fruits = ["apple", "orange", "banana"];

// type Fruits = (typeof fruits)[number]; // This is just returning a string type instead of a union of the strings in the array.
// // We could use as const in the array, but what if we don't have access to the array itself?
// // We can use the infer keyword to infer the type of the array
