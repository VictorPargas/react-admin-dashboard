import { useState } from "react";
import { Box, Button, TextField, Modal, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataSubjects } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Subjects = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [subjects, setSubjects] = useState(mockDataSubjects);
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    id: "",
    subjectCode: "",
    name: "",
    teacher: "",
    credits: "",
    semester: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { ...newSubject, id: subjects.length + 1 }]);
    handleClose();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "subjectCode", headerName: "Código da Disciplina", flex: 1 },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "teacher",
      headerName: "Professor",
      flex: 1,
    },
    {
      field: "credits",
      headerName: "Nível",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "semester",
      headerName: "Semestre",
      flex: 1,
    },
    {
        field: "finish",
        headerName: "Termino",
        flex:1
    },
  ];

  return (
    <Box m="20px">
      <Header title="DISCIPLINAS" subtitle="Lista de Disciplinas para Referência Futura" />
      <Box display="flex" justifyContent="flex-end" m="20px 0">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Adicionar Disciplina
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid rows={subjects} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor="background.paper"
          borderRadius="8px"
          boxShadow={24}
          p={4}
          m="auto"
          mt={8}
          width="400px"
        >
          <Typography variant="h6" component="h2" mb={2}>
            Adicionar Nova Disciplina
          </Typography>
          <TextField
            name="subjectCode"
            label="Código da Disciplina"
            fullWidth
            margin="normal"
            value={newSubject.subjectCode}
            onChange={handleChange}
          />
          <TextField
            name="name"
            label="Nome"
            fullWidth
            margin="normal"
            value={newSubject.name}
            onChange={handleChange}
          />
          <TextField
            name="teacher"
            label="Professor"
            fullWidth
            margin="normal"
            value={newSubject.teacher}
            onChange={handleChange}
          />
          <TextField
            name="credits"
            label="Créditos"
            type="number"
            fullWidth
            margin="normal"
            value={newSubject.credits}
            onChange={handleChange}
          />
          <TextField
            name="semester"
            label="Semestre"
            fullWidth
            margin="normal"
            value={newSubject.semester}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleAddSubject} sx={{ mt: 2 }}>
            Adicionar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Subjects;
