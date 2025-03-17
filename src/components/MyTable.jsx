import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {  GridRowModes,  DataGrid,GridActionsCellItem,  GridRowEditStopReasons, GridToolbarContainer,} from '@mui/x-data-grid';
import { useEffect } from 'react';
import { Button } from '@mui/material';


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
        const now=new Date()
      const id = now.getTime()
      setRows((oldRows) => [
        ...oldRows,
        { id, name: '', isNew: true },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Új sor hozzáadása
        </Button>
      </GridToolbarContainer>
    );
  }

export const MyTable=({data,cols,handleUpdate,handleDelete,handleInsert,validationRules})=> {
  const [rows, setRows] = React.useState(data);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(()=>{
    console.log('useEffect');
    setRows([...data])
  },[data])
 
 //console.log('myTable:',data); 
 //console.log("rows:",rows);
 

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
   
  };
  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    handleDelete(id)
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const errors = Object.keys(validationRules)
    .map((field) => ({ field, error: validationRules[field](newRow[field]) }))
    .filter(({ error }) => error !== null);

  if (errors.length > 0) {
    alert(errors.map((err) => `${err.field}: ${err.error}`).join('\n'));
    throw new Error('Érvénytelen adat!');
  }


    const isInsert = newRow.isNew === true; // Új beszúrás?
    const updatedRow = { ...newRow, isNew: false };
  
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  
    if (isInsert) {
      console.log("Új sor hozzáadása:", updatedRow);
       handleInsert(updatedRow);
    } else {
      console.log("Meglévő sor frissítése:", updatedRow);
      handleUpdate(updatedRow.id, updatedRow);
    }
  
    return updatedRow;
  };
  

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  /*let cols=[]
  for(let key in groups){
    groups[key] && cols.push({
      field: key, 
      headerName: 'csop'+key.slice(-1), width: 100,
      editable: true,
      type: 'singleSelect',
      valueOptions: [...groups[key].split(','), 'x'],
      renderHeader: (params) => <CustomColumnHeader colDef={params.colDef} info={groups[key].split(',')[0]}/>,  // Egyéni oszlopfejléc hozzáadása 
      })
  }
  
  console.log('cols:',cols);   

  cols.push({field:'name', headerName: 'név', width: 150})
  cols.sort((a,b)=> a.headerName.localeCompare(b.headerName));
  cols=cols.filter(obj=>obj?.valueOptions ? obj.valueOptions.length>0 : obj)*/

  const columns = [...cols,
    {field: 'actions',type: 'actions',headerName: 'Actions',width: 100,cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />}label="Save" sx={{color: 'primary.main',}} onClick={handleSaveClick(id)} />,
            <GridActionsCellItem icon={<CancelIcon />} label="Cancel"className="textPrimary" onClick={handleCancelClick(id)} color="inherit"/>,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon style={{color:'blue'}}/>} label="Edit" className="textPrimary" onClick={handleEditClick(id)} color="inherit"/>,
          <GridActionsCellItem icon={<DeleteIcon style={{color:'red'}}/>} label="Delete" onClick={handleDeleteClick(id)} color="inherit"/>,
        ];
      },
    },
  ];

  return (
    <Box sx={{height: '100%', width: '100%','& .actions': { color: 'text.secondary', },'& .textPrimary': {color: 'text.primary', }, }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.log(error)}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>

  );
}
