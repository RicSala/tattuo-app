// // Seeds the database with fake data

// const { PrismaClient } = require("@prisma/client");
// const { fakerES } = require("@faker-js/faker");
// var bcrypt = require("bcryptjs");
// const { getCities } = require("../lib/getCities");
// const { getBodyParts } = require("../lib/getBodyParts");
// const { getStyleList } = require("../lib/getStyleList");

// const numClients = 50;
// const numArtists = 20;
// const numTattoos = 60;
// const numSaves = 200;
// const numLikes = 200;
// const numBoards = 50;
// const onlyDelete = false;
// const building = true;
// const onlySeedBodyPartsAndCities = true;

// // pics a random element from an array
// const randomElement = (array) => {
//   return array[Math.floor(Math.random() * array.length)];
// };

// // pics n random elements from an array
// const selectNFromArray = (array, n) => {
//   const randomElementsArray = [];
//   for (let i = 0; randomElementsArray.length < n && i < array.length; i++) {
//     const randomElementId = randomElement(array);
//     if (!randomElementsArray.includes(randomElementId)) {
//       randomElementsArray.push(randomElementId);
//     }
//   }
//   return randomElementsArray;
// };

// // pics a random number between min and max
// const randomNumber = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const prisma = new PrismaClient();

// const seedDb = async () => {
//   if (onlySeedBodyPartsAndCities) {
//     const cities = getCities();
//     const bodyParts = getBodyParts();
//     const styles = getStyleList();

//     console.log("Seeding database");

//     // add all the cities to the database
//     try {
//       const result = await prisma.city.createMany({
//         data: cities.map((city) => ({
//           label: city.label,
//           value: city.label,
//           parent_code: city.parent_code,
//           code: city.code,
//         })),
//       });
//       console.log(`Successfully created ${result.count} cities`);
//     } catch (error) {
//       console.log("Error creating cities: ", error);
//     }

//     // add all bodyParts to the database
//     try {
//       const result = await prisma.bodyPart.createMany({
//         data: bodyParts.map((bodyPart) => ({
//           label: bodyPart.label,
//           value: bodyPart.label,
//         })),
//       });
//       console.log(`Successfully created ${result.count} bodyParts`);
//     } catch (error) {
//       console.log("Error creating bodyParts: ", error);
//     }

//     // add all styles to the database
//     try {
//       const result = await prisma.style.createMany({
//         data: styles.map((style) => ({
//           label: style.label,
//           value: style.label,
//         })),
//       });
//       console.log(`Successfully created ${result.count} styles`);
//     } catch (error) {
//       console.log("Error creating styles: ", error);
//     }

//     return;
//   }

//   const styleIds = await prisma.style
//     .findMany()
//     .then((styles) => styles.map((style) => style.id));
//   // const cityIds = await prisma.city.findMany().then(cities => cities.map(city => city.id));
//   // array of ids of cities whose label is Madrid, Barcelona or Zaragoza
//   const cityIds = await prisma.city
//     .findMany({
//       where: {
//         OR: [
//           { label: "Madrid" },
//           { label: "Barcelona" },
//           { label: "Zaragoza" },
//         ],
//       },
//     })
//     .then((cities) => cities.map((city) => city.id));
//   const tagIds = await prisma.tag
//     .findMany()
//     .then((tags) => tags.map((tag) => tag.id));
//   const bodyPartIds = await prisma.bodyPart
//     .findMany()
//     .then((bodyParts) => bodyParts.map((bodyPart) => bodyPart.id));

//   if (building) {
//     return;
//   }

//   if (onlyDelete) {
//     await prisma.savedTattoo.deleteMany({});
//     await prisma.likedTattoo.deleteMany({});
//     await prisma.savedArtist.deleteMany({});
//     await prisma.likedArtist.deleteMany({});
//     await prisma.tattoo.deleteMany({});
//     await prisma.artistProfile.deleteMany({});
//     await prisma.user.deleteMany({});
//     await prisma.taggedTattoo.deleteMany({});
//     await prisma.board.deleteMany({});
//     await prisma.boardTattoo.deleteMany({});
//     return;
//   }

