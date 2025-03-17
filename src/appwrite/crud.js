import { client } from "./configAppwrite";
import db from "./databases";

const collectionMap = {
    workouts: import.meta.env.VITE_COLLECTION_ID_WORKOUTS,
    trainers: import.meta.env.VITE_COLLECTION_ID_TRAINERS,
    members: import.meta.env.VITE_COLLECTION_ID_MEMBERS,
    classes:import.meta.env.VITE_COLLECTION_ID_CLASSES,
    reservations:import.meta.env.VITE_COLLECTION_ID_RESERVATIONS
};


export const readData=async ({queryKey})=>{
    console.log(queryKey);
    let resp
    if(queryKey.length==2)
        resp=await db[queryKey[0]].list(queryKey[1])//order 1 mező szerint
    else
        resp=await db[queryKey[0]].list2(queryKey[1],queryKey[2])//order 2 mező szerint
    return resp.documents
}
export const updateData=async ({collectionName,id, payload})=>{
    console.log(id,payload);    
   const resp=await db[collectionName].update(id,payload)
    return resp.documents
}
export const deleteData=async ({collectionName,id})=>{
    console.log(id);    
   const resp=await db[collectionName].delete(id)
    return resp.documents
}
export const insertData=async (obj)=>{
    const { collectionName, ...newObj } = obj;
   const resp=await db[obj.collectionName].create(newObj)
    return resp.documents
}

/********************************************** */
export const snapshotData= (setState,collectionName)=>{
    const collectionId=collectionMap[collectionName]
    console.log(collectionId);
    
    const unsubscribe = client.subscribe(`databases.${import.meta.env.VITE_DATABASE_ID}.collections.${collectionId}.documents`, response => {
    // Callback will be executed on changes for all files.
    //console.log( "snapshot",response);
    if (response.events[0].includes("delete")) {
        setState((prev) => prev.filter((obj) => response.payload.$id != obj.$id))
    }
    if (response.events[0].includes("create")) {
        setState((prev) => [...prev, response.payload])
    }
    if (response.events[0].includes("update")) {
        //console.log('update:',response.payload);
        setState((prev) => prev.map((obj) => response.payload.$id == obj.$id? response.payload : obj))
    }
        
});

return unsubscribe
}

/**snapshot használata komponensben:
 *  useEffect(()=>{
        readData('workouts',setWorkouts)
         const unsubscribe=snapshotData(setWorkouts,'WORKOUTS')
         return unsubscribe
     },[])
 * 
 * 
 */