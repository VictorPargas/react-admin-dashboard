sap.ui.define([
	"./BaseController",
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/Device",
	"sap/ui/core/Fragment",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageBox",
	"com/myorg/myapp/service/config",
	'sap/ui/export/Spreadsheet'
], function (BaseController, JSONModel, Device, Fragment, BusyIndicator, MessageBox, Export, ExportTypeCSV, Config, Spreadsheet) {
	"use strict";
	return BaseController.extend("com.myorg.myapp.controller.Consulta", {
		pageNumber: 1,
		pageSize: 10,
		onInit: function () {
			var oModel = this.initModel("viewModel");
			this.getView().setModel(oModel);

			this.loadDatePickerValues();
			this.loadQueryTypes();
			this.attachTableRowSelection();
			this.loadAvatarAndPopovers();
			this.attachPaginationButtons();
		},

		/**
		 * Carrega a página com Datas Pré Definidas
		 */
		loadDatePickerValues: function () {
			var startDatePicker = this.byId("startDatePicker");
			var endDatePicker = this.byId("endDatePicker");
			var currentDate = new Date();
			var currentMonth = currentDate.getMonth();
			var currentYear = currentDate.getFullYear();

			var firstDayOfMonth = new Date(currentYear, currentMonth, 1);
			startDatePicker.setDateValue(firstDayOfMonth);

			var lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
			endDatePicker.setDateValue(lastDayOfMonth);
		},

		/**
		 * GET para pegar as Consultar Dispóniveis
		 */
		loadQueryTypes: function () {



			$.ajax({
				url: Config.apiUrl + Config.endpoints.consulta;,
				method: "GET",
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
				success: function (oResponse) {
					var aQueryTipo = oResponse.dados.querytipo;
					this.getView()
						.getModel("viewModel")
						.setProperty("/queryTipo", aQueryTipo);
					console.log(
						"Dados dos queryTipo carregados com sucesso:",
						aQueryTipo
					);
				}.bind(this),
				error: function () {
					console.error("Erro ao carregar os queryTipo do backend");
				},
			});
		},

		attachTableRowSelection: function () {
			var oTable = this.byId("table");
			oTable.attachRowSelectionChange(function (oEvent) {
				var oTableModel = oTable.getModel("tableModel");
				var aSelectedIndices = oEvent.getParameter("rowIndices");
				var oSelectedRowsData = [];

				aSelectedIndices.forEach(function (iIndex) {
					var oRowData = oTableModel.getProperty("/rows/" + iIndex);
					oSelectedRowsData.push(oRowData);
				});

				this.callYourAPI(oSelectedRowsData);
			}, this);
		},

		/**
		 * Realiza uma pesquisa com base nos parâmetros fornecidos e exibe os resultados em uma tabela.
		 *
		 * @param {object} payload - Os parâmetros da pesquisa, como pageNumber e pageSize.
		 */
		onSearch: function (payload) {
			var pageNumber = this.pageNumber;
			var pageSize = this.pageSize;

			// Verificar se payload foi fornecido e substituir valores padrão, se necessário
			if (payload) {
				pageNumber = payload.pageNumber || pageNumber;
				pageSize = payload.pageSize || pageSize;
			}

			// Verificar se pageNumber é um número válido
			if (isNaN(pageNumber) || pageNumber < 1) {
				console.error("pageNumber inválido:", pageNumber);
				return;
			}

			// Converter pageNumber para inteiro
			pageNumber = parseInt(pageNumber, 10);

			// Verificar se pageSize é um número válido
			if (isNaN(pageSize) || pageSize < 1) {
				console.error("pageSize inválido:", pageSize);
				return;
			}

			// Obter data de início e fim da seleção do usuário
			var oStartDate = this.getView().byId("startDatePicker").getDateValue();
			var oEndDate = this.getView().byId("endDatePicker").getDateValue();

			// Obter o tipo de consulta selecionado pelo usuário
			var sSelectedQueryText = this.getView().byId("selectTipoConsulta").getSelectedItem().getKey();

			// Construir o objeto de consulta com os parâmetros selecionados
			var oConsulta = {
				startDate: oStartDate.toISOString(),
				endDate: oEndDate.toISOString(),
				selectedTipo: sSelectedQueryText,
			};

			// Exibir um indicador de carregamento
			BusyIndicator.show();


			// Construir a URL com os parâmetros pageNumber e pageSize
			var sUrl = Config.apiUrl + Config.endpoints.consultaWithPageNumber + pageNumber + "&pageSize=" + pageSize;

			$.ajax({
				url: sUrl,
				type: "POST",
				headers: {
					"Authorization": "Bearer " + localStorage.getItem('token') // Adiciona o token ao cabeçalho de autorização
				},
				contentType: "application/json",
				data: JSON.stringify(oConsulta),
				async: true,
				success: function (oData) {
					// Sucesso na chamada da API, processar os resultados
					this.processSearchResults(oData);
					BusyIndicator.hide();
				}.bind(this),
				error: function (jqXHR, textStatus, errorThrown) {
					// Erro ao chamar a API, exibir mensagem de erro
					console.error("Error during API call:", jqXHR.responseText);
					MessageBox.error(jqXHR.responseText);

					BusyIndicator.hide();
					// this.handleSearchError(jqXHR, textStatus, errorThrown);
				}.bind(this)
			});
		},

		/**
		 * Processa os resultados da pesquisa e exibe-os em uma tabela.
		 * @param {object} oData - Os dados retornados pela API.
		 */
		processSearchResults: function (oData) {
			BusyIndicator.hide();

			if (oData && oData.dados && oData.dados.queryResults) {
				var aQueryResults = JSON.parse(oData.dados.queryResults);
				var aColumns = Object.keys(aQueryResults[0]);

				if (aQueryResults.length > 0) {
					var aPageResults = aQueryResults;
					this.createTableWithColumns(aPageResults, aColumns);
				} else {
					MessageBox.information("A consulta retornou zero resultados.");
				}
			} else {
				console.error("Erro: nenhum dado de consulta encontrado na resposta.");
				MessageBox.error("Ocorreu um erro ao obter os resultados da consulta.");
			}
		},

		/**
		 * Cria uma tabela com colunas dinâmicas e exibe os resultados da consulta.
		 * @param {array} aQueryResults - Os resultados da consulta.
		 * @param {array} aColumns - As colunas da tabela.
		 */
		createTableWithColumns: function (aQueryResults, aColumns) {
			var aTableColumns = aColumns.map(function (sColumn) {
				var enabledColumn = (sColumn === "FIELD_KEY" || sColumn === "TABLE_ID" || sColumn === "UPDATE_FIELD");

				return new sap.ui.table.Column({
					label: new sap.m.HBox({
						items: [
							new sap.m.Text({ text: sColumn }),
							new sap.ui.core.Icon({
								src: "sap-icon://search",
								size: "0.75rem",  // Ajustar o tamanho do ícone para um valor menor
								// Aumentar a margem e ajustar a opacidade
								press: function (oEvent) {
									console.log(`Search icon clicked for column: ${sColumn}`);
									var oSearchField = new sap.m.SearchField({
										placeholder: "Pesquisar...",
										search: function (oEvent) {
											var sQuery = oEvent.getParameter("query");
											console.log(`Search initiated with query: ${sQuery} for column: ${sColumn}`);
											this.callApiFilter(sQuery, sColumn);
										}.bind(this)
									});

									// Create a popover to display the search field
									var oPopover = new sap.m.Popover({
										title: "filtrar por " + sColumn,
										content: [oSearchField]
									});

									// Open the popover next to the search icon
									oPopover.openBy(oEvent.getSource());
								}.bind(this)  // Bind this to ensure the correct context
							}).setVisible(!enabledColumn)
						]
					}),
					template: new sap.m.Text({ text: "{" + sColumn + "}" }),
					visible: !enabledColumn
				});
			}.bind(this));

			// Definir modelo de dados
			var oTableModel = new sap.ui.model.json.JSONModel();
			oTableModel.setData({
				rows: aQueryResults
			});
			this.getView().setModel(oTableModel, "tableModel");

			// Criar a tabela se ela não existir
			var oTable = this.getView().byId("table");
			if (!oTable) {
				oTable = new sap.ui.table.Table("table", {
					visibleRowCount: 10,
					selectionMode: "None"
				});
				this.getView().byId("content").addItem(oTable);
			}

			// Definir colunas da tabela
			oTable.removeAllColumns();
			aTableColumns.forEach(function (oColumn) {
				oTable.addColumn(oColumn);
			});

			// Vincular linhas à tabela
			oTable.setModel(oTableModel);
			oTable.bindRows("/rows");
		},

		// Função para chamar a API
		callApiFilter: function (sQuery, sColumn) {
			var sSelectedQueryText = this.getView().byId("selectTipoConsulta").getSelectedItem().getKey();

			var sUrl = Config.apiUrl + Config.endpoints.pesquisa;
			var oParams = {
				tipo: sSelectedQueryText,
				queries: [
					{
						coluna: sColumn,
						query: sQuery
					}
				]
			};

			jQuery.ajax({
				url: sUrl,
				method: "POST",
				contentType: "application/json",
				data: JSON.stringify(oParams),
				success: function (oData) {
					this.processSearchResults2(oData);
				}.bind(this),
				error: function (oError) {
					// Manipule os erros da chamada da API aqui
					console.error("API call error:", oError);
				}
			});
		},

		processSearchResults2: function (oData) {
			BusyIndicator.hide();

			if (oData && oData.dados && oData.dados.queryResults) {
				var aQueryResults = JSON.parse(oData.dados.queryResults);
				var aColumns = Object.keys(aQueryResults[0]);

				if (aQueryResults.length > 0) {
					var aPageResults = aQueryResults;
					this.createTableWithColumns(aPageResults, aColumns);
				} else {
					MessageBox.information("A consulta retornou zero resultados.");
				}
			} else {
				console.error("Erro: nenhum dado de consulta encontrado na resposta.");
				MessageBox.error("Ocorreu um erro ao obter os resultados da consulta.");
			}
		},

		/**
		 *  Tratamento de Erro do Método onSearch
		 * 
		 */
		handleSearchError: function (error) {
			// Obtain the error code and message
			var errorCode = error.status;
			var errorMessage = error.statusText;

			// Display an appropriate error message to the user
			switch (errorCode) {
				case 400: // Bad Request
					MessageBox.error(
						"A requisição não foi compreendida. Verifique os parâmetros da consulta."
					);
					break;
				case 401: // Unauthorized
					MessageBox.error("Erro de autenticação. Verifique suas credenciais.");
					break;
				case 403: // Forbidden
					MessageBox.error("Acesso negado. Você não possui permissão para realizar esta consulta.");
					break;
				case 404: // Not Found
					MessageBox.error("Recurso não encontrado. Tente novamente mais tarde.");
					break;
				case 422: // Unprocessable Entity
					MessageBox.error(
						"Dados da consulta inválidos. Verifique os valores informados."
					);
					break;
				case 500: // Internal Server Error
					MessageBox.error("Erro interno do servidor. Contate o suporte técnico.");
					break;
				case 0: // Network Error (could be due to CORS or other network issues)
					MessageBox.error(
						"Erro de rede. Verifique sua conexão com a internet e tente novamente."
					);
					break;
				default:
					MessageBox.error(
						"Ocorreu um erro inesperado. Tente novamente mais tarde. (Erro: " +
						errorCode +
						")"
					);
			}
			// Log the error for debugging purposes
			console.error("Erro na requisição da API:", error);

			// Hide the busy indicator
			BusyIndicator.hide();
		},

		/**
		 * Personalização Filtros do Usuário
		 * @returns
		 */
		onOpenPersonalizationDialog: function () {
			var oTable = this.getView().byId("table");
			var oP13nPopup = this.getView().byId("p13nPopup");
			var oColumnsPanel = this.getView().byId("columnsPanel");

			if (!oTable) {
				MessageBox.error("Não foi possível encontrar a tabela.");
				return;
			}

			if (!oP13nPopup) {
				sap.m.MessageBox.error(
					"Não foi possível encontrar o popup de personalização."
				);
				return;
			}

			if (!oColumnsPanel) {
				sap.m.MessageBox.error(
					"Não foi possível encontrar o panel de colunas."
				);
				return;
			}

			var aColumnData = []; // Define a variável aColumnData

			// Obtém as colunas da tabela
			var aTableColumns = oTable.getColumns();

			// Adiciona as colunas ao panel de colunas, excluindo as colunas indesejadas
			aColumnData = aTableColumns.reduce(function (result, oColumn) {
				var sColumnName = "";
				var oLabel = oColumn.getLabel();
				if (oLabel && typeof oLabel.getText === 'function') {
					sColumnName = oLabel.getText();
				} else {
					sColumnName = oColumn.getHeader() || oColumn.getId();
				}

				// Verifica se a coluna deve ser adicionada com base nas condições fornecidas
				if (
					sColumnName !== "FIELD_KEY" &&
					sColumnName !== "TABLE_ID" &&
					sColumnName !== "UPDATE_FIELD"
				) {
					result.push({
						label: sColumnName,
						visible: oColumn.getVisible(),
					});
				}

				return result;
			}, []);

			oColumnsPanel.setP13nData(aColumnData);

			oColumnsPanel.attachChange(this.parseP13nState, this); // Vincula a função parseP13nState ao evento de mudança do columnsPanel

			oP13nPopup.open();
		},

		/**
		 * Chama a API de reprocessamento com os dados da linha selecionada.
		 *
		 * @param {array} oSelectedRowsData - Os dados da linha selecionada.
		 */
		callYourAPI: function (oSelectedRowsData) {
			// Verificar se oSelectedRowsData é um array e possui pelo menos um elemento
			if (Array.isArray(oSelectedRowsData) && oSelectedRowsData.length > 0) {
				// Extrair o primeiro objeto dentro do array
				var rowData = oSelectedRowsData[0];

				if (
					rowData["STATUS_FATURAMENTO"] &&
					rowData["STATUS_FATURAMENTO"] === "Sucesso no Faturamento"
				) {
					MessageBox.error(
						"Esta linha já foi faturada com sucesso e nao pode ser reprocessada"
					);
					this.deselectRows(oSelectedRowsData);
					return;
				}

				// Extrair os dados relevantes do objeto
				var reprocData = {
					TableID: rowData["TABLE_ID"],
					UpdateField: rowData["UPDATE_FIELD"],
					FieldKey: String(rowData["FIELD_KEY"]),
					ValueKey: String(rowData["#"]),
				};

				var sUrl = Config.apiUrl + Config.endpoints.reproc;
				try {
					$.ajax({
						url: sUrl,
						type: "POST",
						headers: {
							Authorization: "Bearer " + localStorage.getItem("token"), // Adiciona o token ao cabeçalho de autorização
						},
						contentType: "application/json",
						data: JSON.stringify(reprocData),
						async: true,
						success: function (oData) {
							if (oData && oData.sucesso) {
								MessageBox.success(
									"Operação concluída com sucesso",
									oData.mensagem
								);
								this.deselectRows(oSelectedRowsData);
							} else {
								MessageBox.error("Erro", oData.mensagem);
							}
						}.bind(this),
						error: function (jqXHR, textStatus, errorThrown) {
							this.handleSearchError(jqXHR, textStatus, errorThrown);

							this.deselectRows(oSelectedRowsData);
						}.bind(this),
					});
				} catch (error) {
					console.error("Ocorreu um erro ao chamar a API:", error);
				}
			} else {
				console.error(
					"Nenhuma linha selecionada ou estrutura de dados inválida."
				);
			}
		},


		/**
		 * Desabiitar checkbox ao Selecionar
		 * @param {} oSelectedRowsData
		 */
		deselectRows: function (oSelectedRowsData) {
			var oTable = this.getView().byId("table"); // Obtém a referência para a tabela
			var oModel = oTable.getModel(); // Obtém o modelo de dados associado à tabela
			var aRows = oTable.getRows(); // Obtém todas as linhas da tabela

			// Itera sobre as linhas da tabela
			aRows.forEach(function (oRow) {
				// Obtém o contexto da linha no modelo de dados
				var oContext = oRow.getBindingContext();

				// Verifica se a linha está selecionada
				if (
					oContext &&
					oSelectedRowsData.some(function (rowData) {
						return rowData.ID === oContext.getProperty("ID");
					})
				) {
					// Desmarca a linha no modelo de dados
					oModel.setProperty(oContext.getPath() + "/isSelected", false);

					// Remove a seleção visual da linha
					oTable.removeSelectionInterval(oRow.getIndex(), oRow.getIndex());
				}
			});
		},

		/**
		 * Função para paginação <>
		 */
		attachPaginationButtons: function () {
			this.byId("prevPageButton").attachPress(this.onPrevPage.bind(this));
			this.byId("nextPageButton").attachPress(this.onNextPage.bind(this));
		},

		onPrevPage: function () {
			// Diminuir o número da página se não estiver na primeira página
			if (this.pageNumber > 1) {
				this.pageNumber--;
			} else {
				return; // Não faça nada se já estiver na primeira página
			}
			this.onSearch();
		},

		onNextPage: function () {
			// Aumentar o número da página
			this.pageNumber++;
			this.onSearch();
		},

		/**
		 * Personalização Colunas
		 */
		parseP13nState: function () {
			var oTable = this.getView().byId("table");
			var oColumnsPanel = this.getView().byId("columnsPanel");

			if (!oTable) {
				MessageBox.error("Não foi possível encontrar a tabela.");
				return;
			}

			if (!oColumnsPanel) {
				sap.m.MessageBox.error(
					"Não foi possível encontrar o panel de colunas."
				);
				return;
			}

			var aColumnData = oColumnsPanel.getP13nData() || [];

			// Para cada coluna na tabela
			oTable.getColumns().forEach(function (oColumn) {
				var sColumnName = oColumn.getLabel().getText();

				// Encontra o objeto correspondente nos dados de personalização
				var oMatchingColumn = aColumnData.find(function (column) {
					return column.label === sColumnName;
				});

				// Se encontrar um objeto correspondente
				if (oMatchingColumn) {
					oColumn.setVisible(oMatchingColumn.visible); // Atualiza a visibilidade da coluna
				}
			});
		},

		/**
		 * Função para importar Dados XLSX
		 * @returns
		 */
		exportToExcel: function () {
			var oTable = this.getView().byId("table");

			// Verificar se a tabela existe
			if (!oTable) {
				MessageToast.show("A tabela não existe.");
				return;
			}

			var aCols = [],
				aProducts = [],
				oSettings,
				oSheet;

			// Obter colunas da tabela
			oTable.getColumns().forEach(function (oColumn) {
				if (oColumn.getVisible()) {
					aCols.push({
						label: oColumn.getLabel().getText(),
						property: oColumn.getTemplate().getBindingInfo("text").parts[0]
							.path,
					});
				}
			});

			// Obter dados da tabela
			oTable
				.getModel("tableModel")
				.getData()
				.rows.forEach(function (oRow) {
					var oProduct = {};
					aCols.forEach(function (oColumn) {
						oProduct[oColumn.label] = oRow[oColumn.property];
					});
					aProducts.push(oProduct);
				});

			console.log("produtos", aProducts);

			// Configurações para exportar para Excel
			oSettings = {
				workbook: { columns: aCols },
				dataSource: aProducts,
				filename: "Portalb1Soft.xlsx",
				worker: false,
			};

			// Criar a planilha e exportar os dados
			oSheet = new Spreadsheet(oSettings);
			oSheet
				.build()
				.then(function () {
					MessageToast.show("Exportação para planilha concluída.");
				})
				.finally(function () {
					oSheet.destroy();
				});
		},
	});
}
);
