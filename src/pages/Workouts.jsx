import React from 'react'
import { deleteData, insertData, readData, updateData } from '../appwrite/crud'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MyTable } from '../components/MyTable';


const cols= [
    { field: 'name', headerName: 'Név', width: 150,editable: true },
 
  ];


export const Workouts = () => {
  const {data,isLoading,isError,error}=useQuery({queryKey:['workouts','name'],queryFn:readData})
  data & console.log(data);
       
isError && console.log(error);

const queryClient = useQueryClient();

 // Módosítás kezelése
 const updateMutation = useMutation({
  mutationFn: updateData, 
  onSuccess: () => {
      queryClient.invalidateQueries(['workouts']); 
      console.log('ok');    
  },
  onError:(err)=>{
    console.log(err);    
  }
});
 // törlés kezelése
 const deleteMutation = useMutation({
  mutationFn: deleteData, 
  onSuccess: () => {
      queryClient.invalidateQueries(['workouts']); 
      console.log('ok');    
  },
  onError:(err)=>{
    console.log(err);    
  }
});
// insert kezelése
const addMutation = useMutation({
  mutationFn: insertData, 
  onSuccess: () => {
      queryClient.invalidateQueries(['workouts']); 
      console.log('ok');    
  },
  onError:(err)=>{
    console.log(err);    
  }
});

// Adatmódosító callback
const handleUpdate = (id,updatedRow) => {
  console.log(id,updatedRow);//itt megvan az adat
  const {name,$updatedData}=updatedRow
  updateMutation.mutate({ collectionName:'workouts', id, payload: {name,$updatedData} }); 
};
const handleDelete=(id)=>{
  deleteMutation.mutate({ collectionName:'workouts', id }); 
}
const handleInsert=({name})=>{
  addMutation.mutate({ collectionName:'workouts', name }); 
}

  return (
    <div style={{maxWidth:'400px',margin:'1rem auto'}}>
      <h2 style={{textAlign:'center',padding:'10px'}}>Edzés típusok</h2>
    {data &&  <MyTable cols={cols} data={data.map(obj=>({...obj,id:obj.$id}))}
       handleUpdate={handleUpdate}    handleDelete={handleDelete}  handleInsert={handleInsert}  />}
    </div>
  )
}

