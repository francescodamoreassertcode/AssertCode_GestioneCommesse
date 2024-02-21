/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"assertcode/CommesseApplication/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"assertcode/CommesseApplication/test/integration/pages/Worklist",
	"assertcode/CommesseApplication/test/integration/pages/Object",
	"assertcode/CommesseApplication/test/integration/pages/NotFound",
	"assertcode/CommesseApplication/test/integration/pages/Browser",
	"assertcode/CommesseApplication/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "assertcode.CommesseApplication.view."
	});

	sap.ui.require([
		"assertcode/CommesseApplication/test/integration/WorklistJourney",
		"assertcode/CommesseApplication/test/integration/ObjectJourney",
		"assertcode/CommesseApplication/test/integration/NavigationJourney",
		"assertcode/CommesseApplication/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});