define([
	"qunit",
	"inputmask.dependencyLib",
	"inputmask",
	"../dist/inputmask/inputmask.date.extensions",
	"../dist/inputmask/inputmask.extensions",
	"../dist/inputmask/inputmask.numeric.extensions",
	"../dist/inputmask/inputmask.phone.extensions",
	"../dist/inputmask/inputmask.regex.extensions",
	"prototypeExtensions",
	"simulator"
], function(qunit, $, Inputmask) {
	qunit.module("Value formatting");
	test("Inputmask.format(\"2331973\", { alias: \"date\"})", function() {
		var formattedValue = Inputmask.format("2331973", {
			alias: "date"
		});
		equal(formattedValue, "23/03/1973", "Result " + formattedValue);
	});

	test("Inputmask.format(\"016501030020001DE1015170\", { mask: \"99 999 999 999 9999 \\D\\E*** 9999\"})", function() {
		var formattedValue = Inputmask.format("016501030020001DE1015170", {
			mask: "99 999 999 999 9999 \\D\\E*** 9999"
		});
		equal(formattedValue, "01 650 103 002 0001 DE101 5170", "Result " + formattedValue);
	});

	test("Inputmask.format(\"12\", {  mask: \"$ 999999\", numericInput: true, placeholder: \"0\" }); - gigermocas", function() {
		var formattedValue = Inputmask.format("12", {
			mask: "$ 999999",
			numericInput: true,
			placeholder: "0"
		});
		equal(formattedValue, "$ 000012", "Result " + formattedValue);
	});


	test("Inputmask.format(\"1111111.11\" - ... autoGroup: true - swd120", function() {
		var formattedValue = Inputmask.format("1111111.11", {
			alias: "decimal",
			radixPoint: ".",
			digits: 2,
			autoGroup: true,
			groupSeparator: ",",
			groupSize: 3,
			allowMinus: true
		});
		equal(formattedValue, "1,111,111.11", "Result " + formattedValue);
	});

	test("Inputmask.format(phone, { mask: '(999) 999-9999' })); - krivaten", function() {
		var phone = '5551112222';
		var formattedValue = Inputmask.format(phone, {
			mask: '(999) 999-9999'
		});
		equal(formattedValue, "(555) 111-2222", "Result " + formattedValue);
	});


	qunit.module("Value Validating");
	test("Inputmask.isValid(\"23/03/1973\", { alias: \"date\"})", function() {
		var isValid = Inputmask.isValid("23/03/1973", {
			alias: "date"
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("Inputmask.isValid(\"01 650 103 002 0001 DE101 5170\", { mask: \"99 999 999 999 9999 \\D\\E*** 9999\"})", function() {
		var isValid = Inputmask.isValid("01 650 103 002 0001 DE101 5170", {
			mask: "99 999 999 999 9999 \\D\\E*** 9999"
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("Inputmask.isValid email => false", function() {
		var isValid = Inputmask.isValid("some.body@mail.c", {
			alias: "email"
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("Inputmask.isValid email => true", function() {
		var isValid = Inputmask.isValid("some.body@mail.com", {
			alias: "email"
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("Inputmask.isValid email greedy => false", function() {
		var isValid = Inputmask.isValid("some.body@mail.c", {
			alias: "email",
			greedy: true
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("Inputmask.isValid email greedy => true", function() {
		var isValid = Inputmask.isValid("some.body@mail.com", {
			alias: "email",
			greedy: true
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("YoussefTaghlabi isValid(\"100\", { alias: \"integer\" }", function() {
		var isValid = Inputmask.isValid("100", {
			alias: "integer"
		});
		equal(isValid, true, "Result " + isValid);
	});
	test("YoussefTaghlabi isValid(\"100.00\", { alias: \"integer\" }", function() {
		var isValid = Inputmask.isValid("100.00", {
			alias: "integer"
		});
		equal(isValid, false, "Result " + isValid);
	});
	test("YoussefTaghlabi isValid(\"123\", { alias: \"decimal\" }", function() {
		var isValid = Inputmask.isValid("123", {
			alias: "decimal"
		});
		equal(isValid, true, "Result " + isValid);
	});
	test("YoussefTaghlabi isValid(\"123.45\", { alias: \"decimal\" }", function() {
		var isValid = Inputmask.isValid("123.45", {
			alias: "decimal"
		});
		equal(isValid, true, "Result " + isValid);
	});
	test("YoussefTaghlabi isValid(\"123456.78\", { alias: \"decimal\" }", function() {
		var isValid = Inputmask.isValid("123456.78", {
			alias: "decimal"
		});
		equal(isValid, true, "Result " + isValid);
	});
	test("YoussefTaghlabi isValid(\"123,456.78\", { alias: \"decimal\" }", function() {
		var isValid = Inputmask.isValid("123,456.78", {
			alias: "decimal",
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3
		});
		equal(isValid, true, "Result " + isValid);
	});
	test("YoussefTaghlabi isValid(\"12,\", { alias: \"decimal\" }", function() {
		var isValid = Inputmask.isValid("12,", {
			alias: "decimal",
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3
		});
		equal(isValid, false, "Result " + isValid);
	});
	test("YoussefTaghlabi isValid(\"12,1.45\", { alias: \"decimal\" }", function() {
		var isValid = Inputmask.isValid("12,1.45", {
			alias: "decimal",
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3
		});
		equal(isValid, false, "Result " + isValid);
	});
	test("YoussefTaghlabi isValid(\"12,345.67\", { alias: \"decimal\" }", function() {
		var isValid = Inputmask.isValid("12,345.67", {
			alias: "decimal",
			radixPoint: ".",
			groupSeparator: ",",
			groupSize: 3
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("thomstark isValid(\"12lbs\", {mask:\"99[9]lb\\s\", greedy:false, skipOptionalPartCharacter: \"\", \"clearIncomplete\":true}", function() {
		var isValid = Inputmask.isValid("12lbs", {
			mask: "99[9]lb\\s",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("thomstark isValid(\"1'2\"\", {mask:\"9'9[9]\"\", greedy:false, skipOptionalPartCharacter: \"\", \"clearIncomplete\":true}", function() {
		var isValid = Inputmask.isValid("1'2\"", {
			mask: "9'9[9]\"",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("thomstark isValid(\"12lbs\", {mask:\"99{1,2}lb\\s\", greedy:false, skipOptionalPartCharacter: \"\", \"clearIncomplete\":true}", function() {
		var isValid = Inputmask.isValid("12lbs", {
			mask: "99{1,2}lb\\s",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("thomstark isValid(\"9'9{1,2}\", {mask:\"9'9[9]\"\", greedy:false, skipOptionalPartCharacter: \"\", \"clearIncomplete\":true}", function() {
		var isValid = Inputmask.isValid("1'2\"", {
			mask: "9'9{1,2}\"",
			greedy: false,
			skipOptionalPartCharacter: "",
			"clearIncomplete": true
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("a13x3y isValid(\"some_body@mail.com\", {alias:\"email\"}", function() {
		var isValid = Inputmask.isValid("some_body@mail.com", {
			alias: "email"
		});
		equal(isValid, true, "Result " + isValid);
	});

	test("Inputmask(\"99-99[ 99/99]\").isValid(\"03-11\") - pricejt", function() {
		var isValid = Inputmask("99-99[ 99/99]").isValid("03-11");
		equal(isValid, true, "Result " + isValid);
	});

	qunit.module("Value unmasking");
	test("inputmask.unmask(\"23/03/1973\", { alias: \"dd/mm/yyyy\" })", function() {
		var unmasked = Inputmask.unmask("23/03/1973", {
			alias: "dd/mm/yyyy"
		});
		equal(unmasked, "23031973", "Result " + unmasked);
	});
});
