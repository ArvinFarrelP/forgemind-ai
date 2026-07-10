/**
 * ForgeMind AI does not use TypeScript, so this module documents the shape
 * of the core data structures used across the app via JSDoc typedefs. Import
 * these as reference when working with store data.
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} plan
 *
 * @typedef {Object} HistoryItem
 * @property {string} id
 * @property {string} categoryId
 * @property {string} prompt
 * @property {string} content
 * @property {string} tone
 * @property {string} language
 * @property {boolean} favorite
 * @property {string} createdAt
 *
 * @typedef {Object} Template
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} prompt
 *
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} label
 * @property {string} group
 * @property {string} systemPrompt
 */

export {}
