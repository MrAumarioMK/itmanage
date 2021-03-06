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

	qunit.module("Direction RTL");
	asyncTest("inputmask(\"999.999.999\") - delete 2nd with backspace, continue the mask", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" dir="rtl" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").SendKey("1");
			$("#testmask").SendKey("2");
			$("#testmask").SendKey("3");
			$("#testmask").SendKey(Inputmask.keyCode.RIGHT);
			$("#testmask").SendKey(Inputmask.keyCode.RIGHT);
			$("#testmask").SendKey(Inputmask.keyCode.RIGHT);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			$("#testmask").SendKey("4");
			$("#testmask").SendKey(Inputmask.keyCode.LEFT);
			$("#testmask").SendKey("5");
			$("#testmask").SendKey("6");
			start();
			equal(testmask.value, "___._65.341", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask(\"999.999.999\") - delete 2nd with delete, continue the mask", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" dir="rtl" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999.999.999").mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").SendKey("1");
			$("#testmask").SendKey("2");
			$("#testmask").SendKey("3");
			$("#testmask").SendKey(Inputmask.keyCode.RIGHT);
			$("#testmask").SendKey(Inputmask.keyCode.RIGHT);
			$("#testmask").SendKey(Inputmask.keyCode.DELETE);
			$("#testmask").SendKey("4");
			$("#testmask").SendKey(Inputmask.keyCode.LEFT);
			$("#testmask").SendKey("5");
			$("#testmask").SendKey("6");
			start();
			equal(testmask.value, "___._65.341", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask(\"999-aaa-999\")", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" dir="rtl" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999-aaa-999").mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("123abc12");
			start();
			equal(testmask.value, "_21-cba-321", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask(\"999-999-999\") - replace selection", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" dir="rtl" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999-999-999").mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("123456789");
			$.caret(testmask, 4, 7);
			$("#testmask").Type("5");
			start();
			equal(testmask.value, "__9-875-321", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask(\"999-999-999\") - replace selection with backspace", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" dir="rtl" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999-999-999").mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("123456789");
			$.caret(testmask, 4, 7);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			$("#testmask").Type("5");
			start();
			equal(testmask.value, "__9-875-321", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask(\"999-999-999\") - replace selection - with delete", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" dir="rtl" />');
		var testmask = document.getElementById("testmask");
		Inputmask("999-999-999").mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("123456789");
			$.caret(testmask, 4, 7);
			$("#testmask").SendKey(Inputmask.keyCode.DELETE);
			$("#testmask").Type("5");
			start();
			equal(testmask.value, "__9-875-321", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	qunit.module("Numeric Input");
	asyncTest("inputmask({ mask: \"9\", numericInput: true, repeat: 10, greedy: true }); - 1234567890", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "9",
			numericInput: true,
			repeat: 10,
			greedy: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("1234567890");
			start();
			equal(testmask.value, "1234567890", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});
	asyncTest("inputmask({ mask: \"9\", numericInput: true, repeat: 10, greedy: true }); - replace selection", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "9",
			numericInput: true,
			repeat: 10,
			greedy: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("1234567890");
			$.caret(testmask, 3, 6);
			$("#testmask").Type("5");
			start();
			equal(testmask.value, "__12357890", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask({ mask: \"99-99-99\", numericInput: true }); - 1234567890", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask({
			mask: "99-99-99",
			numericInput: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("1234567890");
			start();
			equal(testmask.value, "12-34-56", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask({ mask: \"??? 999.999.999,99\", numericInput: true }); - 123", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('??? 999.999.999,99', {
			numericInput: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("123");
			start();
			equal(testmask.value, "??? ___.___.__1,23", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask({ mask: \"??? 999.999.999,99\", numericInput: true }); - 123 position before 456", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('??? 999.999.999,99', {
			numericInput: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("123");
			$.caret(testmask, 12);
			$("#testmask").Type("456");
			start();
			equal(testmask.value, "??? ___.__4.561,23", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask({ mask: \"??? 999.999.999,99\", { numericInput: true, radixPoint: \",\" }); - 123", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('??? 999.999.999,99', {
			numericInput: true,
			radixPoint: ","
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");;
		setTimeout(function() {
			$("#testmask").Type("123");

			equal(testmask.value, "??? ___.___.__1,23", "Result " + testmask.value);
			start();
			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask({ mask: \"??? 999.999.999,99\", { numericInput: true, radixPoint: \",\" }); - 123,45", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('??? 999.999.999,99', {
			numericInput: true,
			radixPoint: ","
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");;
		setTimeout(function() {
			$("#testmask").Type("123,45");

			equal(testmask.value, "??? ___.___.123,45", "Result " + testmask.value);
			start();
			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask({ mask: \"9999 t\", { numericInput: true }); - 123 - Joe Rosa", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('9999 t', {
			numericInput: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");;
		setTimeout(function() {
			$("#testmask").Type("123");
			start();
			equal(testmask.value, "_123 t", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask({ mask: \"9999 t\", { numericInput: true, autoUnmask: true }); - 70  - Joe Rosa", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask('9999 t', {
			numericInput: true,
			autoUnmask: true
		}).mask(testmask);

		testmask.focus();
		$("#testmask").trigger("click");;
		setTimeout(function() {
			$("#testmask").Type("70");
			start();
			equal(testmask.value, "70", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

	asyncTest("inputmask({ mask: \"['$9.99', '$99.99', '$999.99', '$9,999.99', '$99,999.99', '$999,999.99', '$9,999,999.99', '$99,999,999.99', '$999,999,999.99'], 'placeholder': ' ', 'numericInput': true, 'rightAlignNumerics': false\" value=\"$100000.00\"", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append("<input type=\"text\" id=\"testmask\" data-inputmask=\"'mask': ['$9.99', '$99.99', '$999.99', '$9,999.99', '$99,999.99', '$999,999.99', '$9,999,999.99', '$99,999,999.99', '$999,999,999.99'], 'placeholder': ' ', 'numericInput': true, 'rightAlignNumerics': false\" value=\"$100000.00\"/>");
		var testmask = document.getElementById("testmask");
		Inputmask().mask(testmask);
		setTimeout(function() {
			equal(testmask.value, "$100,000.00", "Result " + testmask.value);
			start();
			$("#testmask").remove();
		}, 0);
	});

	asyncTest("cuurency - numericInput: true - 123456 backspace x4", function() {
		var $fixture = $("#qunit-fixture");
		$fixture.append('<input type="text" id="testmask" />');
		var testmask = document.getElementById("testmask");
		Inputmask("currency", {
			numericInput: true
		}).mask(testmask);

		testmask.focus();
		setTimeout(function() {
			$("#testmask").Type("123456");
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);
			$("#testmask").SendKey(Inputmask.keyCode.BACKSPACE);

			start();
			equal(testmask.value, "$ 0.12", "Result " + testmask.value);

			$("#testmask").remove();
		}, 0);
	});

});
