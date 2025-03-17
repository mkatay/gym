import React from 'react'
import { deleteData, insertData, readData, updateData } from '../appwrite/crud'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MyTable } from '../components/MyTable';
import { dayNames, dayNumbers } from '../utils';


const cols= [
    { field: 'name', headerName: 'Név', width: 110, editable: true },
    { 
      field: 'day_nr', 
      headerName: 'Nap', 
      width: 90, 
      editable: true,
      valueGetter: (val) => dayNames[val] || val
    },
    { field: 'time', headerName: 'Időpont', width: 90, editable: true },
    { field: 'trainer_id', headerName: 'Edző', width: 90, editable: true },
    { field: 'max_capacity', headerName: 'Max. létszám', width: 90, editable: true },
];
const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const validationRules = {
  name: (value) => value && value.trim() !== '' ? null : 'A név mező nem lehet üres!',
  day_nr: (value) => dayNumbers[value] ? null : 'Helytelen nap!',
  time: (value) => timeRegex.test(value) ? null : 'Érvénytelen időpont!',
  max_capacity:(value)=> +value ? null : 'Érvénytelen max.létszám!'
};


export const Classes = () => {
  const {data,isLoading,isError,error}=useQuery({queryKey:['classes','day_nr','time'],queryFn:readData})
  data & console.log(data);
       
isError && console.log(error);

const queryClient = useQueryClient();

 // Módosítás kezelése
 const updateMutation = useMutation({
  mutationFn: updateData, 
  onSuccess: () => {
      queryClient.invalidateQueries(['classes']); 
  },
  onError:(err)=>{
    console.log(err);    
  }
});
 // törlés kezelése
 const deleteMutation = useMutation({
  mutationFn: deleteData, 
  onSuccess: () => {
      queryClient.invalidateQueries(['classes']); 
  },
  onError:(err)=>{
    console.log(err);    
  }
});
// insert kezelése
const addMutation = useMutation({
  mutationFn: insertData, 
  onSuccess: () => {
      queryClient.invalidateQueries(['classes']); 
  },
  onError:(err)=>{
    console.log(err);    
  }
});

// Adatmódosító callback
const handleUpdate = (id,updatedRow) => {
  console.log(id,updatedRow);//itt megvan az adat
  let {name,day_nr,time,trainer_id,max_capacity,$updatedData}=updatedRow
  day_nr=dayNumbers[day_nr]|| null
  max_capacity=+max_capacity
  if(!day_nr) return
  updateMutation.mutate({ collectionName:'classes', id, payload: {name,day_nr,time,trainer_id,max_capacity,$updatedData} }); 
};
const handleDelete=(id)=>{
  deleteMutation.mutate({ collectionName:'classes', id }); 
}
const handleInsert=({name,day_nr,time,trainer_id,max_capacity})=>{
  console.log(name,day_nr,time,trainer_id,max_capacity);
  day_nr=dayNumbers[day_nr] || null
  max_capacity=+max_capacity
  if(!day_nr) return
  addMutation.mutate({ collectionName:'classes', name,day_nr,time,trainer_id,max_capacity }); 
}

  return (
    <div style={{maxWidth:'600px',margin:'1rem auto',backgroundColor:'white',padding:'10px'}}>
      <h2 style={{textAlign:'center',padding:'10px'}}>Edzés típusok</h2>
    {data &&  <MyTable cols={cols} data={data.map(obj=>({...obj,id:obj.$id}))}
       handleUpdate={handleUpdate}    handleDelete={handleDelete}  handleInsert={handleInsert}  
       validationRules={validationRules}
       />}
    </div>
  )
}

