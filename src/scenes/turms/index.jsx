import { useState } from "react";
import { Box, Button, Modal, Typography, TextField, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataClasses } from "../../data/mockData";
import { mockDataStudents } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckBoxIcon  from "@mui/icons-material/CheckBox";
 
const Classes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [classes, setClasses] = useState(mockDataClasses);
  const [open, setOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    id: "",
    subject: "",
    room: "",
    teacher: "",
    schedule: "",
    days: "",
  });
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEnrollModal = () => setOpenEnrollModal(true);
  const handleCloseEnrollModal = () => setOpenEnrollModal(false);

  const handleChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  const handleAddClass = () => {
    setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
    handleClose();
  };

  const handleEditClass = (id) => {
    // Lógica para editar uma turma
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  const handleViewClass = (id) => {
    // Lógica para ver detalhes de uma turma
  };

  const handleSelectStudent = (studentId) => {
    const isSelected = selectedStudents.includes(studentId);
    setSelectedStudents((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const calculateStudentsCount = (subject) => {
    return mockDataStudents.filter((student) => student.subject === subject).length;
  };


  const handleEnrollStudents = () => {
    // Lógica para matricular os alunos selecionados na turma
    console.log("Alunos selecionados:", selectedStudents);
    handleCloseEnrollModal();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "subject",
     headerName: "Disciplina",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Typography>{params.value}</Typography>
          <Typography variant="body2" color="textSecondary">
          {" (" + calculateStudentsCount(params.value) + ")"}
          </Typography>
        </Box>
      ),
    },
    { field: "room", headerName: "Sala", flex: 1 },
    { field: "teacher", headerName: "Professor", flex: 1 },
    { field: "schedule", headerName: "Horário", flex: 1 },
    { field: "days", headerName: "Dias", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between" width="100%">
          <IconButton onClick={() => handleEditClass(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClass(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleViewClass(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleOpenEnrollModal(params.row.id)}>
            <PersonAddIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const studentColumns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Nome", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleSelectStudent(params.row.id)}
          color={selectedStudents.includes(params.row.id) ? "primary" : "default"}
        >
          {selectedStudents.includes(params.row.id) ? <CheckBoxIcon />  : <AddIcon />}
        </IconButton>
      ),
    },
  ];


  return (
    <Box m="20px">
      <Header title="TURMAS" subtitle="Lista de Turmas para Referência Futura" />
      <Box display="flex" justifyContent="flex-end" m="20px 0">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Adicionar Turma
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
        <DataGrid rows={classes} columns={columns} components={{ Toolbar: GridToolbar }} />
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
            Adicionar Nova Turma
          </Typography>
          <TextField
            name="subject"
            label="Disciplina"
            fullWidth
            margin="normal"
            value={newClass.subject}
            onChange={handleChange}
          />
          <TextField
            name="room"
            label="Sala"
            fullWidth
            margin="normal"
            value={newClass.room}
            onChange={handleChange}
          />
          <TextField
            name="teacher"
            label="Professor"
            fullWidth
            margin="normal"
            value={newClass.teacher}
            onChange={handleChange}
          />
          <TextField
            name="schedule"
            label="Horário"
            fullWidth
            margin="normal"
            value={newClass.schedule}
            onChange={handleChange}
          />
          <TextField
            name="days"
            label="Dias"
            fullWidth
            margin="normal"
            value={newClass.days}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleAddClass} sx={{ mt: 2 }}>
            Adicionar
          </Button>
        </Box>
      </Modal>

      <Modal open={openEnrollModal} onClose={handleCloseEnrollModal}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor={theme.palette.background.default}
          borderRadius="8px"
          boxShadow={24}
          p={4}
          m="auto"
          mt={8}
          width="600px"
        >
          <Typography variant="h6" component="h2" mb={2}>
            Matricular Alunos
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={mockDataStudents} columns={studentColumns} pageSize={5} checkboxSelection />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEnrollStudents}
            disabled={selectedStudents.length === 0}
            sx={{ mt: 2 }}
          >
            Matricular Selecionados
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Classes;
