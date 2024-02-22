/*global location history */
sap.ui.define([
	"assertcode/CommesseApplication/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"assertcode/CommesseApplication/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/m/MessageToast',
	"sap/ui/core/Fragment"
], function(BaseController, JSONModel, Dialog, formatter, Filter, FilterOperator, MessageToast, Fragment) {
	"use strict";

	return BaseController.extend("assertcode.CommesseApplication.controller.Worklist", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit: function() {
				this.getOwnerComponent().getModel().read("/COMMESSESet", {
					/*filters: filters,
					urlParameters: {},*/
					success: function(data) {
						this.getOwnerComponent().getModel("Lista").setProperty("/Dati", data.results);
					}.bind(this),
					error: function(error) {}.bind(this)
				});

			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Triggered by the table's 'updateFinished' event: after new table
			 * data is available, this handler method updates the table counter.
			 * This should only happen if the update was successful, which is
			 * why this handler is attached to 'updateFinished' and not to the
			 * table's list binding's 'dataReceived' method.
			 * @param {sap.ui.base.Event} oEvent the update finished event
			 * @public
			 */
			onUpdateFinished: function(oEvent) {
				// update the worklist's object counter after the table update
				var sTitle,
					oTable = oEvent.getSource(),
					iTotalItems = oEvent.getParameter("total");
				// only update the counter if the length is final and
				// the table is not empty
				if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
					sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
				} else {
					sTitle = this.getResourceBundle().getText("worklistTableTitle");
				}
				this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
			},

			/**
			 * Event handler when a table item gets pressed
			 * @param {sap.ui.base.Event} oEvent the table selectionChange event
			 * @public
			 */
			onPress: function(oEvent) {
				// The source is the list item that got pressed
				this._showObject(oEvent.getSource());
			},

			/**
			 * Event handler for navigating back.
			 * We navigate back in the browser historz
			 * @public
			 */
			onNavBack: function() {
				history.go(-1);
			},

			// method that made work landing page searchbar
			onSearch: function() {

				//VARIABLES DEFINITION
				var filters = [];
				var Codcomm = this.getOwnerComponent().getModel("Filtro").getData().Codcomm;

				//SET FILTER PARAMETERS
				filters.push(new sap.ui.model.Filter("Codcomm", sap.ui.model.FilterOperator.Contains, Codcomm));

				//READING TO LIST FOR LOGGED USER
				this.getOwnerComponent().getModel().read("/COMMESSESet", {
					filters: filters,
					urlParameters: {},
					success: function(data) {

						this.getOwnerComponent().getModel("Lista").setProperty("/Dati", data.results);

					}.bind(this),
					error: function(error) {}.bind(this)
				});

			},

			// method that let user create new row
			onInsertNewRow: function() {

				//this.pDialog ??= this.loadFragment({
				//             name: "assertcode.CommesseApplication.view.fragment.InserimentoDialog"
				//         });
				
				sap.ui.getCore().this = this;
				var oView = this.getView();
				// create dialog lazily
				if (!this.byId("InsertDataDialog")) {
					// load asynchronous XML fragment
					Fragment.load({
						id: oView.getId(),
						name: "assertcode.CommesseApplication.view.fragment.InserimentoDialog",
						controller: this
					}).then(function(oDialog) {
						// connect dialog to the root view 
						//of this component (models, lifecycle)
						oView.addDependent(oDialog);
						oDialog.open();
					});
				} else {
					this.byId("InsertDataDialog").open();
				}
			



			// 	this.pDialog = sap.ui.xmlfragment("assertcode.CommesseApplication.view.fragment.InserimentoDialog", this);

			// this.getView().addDependent(this.pDialog);

			// this.pDialog.open();

		},
		
					closeDialog: function() {
				this.byId("InsertDataDialog").close();
			},



			// method usefull to save new data from creation
			onSaveInsertData: function() {
	
				var that = this;
				var obj = this.getOwnerComponent().getModel("createDataModel").getData();
	
				this.getOwnerComponent().getModel().create("/COMMESSESet", obj, {
					method: "POST",
					success: function(data) {
	
					
						that.getView().byId("InsertDataDialog").close();
						that.getOwnerComponent().getModel("createDataModel").setData({
						
						"Codcomm" : '' ,
						"Descr" : '' ,
						"Tpcomm" : '' ,
						"Dinizio" : new Date(),
						"Dfine" : new Date(),
						"Importotot" : '0.00', 
						"Ratevend" : '0.00' ,
						"Cliente" : '' 
	
						
					});
						
						MessageToast.show('Operazione effettuata correttamente');
						that.onSearch();
	
					}.bind(this),
					error: function(error) {}.bind(this)
				});
	
			},
		
			// method that let you close the form dialog
			onCloseDialog: function(){
				this.getView().byId("InsertDataDialog").close();
			},

			// method that let you delete record
			onDelete: function(){
				
				
				var contentToBeSaved =  this.getView().byId("table").getSelectedItems();
				var that = this;
				
				this.getOwnerComponent().getModel().setUseBatch(false);
				
				for(var i in contentToBeSaved){
					
						
					var obj = contentToBeSaved[i].getBindingContext("Lista").getObject();
					
					this.getOwnerComponent().getModel().remove("/COMMESSESet('" + obj.Codcomm + "')", {
					method: "DELETE",
					success: function(data) {
						
						//that.getView().byId("InsertDataDialog").close();
						MessageToast.show('Operazione effettuata correttamente');
						that.onSearch();
						
						
					}.bind(this),
					error: function(error) {}.bind(this)
				});
				
				
					
					
					
				}
				
				
			},
		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
			onRefresh: function() {
				var oTable = this.byId("table");
				oTable.getBinding("items").refresh();
			},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
			_showObject: function(oItem) {
				this.getRouter().navTo("object", {
					objectId: oItem.getBindingContext('Lista').getObject().Codcomm
				});
			},

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
		 * @private
		 */
		_applySearch: function(aTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(aTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (aTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		}

	});
}
);