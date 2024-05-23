import { useState } from "react";
import { Box, Button, TextField, Modal, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataEnrollments } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Enrollments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openClassesModal, setOpenClassesModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState(null);

  const handleOpenStudentModal = (student) => {
    setSelectedStudent(student);
    setOpenStudentModal(true);
  };

  const handleOpenClassesModal = (classes) => {
    setSelectedClasses(classes);
    setOpenClassesModal(true);
  };

  const handleCloseStudentModal = () => setOpenStudentModal(false);
  const handleCloseClassesModal = () => setOpenClassesModal(false);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Telefone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cpf",
      headerName: "CPF",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Idade",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "rede",
      headerName: "Rede",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenStudentModal(params.row)}
            sx={{ marginRight: 1 }}
          >
            Dados Aluno
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenClassesModal(params.row)}
          >
            Ver Turmas
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Matrículas"
        subtitle="Informações das Matrículas"
      />
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
        <DataGrid
          rows={mockDataEnrollments}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Modal for Student Data */}
      <Modal
        open={openStudentModal}
        onClose={handleCloseStudentModal}
        aria-labelledby="student-modal-title"
        aria-describedby="student-modal-description"
      >
        <Box sx={style}>
          <Typography id="student-modal-title" variant="h6" component="h2">
            Dados do Aluno
          </Typography>
          {selectedStudent && (
            <Box>
              <Typography>ID: {selectedStudent.id}</Typography>
              <Typography>Nome: {selectedStudent.name}</Typography>
              <Typography>Telefone: {selectedStudent.phone}</Typography>
              <Typography>Email: {selectedStudent.email}</Typography>
              <Typography>CPF: {selectedStudent.cpf}</Typography>
              <Typography>Idade: {selectedStudent.age}</Typography>
              <Typography>Rede: {selectedStudent.rede}</Typography>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Modal for Class Data */}
      <Modal
        open={openClassesModal}
        onClose={handleCloseClassesModal}
        aria-labelledby="classes-modal-title"
        aria-describedby="classes-modal-description"
      >
        <Box sx={style}>
          <Typography id="classes-modal-title" variant="h6" component="h2">
            Dados das Turmas
          </Typography>
          {selectedClasses && (
            <Box>
              <Typography>Disciplina: {selectedClasses.subject}</Typography>
              <Typography>Dias: {selectedClasses.days}</Typography>
              <Typography>Horário: {selectedClasses.schedule}</Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Enrollments;