//   // console.log("Seeding database");
//   // // delete all the styles in the database
//   // await prisma.style.deleteMany({});
//   // console.log("Styles deleted");

//   // // create all the styles in the database
//   // for (const style of styles) {
//   //     await prisma.style.create({
//   //         data: {
//   //             label: style.label,
//   //             value: style.label,
//   //         }
//   //     });
//   // }
//   // console.log("Styles created");
//   // // delete all the bodyParts in the database
//   // await prisma.bodyPart.deleteMany({});
//   // console.log("BodyParts deleted");

//   // // create all the bodyParts in the database
//   // for (const bodyPart of bodyParts) {
//   //     await prisma.bodyPart.create({
//   //         data: {
//   //             label: bodyPart.label,
//   //             value: bodyPart.label,
//   //         }
//   //     });
//   // }
//   // console.log("BodyParts created");

//   // // delete all the cities in the database
//   // await prisma.city.deleteMany({});
//   // console.log("Cities deleted");

//   // // create all the cities in the database
//   // try {
//   //     const result = await prisma.city.createMany({
//   //         data: cities.map(city => ({
//   //             label: city.label,
//   //             value: city.label,
//   //             parent_code: city.parent_code,
//   //             code: city.code,
//   //         })),
//   //     });
//   //     console.log(`Successfully created ${result.count} cities`);
//   // } catch (error) {
//   //     console.log("Error creating cities: ", error);
//   // }
//   // console.log("Cities created");

//   // delete all the users in the database

//   await prisma.artistProfile.deleteMany({});
//   console.log("PREVIOUS ARTISTS deleted");

//   await prisma.board.deleteMany({});
//   await prisma.user.deleteMany({});
//   console.log("PREVIOUS CLIENTS deleted");

//   // creates a user with email 'ricardo@google.com' and password '88888888' that is an ARTIST
//   // so I can login with this user
//   const hashedPassword = await bcrypt.hash("88888888", 2);
//   const user = await prisma.user.create({
//     data: {
//       name: "Ricardo",
//       email: "ricardo@google.com",
//       image: fakerES.image.avatarGitHub({}),
//       hashedPassword: hashedPassword,
//       confirmPassword: hashedPassword,
//       role: "ARTIST",
//       settings: {
//         create: {
//           darkMode: true,
//         },
//       },
//     },
//   });

//   console.log("STARTING CLIENTS CREATION");

//   const clientPromises = [];
//   for (let i = 0; i < numClients; i++) {
//     const sex = randomElement(["male", "female"]);
//     const firstName = fakerES.person.firstName(sex);
//     const hashedPassword = await bcrypt.hash("88888888", 2); // Note: This still needs to be done in a loop since it's an async operation

//     const client = prisma.user.create({
//       data: {
//         name: firstName,
//         email: fakerES.internet.email({
//           firstName: `${firstName}-${randomNumber(1, 200)}`,
//         }),
//         image: fakerES.image.avatarGitHub(),
//         hashedPassword: hashedPassword,
//         confirmPassword: hashedPassword,
//         role: "CLIENT",
//         settings: {
//           create: {
//             darkMode: true,
//           },
//         },
//       },
//     });

//     clientPromises.push(client);
//   }

//   await prisma.$transaction(clientPromises);
//   console.log("CLIENTS created");
//   // we need the user ids to create the artist profiles and the tattoos later
//   const userIds = await prisma.user
//     .findMany()
//     .then((users) => users.map((user) => user.id));

//   // delete all the artistProfiles in the database

