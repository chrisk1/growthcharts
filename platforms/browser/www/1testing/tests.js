QUnit.module( "Babyage() Object" );
QUnit.test("Babyage: date comparisons", function( assert ) {
	var baby = new Baby("40+1", "m", "23/08/2014"); var babyage = new Babyage(baby, "23/08/2014");
	assert.equal(babyage.exactAgeHuman(), "0 days", "Correctly gives 0 days");

	var baby = new Baby("40+1", "m", "23/07/2014"); var babyage = new Babyage(baby, "23/08/2014");
	assert.equal(babyage.exactAgeHuman(), "1 month", "Correctly gives 1 month");

	var baby = new Baby("40+1", "m", "23/07/2014"); var babyage = new Babyage(baby, "23/08/2013");
	assert.equal(babyage.exactAgeHuman(), "Please check dates (negative age!)", "Identifies a negative baby age");

	var baby = new Baby("40+1", "m", "23/08/2014"); var babyage = new Babyage(baby, "26/10/2014");
	assert.equal(babyage.exactAgeHuman(), "2 months 3 days", "Identifies a complex age - 2 months 3 days");

	var baby = new Baby("40+1", "m", "23/08/2014"); var babyage = new Babyage(baby, "26/10/2016");
	assert.equal(babyage.exactAgeHuman(), "2 years 2 months 3 days", "Identifies a more complex age - 2 years 2 months 3 days");
});

QUnit.test("Babyage: gestational age", function( assert ) {
	var baby = new Baby("40+1", "m", "23/08/2014"); var babyage = new Babyage(baby, "23/08/2014");
	assert.equal(babyage.ga(), "40+1", "Same day - gestation doesn't change");

	var baby = new Baby("40+1", "m", "23/08/2014"); var babyage = new Babyage(baby, "24/08/2014");
	assert.equal(babyage.ga(), "40+2", "One day later works");

	var baby = new Baby("40+1", "m", "23/08/2014"); var babyage = new Babyage(baby, "29/08/2014");
	assert.equal(babyage.ga(), "41+0", "6 days later - week adds one, back to 41+0");
});

