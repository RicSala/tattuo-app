module.exports._typesOnly = true;


// Another option is doing like this:
// /** 
//  * @typedef { import("@prisma/client").Post } Post
//  * 
// */
// But that does not populate the "include". though I am pretty sure it can be done with something similar to...

// /** 
//  * @typedef { import("@prisma/client").ArtistProfile } ArtistProfile
// //  * @typedef { import("@prisma/client").Prisma. } // in order to get the suggestions, first write the } 
//  * @typedef { import("@prisma/client").Prisma.UserInclude<boards> } 
// */



/**
 * @typedef {Object} BlogPost
 * @property {String} slug
 * @property {String} title
 * @property {String} published
 * @property {String} tags
 * @property {String} date
 * /

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} [name]
 * @property {string} [email]
 * @property {Date} [emailVerified]
 * @property {string} [image]
 * @property {string} [hashedPassword]
 * @property {string} [confirmPassword]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {UserRole} role
 * @property {Board[]} boards
 * @property {Account[]} accounts
 * @property {ArtistProfile} artist
 * @property {SavedTattoo[]} savedTattoos
 * @property {SavedArtist[]} savedArtists
 * @property {LikedTattoo[]} likedTattoos
 * @property {LikedArtist[]} likedArtists
 */


/**
 * @typedef {Object} Account
 * @property {string} id
 * @property {string} userId
 * @property {string} type
 * @property {string} provider
 * @property {string} providerAccountId
 * @property {string} [refresh_token]
 * @property {string} [access_token]
 * @property {number} [expires_at]
 * @property {string} [token_type]
 * @property {string} [scope]
 * @property {string} [id_token]
 * @property {string} [session_state]
 * @property {User} user
 */


/**
 * @typedef {Object} ArtistProfile
 * @property {string} id
 * @property {User} user
 * @property {string} userId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} [artisticName]
 * @property {string} [email]
 * @property {string} [bio]
 * @property {string} [phone]
 * @property {string} [website]
 * @property {string} [instagram]
 * @property {string} [facebook]
 * @property {string} [twitter]
 * @property {string} [youtube]
 * @property {string} [tiktok]
 * @property {string} [mainImage]
 * @property {string[]} images
 * @property {string[]} stylesIds
 * @property {Style[]} styles
 * @property {number} [pricePerHour]
 * @property {number} [pricePerSession]
 * @property {number} [minWorkPrice]
 * @property {boolean} [isComplete]
 * @property {Tattoo[]} tattoos
 * @property {SavedArtist[]} saves
 * @property {LikedArtist[]} likes
 * @property {string} [cityId]
 * @property {City} [city]
 */


/**
 * @typedef {Object} Tattoo
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} title
 * @property {string} description
 * @property {string} imageSrc
 * @property {string} [content]
 * @property {string} [artistProfileId]
 * @property {ArtistProfile} [artistProfile]
 * @property {SavedTattoo[]} saves
 * @property {LikedTattoo[]} likes
 * @property {TaggedTattoo[]} tags
 * @property {string} [styleId]
 * @property {Style} [style]
 * @property {string} [bodyPartId]
 * @property {BodyPart} [bodyPart]
 * @property {BoardTattoo[]} boards
 */



/**
 * @typedef {Object} SavedTattoo
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} tattooId
 * @property {Tattoo} tattoo
 * @property {string} userId
 * @property {User} user
 */

/**
 * @typedef {Object} SavedArtist
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} artistProfileId
 * @property {ArtistProfile} artistProfile
 * @property {string} userId
 * @property {User} user
 */

/**
 * @typedef {Object} LikedTattoo
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} tattooId
 * @property {Tattoo} tattoo
 * @property {string} userId
 * @property {User} user
 */

/**
 * @typedef {Object} TaggedTattoo
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} tattooId
 * @property {Tattoo} tattoo
 * @property {string} tagId
 * @property {Tag} tag
 */

/**
 * @typedef {Object} LikedArtist
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} artistProfileId
 * @property {ArtistProfile} artistProfile
 * @property {string} userId
 * @property {User} user
 */

/**
 * @typedef {Object} Board
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} title
 * @property {boolean} [public]
 * @property {string} userId
 * @property {User} user
 * @property {BoardTattoo[]} tattoos
 */

/**
 * @typedef {Object} BoardTattoo
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} boardId
 * @property {Board} board
 * @property {string} tattooId
 * @property {Tattoo} tattoo
 */



/**
 * @typedef {Object} City
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} parent_code
 * @property {string} code
 * @property {string} label
 * @property {string} value
 * @property {ArtistProfile[]} artistProfile
 */


/**
 * @typedef {Object} BodyPart
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} label
 * @property {string} value
 * @property {Tattoo[]} tattoo
 */

/**
 * @typedef {Object} Style
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} label
 * @property {string} value
 * @property {Tattoo[]} tattoos
 * @property {string[]} artistProfileIds
 * @property {ArtistProfile[]} artistProfiles
 */

/**
 * @typedef {Object} Tag
 * @property {string} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} label
 * @property {string} value
 * @property {TaggedTattoo[]} tattoos
 */



/**
 * @enum {string}
 * @readonly
 */
const UserRole = {
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT',
    ARTIST: 'ARTIST',
};




