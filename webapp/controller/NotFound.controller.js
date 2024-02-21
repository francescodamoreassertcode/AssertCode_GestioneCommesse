sap.ui.define([
		"assertcode/CommesseApplication/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("assertcode.CommesseApplication.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);