QUnit.test("Babyage: corrected gestational age", function( assert ) {
	var baby = new Baby("40+1", "m", "23/08/2014"); var babyage = new Babyage(baby, "23/08/2014");
	assert.equal(babyage.cga(), "0 days", "Term: Same day - corrected gestation doesn't change");

	var baby = new Baby("40+1", "m", "23/08/2014"); var babyage = new Babyage(baby, "24/08/2014");
	assert.equal(babyage.cga(), "1 day", "Term: One day later works, plurals correct");

	var baby = new Baby("34+0", "m", "23/08/2014"); var babyage = new Babyage(baby, "24/08/2014");
	assert.equal(babyage.cga(), "Baby has not yet reached term.", "Preterm: One day later - should spot that CGA not appropriate yet");

	var baby = new Baby("36+0", "m", "01/08/2014"); var babyage = new Babyage(baby, "31/08/2014");
	assert.equal(babyage.cga(), "2 days", "36 wk preterm: 28 days early, 30 days post birth = 2 days");

	var baby = new Baby("40+0", "m", "01/08/2014"); var babyage = new Babyage(baby, "31/08/2014");
	assert.equal(babyage.cga(), "30 days", "40 wk term: 30 days post birth = 30 days");

	var baby = new Baby("37+0", "m", "01/08/2014"); var babyage = new Babyage(baby, "31/08/2014");
	assert.equal(babyage.cga(), "30 days", "40 wk term: 30 days post birth = 30 days");

	var baby = new Baby("40+0", "m", "01/08/2014"); var babyage = new Babyage(baby, "31/08/2015");
	assert.equal(babyage.cga(), "1 year 30 days", "40 wk term: 1 year 30 days post birth = 1 year 30 days");

	var baby = new Baby("36+0", "m", "01/08/2014"); var babyage = new Babyage(baby, "31/08/2015");
	assert.equal(babyage.cga(), "1 year 2 days", "36 wk term: 1 year 30 days post birth = 1 year 28 days");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("26 week boy", function( assert ) {
	var baby = new Baby("26+0", "m", "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 0.600, 44, 23);
	assert.equal(growthchart.weightcentile, 2.3, "Weight centile");
	assert.equal(growthchart.hccentile, 8.9, "Head circumference centile");
	assert.equal(growthchart.lengthcentile, 99.6, "Length centile");
});

QUnit.test("26 week girl", function( assert ) {
	var baby = new Baby("26+0", "m", "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 0.400, 31.8, 25.25);
	assert.equal(growthchart.weightcentile, 0.1, "Weight centile");
	assert.equal(growthchart.hccentile, 68.1, "Head circumference centile");
	assert.equal(growthchart.lengthcentile, 5.6, "Length centile");
});

QUnit.test("35 week boy", function( assert ) {
	var baby = new Baby("35+0", "m", "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 2.2, 43, 33);
	assert.equal(growthchart.weightcentile, 24.5, "Weight centile");
	assert.equal(growthchart.hccentile, 73.3, "Head circumference centile");
	assert.equal(growthchart.lengthcentile, 9.4, "Length centile");
});

QUnit.test("40 week girl (on override preterm growth chart)", function( assert ) {
	var baby = new Baby("40+1", "f", "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 3.4, 46, 35.5, "preterm");
	assert.equal(growthchart.weightcentile, 48.8, "Weight centile");
	assert.equal(growthchart.hccentile, 90.5, "Head circumference centile");
	assert.equal(growthchart.lengthcentile, 1.5, "Length centile");
});

QUnit.test("6 month girl (on term growth chart)", function( assert ) {
	var baby = new Baby("42+0", "f", "01/08/2014");
	var growthchart = new Growthchart(baby, "01/02/2015", 8.5, 66, 44);
	assert.equal(growthchart.weightcentile, 89.3, "Weight centile");
	assert.equal(growthchart.lengthcentile, 54.7, "Length centile");
	assert.equal(growthchart.hccentile, 91.6, "Head circumference centile");
});

QUnit.test("3 year old boy (on term 1-4 growth chart)", function( assert ) {
	var baby = new Baby("42+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2017");
	var growthchart = new Growthchart(baby, "01/08/2017", 15.6, 92, 44);
	assert.equal(babyage.exactAgeHuman(), "3 years", "Human readable age correct (3 years)");
	assert.equal(growthchart.weightcentile, 75.5, "Weight centile");
	assert.equal(growthchart.lengthcentile, 13.5, "Length centile");
	assert.equal(growthchart.hccentile, "Not measured > 2 years old", "Head circumference centile (not measured message)");
});

QUnit.test("13 year old girl (on term 8-18 growth chart)", function( assert ) {
	var baby = new Baby("42+0", "f", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2027");
	var growthchart = new Growthchart(baby, "01/08/2027", 45, 160, 44);
	assert.equal(babyage.exactAgeHuman(), "13 years", "Human readable age correct (3 years)");
	assert.equal(growthchart.weightcentile, 48.2, "Weight centile");
	assert.equal(growthchart.lengthcentile, 75.2, "Length centile");
	assert.equal(growthchart.hccentile, "Not measured > 2 years old", "Head circumference centile (not measured message)");
});

QUnit.test("13 year old girl (on term 8-18 growth chart)", function( assert ) {
	var baby = new Baby("42+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2031");
	var growthchart = new Growthchart(baby, "01/08/2031", 45, 170, 44);
	assert.equal(babyage.exactAgeHuman(), "17 years", "Human readable age correct (3 years)");
	assert.equal(growthchart.weightcentile, 0.4, "Weight centile");
	assert.equal(growthchart.lengthcentile, 20.6, "Length centile");
	assert.equal(growthchart.hccentile, "Not measured > 2 years old", "Head circumference centile (not measured message)");
});

QUnit.test("13 year old premature girl (on term 8-18 growth chart), should be no correction", function( assert ) {
	var baby = new Baby("24+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2031");
	var growthchart = new Growthchart(baby, "01/08/2031", 45, 170, 44);
	assert.equal(babyage.exactAgeHuman(), "17 years", "Human readable age correct (3 years)");
	assert.equal(growthchart.weightcentile, 0.4, "Weight centile");
	assert.equal(growthchart.lengthcentile, 20.6, "Length centile");
	assert.equal(growthchart.hccentile, "Not measured > 2 years old", "Head circumference centile (not measured message)");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("30 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("30+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 1.43, 40.5, 28.4);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 49.4, "Weight centile");
	assert.equal(growthchart.lengthcentile, 50.5, "Length centile");
	assert.equal(growthchart.hccentile, 48.2, "Head circumference centile (not measured message)");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("31 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("31+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 1.605, 41.578, 29.28);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 51.3, "Weight centile");
	assert.equal(growthchart.lengthcentile, 50.9, "Length centile");
	assert.equal(growthchart.hccentile, 51, "Head circumference centile (not measured message)");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("32 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("32+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 1.7993, 42.72, 30.05);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 51.1, "Weight centile");
	assert.equal(growthchart.lengthcentile, 50.8, "Length centile");
	assert.equal(growthchart.hccentile, 50.9, "Head circumference centile (not measured message)");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("33 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("33+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 2.01, 43.87, 30.78);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 50.2, "Weight centile");
	assert.equal(growthchart.lengthcentile, 50.6, "Length centile");
	assert.equal(growthchart.hccentile, 50.6, "Head circumference centile (not measured message)");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("34 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("34+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 2.25, 45.02, 31.47);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 50.8, "Weight centile");
	assert.equal(growthchart.lengthcentile, 50.4, "Length centile");
	assert.equal(growthchart.hccentile, 50.3, "Head circumference centile (not measured message)");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("35 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("35+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 2.486, 46.14, 32.13);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 50.2, "Weight centile");
	assert.equal(growthchart.lengthcentile, 50.1, "Length centile");
	assert.equal(growthchart.hccentile, 50.2, "Head circumference centile (not measured message)");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("36 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("36+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 2.72, 47.23, 32.75);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 49.4, "Weight centile");
	assert.equal(growthchart.lengthcentile, 49.9, "Length centile");
	assert.equal(growthchart.hccentile, 49.9, "Head circumference centile (not measured message)");
});


