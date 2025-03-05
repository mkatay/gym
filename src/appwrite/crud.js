import db from "./databases";

export const readData=async (colName,setState)=>{
    const resp=await db[colName].list()
    setState(resp.documents)
}