export const DEFAULT_STATE = {
  windowWidth: 1024,
  windowHeight: 768,
};


export const API_URL = process.env.NODE_ENV === "production" ? 
  "https://audit-the-streets.dfdev.dataplusfeminism.mit.edu" : 
  "http://localhost:3000";