//   const artistProfile = await prisma.artistProfile.create({
//     data: {
//       user: { connect: { id: user.id } },
//       artisticName: "Ricardo",
//       email: "ricardo@google.com",
//       bio: fakerES.person.bio(),
//       phone: fakerES.phone.number(),
//       website: fakerES.internet.url(),
//       socials: [
//         { network: "facebook", profile: fakerES.internet.url() },
//         { network: "twitter", profile: fakerES.internet.url() },
//         { network: "youtube", profile: fakerES.internet.url() },
//         { network: "tiktok", profile: fakerES.internet.url() },
//       ],
//       mainImage: fakerES.image.avatarGitHub(),
//       images: [
//         fakerES.image.url({ width: 512, height: 512 }),
//         fakerES.image.url({ width: 512, height: 512 }),
//         fakerES.image.url({ width: 512, height: 512 }),
//       ],
//       styles: { connect: [{ id: randomElement(styleIds) }] },
//       pricePerHour: fakerES.number.int({ min: 10, max: 100 }),
//       pricePerSession: fakerES.number.int({ min: 80, max: 800 }),
//       minWorkPrice: fakerES.number.int({ min: 50, max: 200 }),
//       isComplete: true,
//       city: { connect: { id: randomElement(cityIds) } },
//     },
//   });

//   console.log("STARTING ARTISTS CREATION");

//   const artistUserPromises = [];
//   const artistProfilePromises = [];
//   for (let i = 0; i < numArtists; i++) {
//     const sex = randomElement(["male", "female"]);
//     const firstName = fakerES.person.firstName(sex);
//     const hashedPassword = await bcrypt.hash("88888888", 2); // Note: This still needs to be done in a loop since it's an async operation

//     const user = prisma.user.create({
//       data: {
//         name: firstName,
//         email: fakerES.internet.email({
//           firstName: `${firstName}-${randomNumber(1, 200)}`,
//         }),
//         image: fakerES.image.avatarGitHub(),
//         hashedPassword: hashedPassword,
//         confirmPassword: hashedPassword,
//         role: "ARTIST",
//         settings: {
//           create: {
//             darkMode: true,
//           },
//         },
//       },
//     });

//     artistUserPromises.push(user);
//   }

//   const artistUsers = await prisma.$transaction(artistUserPromises);

//   artistUsers.forEach((user, i) => {
//     const randomStyles = selectNFromArray(styleIds, 3);

//     const artistProfile = prisma.artistProfile.create({
//       data: {
//         user: { connect: { id: user.id } },
//         artisticName: `${user.name}-${i}`,
//         email: fakerES.internet.email({
//           firstName: `${user.name}-${randomNumber(1, 200)}`,
//           provider: "tatuador.com",
//         }),
//         bio: fakerES.person.bio(),
//         phone: fakerES.phone.number(),
//         website: fakerES.internet.url(),
//         socials: [
//           { network: "facebook", profile: fakerES.internet.url() },
//           { network: "twitter", profile: fakerES.internet.url() },
//           { network: "youtube", profile: fakerES.internet.url() },
//           { network: "tiktok", profile: fakerES.internet.url() },
//         ],
//         mainImage: fakerES.image.avatarGitHub(),
//         images: [
//           fakerES.image.url({ width: 512, height: 512 }),
//           fakerES.image.url({ width: 512, height: 512 }),
//           fakerES.image.url({ width: 512, height: 512 }),
//         ],
//         styles: { connect: [{ id: randomElement(styleIds) }] },
//         pricePerHour: fakerES.number.int({ min: 10, max: 100 }),
//         pricePerSession: fakerES.number.int({ min: 80, max: 800 }),
//         minWorkPrice: fakerES.number.int({ min: 50, max: 200 }),
//         isComplete: true,
//         city: { connect: { id: randomElement(cityIds) } },
//       },
//     });

//     artistProfilePromises.push(artistProfile);
//   });

//   const newArtistProfiles = await prisma.$transaction(artistProfilePromises);
//   console.log(`${newArtistProfiles.length}ARTISTS and ARTIST PROFILES created`);

//   // delete all the tattoos in the database
//   await prisma.tattoo.deleteMany({});
//   console.log("TATTOOS deleted");

//   const artistProfileIds = await prisma.artistProfile
//     .findMany()
//     .then((artistProfiles) =>
//       artistProfiles.map((artistProfile) => artistProfile.id),
//     );

//   console.log("STARTING TATTOO CREATION");
//   // generate 3 random tagIds

