sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device"
	], function (JSONModel, Device) {
		"use strict";

		return {

			createDeviceModel : function () {
				var oModel = new JSONModel(Device);
				oModel.setDefaultBindingMode("OneWay");
				return oModel;
			},
			
			createListaModel : function(){
				var oModel = new JSONModel({ "Dati": []
			});
			return oModel;
			},
			
			createDettaglioModel : function(){
				var oModel = new JSONModel({});
				return oModel;      
			},
			
			createFilterModel : function(){
				var oModel = new JSONModel({ "Codcomm": ''});
				return oModel;
			}


		};

	}
);