QUnit.module( "Growthchart() Object" );
QUnit.test("37 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("37+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 2.96, 48.29, 33.34);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 50.8, "Weight centile");
	assert.equal(growthchart.lengthcentile, 50.4, "Length centile");
	assert.equal(growthchart.hccentile, 50.3, "Head circumference centile (not measured message)");
});


QUnit.module( "Growthchart() Object" );
QUnit.test("38 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("38+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 3.178, 49.28, 33.90);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 50.8, "Weight centile");
	assert.equal(growthchart.lengthcentile, 50.4, "Length centile");
	assert.equal(growthchart.hccentile, 50.3, "Head circumference centile (not measured message)");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("39 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("39+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 3.38, 50.17, 34.41);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 50.8, "Weight centile");
	assert.equal(growthchart.lengthcentile, 50.4, "Length centile");
	assert.equal(growthchart.hccentile, 50.3, "Head circumference centile (not measured message)");
});

QUnit.module( "Growthchart() Object" );
QUnit.test("40 wk baby boy, 50th centile", function( assert ) {
	var baby = new Baby("40+0", "m", "01/08/2014");
	var babyage = new Babyage(baby, "01/08/2014");
	var growthchart = new Growthchart(baby, "01/08/2014", 3.56, 50.94, 34.91);
	assert.equal(babyage.exactAgeHuman(), "0 days", "Human readable age correct (0 days)");
	assert.equal(growthchart.weightcentile, 50.4, "Weight centile");
	assert.equal(growthchart.lengthcentile, 49.9, "Length centile");
	assert.equal(growthchart.hccentile, 50, "Head circumference centile (not measured message)");
});