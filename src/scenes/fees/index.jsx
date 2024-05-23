import { Box, Button, Modal, TextField, Typography, useTheme, Checkbox } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { tokens } from "../../theme";
import { mockDataFees } from "../../data/mockData";
import Header from "../../components/Header";

const Fees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentDate, setPaymentDate] = useState("");

  const handleOpen = (fee) => {
    setSelectedFee(fee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFee(null);
    setPaymentDate("");
  };

  const handleConfirmPayment = () => {
    // Lógica para confirmar o pagamento
    console.log("Pagamento confirmado para:", selectedFee, "na data:", paymentDate);
    handleClose();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "student", headerName: "Aluno", flex: 1 },
    { field: "cpf", headerName: "CPF", flex: 1 },
    { field: "subject", headerName: "Disciplina", flex: 1 },
    { field: "amount", headerName: "Valor", flex: 1 },
    { field: "dueDate", headerName: "Vencimento", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <Checkbox
          onClick={() => handleOpen(params.row)}
          color="primary"
        />
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Mensalidades"
        subtitle="Lista de mensalidades dos alunos"
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
          rows={mockDataFees}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

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
            Dar Baixa no Pagamento
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Deseja realmente confirmar este pagamento?
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Valor a pagar: {selectedFee?.amount}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Data do Pagamento"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleConfirmPayment} sx={{ mt: 2 }}>
            Confirmar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Fees;
