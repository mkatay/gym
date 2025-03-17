import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {  GridRowModes,  DataGrid,GridActionsCellItem,  GridRowEditStopReasons,} from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useState } from 'react';
import { updateStudentGroups } from '../utils';


export const TableView=({students,groups})=> {
  const [rows, setRows] = React.useState(students);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(()=>{
    console.log('useEffect');
    setRows([...students])
  },[students])
 
 console.log('myTable:',students); 
 console.log('groups:',groups);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  let cols=[]
  for(let key in groups){
    groups[key] && cols.push({field: key, headerName: 'csop'+key.slice(-1), width: 100,})
  }
  
  console.log('cols:',cols);   

  cols.push({field:'name', headerName: 'név', width: 150})
  cols.sort((a,b)=> a.headerName.localeCompare(b.headerName));
  cols=cols.filter(obj=>obj?.valueOptions ? obj.valueOptions.length>0 : obj)

  const columns = [...cols];

  return (
    <div className='w-full max-w-7xl sm:p-5 p-2'>
    <Box sx={{height: '100%', width: '100%','& .actions': { color: 'text.secondary', },'& .textPrimary': {color: 'text.primary', }, }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
       
      />
    </Box>
    
    </div>
  );
}