//   const randomTags = selectNFromArray(tagIds, 3);

//   // create 100 random TATTOO
//   const tattooPromises = [];
//   for (let i = 0; i < numTattoos; i++) {
//     const artist = randomElement(artistProfileIds);

//     // why would this happen?
//     if (!artist) {
//       console.error("Invalid ARTIST ID:", artist);
//       return null;
//     }

//     const tattoo = prisma.tattoo.create({
//       data: {
//         title: fakerES.lorem.sentence({ min: 3, max: 5 }),
//         description: fakerES.lorem.sentence({ min: 10, max: 20 }),
//         imageSrc: fakerES.image.url({ width: 512, height: 512 }),
//         // location: randomElement(cityIds),

//         style: {
//           connect: { id: randomElement(styleIds) },
//         },
//         bodyPart: {
//           connect: { id: randomElement(bodyPartIds) },
//         },
//         artistProfile: {
//           connect: { id: randomElement(artistProfileIds) },
//         },
//         tags: {
//           create: randomTags.map((id) => ({
//             tag: {
//               connect: {
//                 id: id,
//               },
//             },
//           })),
//         },
//       },
//     });

//     tattooPromises.push(tattoo);
//   }

//   const newTattoos = await prisma.$transaction(tattooPromises);
//   console.log(`${newTattoos.length}TATTOOS created`);

//   const tattooIds = await prisma.tattoo
//     .findMany()
//     .then((tattoos) => tattoos.map((tattoo) => tattoo.id));

//   // delete all the saves in the database
//   await prisma.savedTattoo.deleteMany({});
//   console.log("TATTOO SAVES deleted");

//   // get an array of numSaves random tattooIds
//   const randomTattooIds = selectNFromArray(tattooIds, numSaves);
//   const randomUserIds = selectNFromArray(userIds, numSaves);

//   console.log("STARTING SAVES CREATION");
//   // create 200 random saves
//   // console.log("RANDOM USER IDS", randomUserIds)

//   const savedTattoosPromises = randomTattooIds
//     .map((tattooId, index) => {
//       if (!randomUserIds[index]) {
//         console.error("Invalid user ID:");
//         return null;
//       }

//       return prisma.savedTattoo.create({
//         data: {
//           tattoo: {
//             connect: {
//               id: tattooId,
//             },
//           },
//           user: {
//             connect: {
//               id: randomElement(userIds),
//             },
//           },
//         },
//       });
//     })
//     .filter(Boolean);

//   await prisma.$transaction(savedTattoosPromises);
//   console.log("SAVES created");

//   // delete all the likes in the database
//   await prisma.likedTattoo.deleteMany({});

//   // get an array of 400 random tattooIds
//   const randomTattooIds2 = selectNFromArray(tattooIds, numLikes);
//   // get an array of 400 random userIds
//   const randomUserIds2 = selectNFromArray(userIds, numLikes);

//   console.log("STARTING TATTOO LIKES CREATION");
//   // create 200 random saves

//   const likedTattoosPromises = randomTattooIds2
//     .map((tattooId, index) => {
//       if (!randomUserIds2[index]) {
//         console.error("Invalid user ID:", randomUserIds2[index]);
//         return null;
//       }

//       return prisma.likedTattoo.create({
//         data: {
//           tattoo: {
//             connect: {
//               id: tattooId,
//             },
//           },
//           user: {
//             connect: {
//               id: randomElement(userIds),
//             },
//           },
//         },
//       });
//     })
//     .filter(Boolean);

//   await prisma.$transaction(likedTattoosPromises);

//   console.log("TATTOO LIKES created");

//   // delete all the saves in the database
//   await prisma.savedArtist.deleteMany({});
//   console.log("ARTIST SAVES deleted");

//   // get an array of 200 random ArtistIds
//   const randomArtistIds = selectNFromArray(artistProfileIds, numSaves);
//   // get an array of 200 random userIds
//   const randomUserIds3 = selectNFromArray(userIds, numSaves);

