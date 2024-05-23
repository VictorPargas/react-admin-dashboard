import { Box, Button, Modal, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { tokens } from "../../theme";
import { mockTeacherSubjects } from "../../data/mockData";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ClassIcon from "@mui/icons-material/Class";

const TeacherDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [openSemesterModal, setOpenSemesterModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSemester = (semester) => {
    setSelectedSemester(semester);
    setOpenSemesterModal(true);
  };

  const handleCloseSemester = () => {
    setOpenSemesterModal(false);
    setSelectedSemester(null);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "subject", headerName: "Disciplina", flex: 1 },
    { field: "completed", headerName: "Concluída", flex: 1 },
    { field: "days", headerName: "Dias de Aula", flex: 1 },
    { field: "time", headerName: "Horário de Aula", flex: 1 },
    { field: "startYear", headerName: "Ano de Início", flex: 1 },
    { field: "endDate", headerName: "Data de Conclusão", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Chamada
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="DASHBOARD DO PROFESSOR" subtitle="Bem-vindo ao painel do Professor" />

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* Stat Boxes */}
        <Box gridColumn="span 4" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="Chamada"
            subtitle="Gestão de Chamadas"
            icon={<AssignmentIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            onClick={handleOpen}
          />
        </Box>
        <Box gridColumn="span 4" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="Boletim"
            subtitle="Lançamento de Notas"
            icon={<SchoolIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn="span 4" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="Aulas"
            subtitle="Gestão de Aulas"
            icon={<ClassIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
      </Box>

      <Box mt="40px">
        <DataGrid
          rows={mockTeacherSubjects}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoHeight
        />
      </Box>

      {/* Modal para Chamada */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Semestres Disponíveis
          </Typography>
          <Box mt={2}>
            {/* Exemplo de semestres, pode ser substituído por dados reais */}
            {["2023/1", "2023/2"].map((semester, index) => (
              <Button key={index} onClick={() => handleOpenSemester(semester)}>
                {semester}
              </Button>
            ))}
          </Box>
        </Box>
      </Modal>

      {/* Modal para Aulas do Semestre */}
      <Modal open={openSemesterModal} onClose={handleCloseSemester}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Aulas do Semestre {selectedSemester}
          </Typography>
          <Box mt={2}>
            {/* Exemplo de aulas, pode ser substituído por dados reais */}
            {["Aula 1", "Aula 2", "Aula 3"].map((lesson, index) => (
              <Typography key={index}>{lesson}</Typography>
            ))}
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary">
              <a href={`/relatorios/${selectedSemester}`} style={{ color: '#fff', textDecoration: 'none' }}>
                Relatório de Chamadas
              </a>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TeacherDashboard;
