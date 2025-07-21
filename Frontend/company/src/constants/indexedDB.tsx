// src/constants/indexedDB.ts
import { openDB } from 'idb';

const DB_NAME = 'insurehub-db';
const DB_VERSION = 1; // Increment version if you change the schema
const USER_STORE = 'users';
const COMPANY_REGISTRATION_STORE = 'companyRegistrations'; // New store name

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // Create 'users' store if it doesn't exist
    if (!db.objectStoreNames.contains(USER_STORE)) {
      db.createObjectStore(USER_STORE, { keyPath: 'email' });
    }
    // Create 'companyRegistrations' store if it doesn't exist
    if (!db.objectStoreNames.contains(COMPANY_REGISTRATION_STORE)) {
      db.createObjectStore(COMPANY_REGISTRATION_STORE, { keyPath: 'companyEmail', autoIncrement: false });
      // Using 'companyEmail' as keyPath for uniqueness. If company name is unique, you could use that too.
      // If you want a generated ID, use { keyPath: 'id', autoIncrement: true } and generate/assign 'id' in your form data.
    }
  },
});

export const IndexedDB = {
  // User related functions (keep these if they are used elsewhere)
  async addUser(user: {
    name: string;
    email: string;
    password: string;
    userType: string;
    agreed_tnc: boolean;
  }) {
    const db = await dbPromise;
    await db.put(USER_STORE, user);
  },

  async getUser(email: string) {
    const db = await dbPromise;
    return db.get(USER_STORE, email);
  },

  async getAllUsers() {
    const db = await dbPromise;
    return db.getAll(USER_STORE);
  },

  async deleteUser(email: string) {
    const db = await dbPromise;
    return db.delete(USER_STORE, email);
  },

  async clearUsers() {
    const db = await dbPromise;
    return db.clear(USER_STORE);
  },

  // --- Company Registration Functions ---
  async addCompanyRegistration(companyData: {
    companyName: string;
    companyEmail: string;
    password: string;
    confirmPassword?: string; // Optional, as you might strip it before saving
    contactPerson: string;
    phoneNumber: string;
    website?: string;
    companyType: string;
    registrationNumber: string;
    taxId: string;
    yearFounded?: string;
    numberOfEmployees?: string;
    address?: string;
    country: string;
    insuranceLicenseNumber: string;
    regulatoryBody: string;
    description?: string;
    agreed_tnc: boolean;
    status: string; // Added status field
    registeredAt: string; // Added timestamp
  }) {
    const db = await dbPromise;
    // We'll remove confirmPassword here just before saving, as it's not needed for storage
    const { confirmPassword, ...dataToStore } = companyData;
    await db.put(COMPANY_REGISTRATION_STORE, dataToStore);
  },

  async getCompanyRegistration(companyEmail: string) {
    const db = await dbPromise;
    return db.get(COMPANY_REGISTRATION_STORE, companyEmail);
  },

  async getAllCompanyRegistrations() {
    const db = await dbPromise;
    return db.getAll(COMPANY_REGISTRATION_STORE);
  },

  async deleteCompanyRegistration(companyEmail: string) {
    const db = await dbPromise;
    return db.delete(COMPANY_REGISTRATION_STORE, companyEmail);
  },

  async clearCompanyRegistrations() {
    const db = await dbPromise;
    return db.clear(COMPANY_REGISTRATION_STORE);
  },
};