//   console.log("STARTING SAVES CREATION");
//   // create 200 random saves

//   const savedArtistPromises = randomArtistIds
//     .map((artistId, index) => {
//       if (!randomUserIds3[index]) {
//         console.error("Invalid user ID:", randomUserIds3[index]);
//         return null;
//       }

//       return prisma.savedArtist.create({
//         data: {
//           artistProfile: {
//             connect: {
//               id: artistId,
//             },
//           },
//           user: {
//             connect: {
//               id: randomElement(userIds),
//             },
//           },
//         },
//       });
//     })
//     .filter(Boolean);

//   await prisma.$transaction(savedArtistPromises);
//   console.log("ARTIST SAVES created");

//   // delete all the likes in the database
//   await prisma.likedArtist.deleteMany({});

//   // get an array of 400 random tattooIds
//   const randomArtistIds2 = selectNFromArray(artistProfileIds, numLikes);
//   // get an array of 400 random userIds
//   const randomUserIds4 = selectNFromArray(userIds, numLikes);

//   console.log("STARTING ARTIST LIKES CREATION");
//   // create 200 random saves

//   const likedArtistPromises = randomArtistIds2
//     .map((artistId, index) => {
//       if (!randomUserIds3[index]) {
//         console.error("Invalid user ID:", randomUserIds3[index]);
//         return null;
//       }

//       return prisma.likedArtist.create({
//         data: {
//           artistProfile: {
//             connect: {
//               id: artistId,
//             },
//           },
//           user: {
//             connect: {
//               id: randomElement(userIds),
//             },
//           },
//         },
//       });
//     })
//     .filter(Boolean);

//   await prisma.$transaction(likedArtistPromises);
//   console.log("ARTIST LIKES created");

//   // delete all the boards in the database
//   await prisma.board.deleteMany({});

//   // get an array of numBoards random userIds
//   const randomUserIds5 = selectNFromArray(userIds, numBoards);

//   console.log("STARTING BOARDS CREATION");
//   // create numBoards random boards

//   const boardPromises = randomUserIds5
//     .map((userId, index) => {
//       if (!randomUserIds5[index]) {
//         console.error("Invalid user ID:", randomUserIds5[index]);
//         return null;
//       }

//       return prisma.board.create({
//         data: {
//           title: fakerES.lorem.sentence({ min: 3, max: 5 }),
//           user: {
//             connect: {
//               id: randomElement(userIds),
//             },
//           },
//         },
//       });
//     })
//     .filter(Boolean);

//   await prisma.$transaction(boardPromises);
//   console.log("BOARDS created");

//   const boardIds = await prisma.board
//     .findMany()
//     .then((boards) => boards.map((board) => board.id));

//   // delete all the boardTattoos in the database
//   await prisma.boardTattoo.deleteMany({});
//   console.log("BOARD TATTOOS deleted");

//   // get an array of 3 x numBoards random boardIds
//   const randomBoardIds = selectNFromArray(boardIds, 3 * numBoards);

//   // get an array of 3 x numBoards random tattooIds
//   const randomTattooIds3 = selectNFromArray(tattooIds, 3 * numBoards);

//   console.log("STARTING BOARD TATTOOS CREATION");

//   // create 3 x numBoards random boardTattoos

//   const boardTattooPromises = randomBoardIds
//     .map((boardId, index) => {
//       if (!randomBoardIds[index]) {
//         console.error("Invalid board ID:", randomBoardIds[index]);
//         return null;
//       }
//       if (!randomTattooIds3[index]) {
//         console.error("Invalid board ID:", randomBoardIds[index]);
//         return null;
//       }

//       return prisma.boardTattoo.create({
//         data: {
//           board: {
//             connect: {
//               id: boardId,
//             },
//           },
//           tattoo: {
//             connect: {
//               id: randomTattooIds3[index],
//             },
//           },
//         },
//       });
//     })
//     .filter(Boolean);

//   await prisma.$transaction(boardTattooPromises);
//   console.log("BOARD TATTOOS created");
// };

// seedDb();
