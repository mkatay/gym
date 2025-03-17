import { databases } from "./configAppwrite";
import { ID, Query } from "appwrite";

const db = {};

const collections = [
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_WORKOUTS,
        name: "workouts",
    },
    {
        dbId: import.meta.env.VITE_DATABASE_ID,
        id: import.meta.env.VITE_COLLECTION_ID_CLASSES,
        name: "classes",
    },
];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload, /*permissions,*/ id = ID.unique()) =>
            databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                /*permissions*/
            ),
        update: (id, payload/*, permissions*/) =>
            databases.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                /*permissions*/
            ),
        delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

        list: (fieldName) =>
            databases.listDocuments(col.dbId, col.id, [
                Query.orderAsc(fieldName)
               
            ]),
        list2: (fieldName1,fieldName2) =>
            databases.listDocuments(col.dbId, col.id, [
                Query.orderAsc(fieldName1),
                Query.orderAsc(fieldName2),
            ]),

        get: (id) => databases.getDocument(col.dbId, col.id, id),
    };
});

export default db;