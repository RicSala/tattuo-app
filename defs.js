// This is a file with type definitions


/**
 * @module types
 */

// tattoo type
// prisma model:


// model Tattoo {
//     id        String   @id @default(auto()) @map("_id") @db.ObjectId
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     title       String
//     description String
//     imageSrc    String
//     content     String?
//     // numLikes      Int      @default(0)

//     // RELATIONS
//     artistProfileId String?        @db.ObjectId
//     artistProfile   ArtistProfile? @relation(fields: [artistProfileId], references: [id])

//     saves SavedTattoo[]
//     likes LikedTattoo[]
//     tags  TaggedTattoo[]

//     styleId String? @db.ObjectId
//     style   Style?  @relation(fields: [styleId], references: [id])

//     bodyPartId String?   @db.ObjectId
//     bodyPart   BodyPart? @relation(fields: [bodyPartId], references: [id])

//     boards BoardTattoo[]
//   }
// ChatGPT Copilot: create the type definition of the above model using JSDocs

/**
 * @typedef {Object} TattooType
 * @property {string} id
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} title
 * @property {string} description
 * @property {string} imageSrc
 * @property {string} content
 * @property {string} artistProfileId
 * @property {string} artistProfile
 * @property {string} saves
 * @property {string} likes
 * @property {string} tags
 * @property {string} styleId
 * @property {string} style
 * @property {string} bodyPartId
 * @property {string} bodyPart
 * @property {string} boards
 */

/**
 * @typedef {Object} Foo
 * @prop {String} name
 */


export { }
