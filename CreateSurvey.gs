function createPancakeSurvey() {
  var base = 'https://raw.githubusercontent.com/development153/Pancake-Boys/refs/heads/survey-assets/';
  var form = FormApp.create('Pancake Boys Taste & Price Survey');
  form.setDescription("We're Pancake Boys, two guys from Provo making stuffed pancakes for events and pop-ups. Help us figure out our menu and pricing. It takes about 2 minutes and every answer helps!");
  form.setProgressBar(true);
  form.setCollectEmail(false);

  var flavors = [
    ['Strawberry Camp', 'Fresh strawberries and sweet cream, stacked between warm buttermilk cakes.', 'flavor-strawberry-camp.jpg'],
    ['Banana Peak', 'Sliced banana and Nutella, layered on a warm stack.', 'flavor-banana-peak.jpg'],
    ['Cookie Butter Cabin', 'Warm Biscoff cookie butter, spread thick between the cakes.', 'flavor-cookie-butter.jpg'],
    ['Campfire Swirl', 'A cinnamon-sugar swirl cooked right into the pancake on the griddle.', 'flavor-campfire-swirl.jpg']
  ];
  var names = flavors.map(function (f) { return f[0]; });

  form.addSectionHeaderItem().setTitle('Meet the menu').setHelpText('Take a look at our four flavors.');
  flavors.forEach(function (f) {
    var blob = UrlFetchApp.fetch(base + f[2]).getBlob();
    form.addImageItem().setTitle(f[0]).setHelpText(f[1]).setImage(blob).setAlignment(FormApp.Alignment.CENTER).setWidth(500);
  });

  form.addMultipleChoiceItem().setTitle('Which flavor would you order first?')
    .setChoiceValues(names).setRequired(true);

  form.addGridItem().setTitle('Rank all four (1 = your favorite)')
    .setRows(names).setColumns(['1st', '2nd', '3rd', '4th'])
    .setValidation(FormApp.createGridValidation().requireLimitOneResponsePerColumn().build());

  form.addPageBreakItem().setTitle('Pricing').setHelpText('Think about one plate of your favorite flavor at a pop-up or event. Just type a number in dollars.');

  var num = FormApp.createTextValidation().setHelpText('Enter a dollar amount, like 6 or 7.50').requireNumberGreaterThanOrEqualTo(0).build();
  form.addTextItem().setTitle('What would you happily pay for one plate? ($)').setRequired(true).setValidation(num);
  form.addTextItem().setTitle("At what price would it feel too expensive, and you'd pass? ($)").setRequired(true).setValidation(num);
  form.addTextItem().setTitle("At what price would it be so cheap you'd question the quality? ($)").setValidation(num);
  form.addTextItem().setTitle('How much do you think one plate costs us to make? ($)').setRequired(true).setValidation(num);

  form.addPageBreakItem().setTitle('Make it better');
  form.addParagraphTextItem().setTitle('If you could change or add one thing to make these a must-buy, what would it be?').setRequired(true);
  form.addCheckboxItem().setTitle('Where would you most want to get Pancake Boys?')
    .setChoiceValues(['Pop-up on or near campus', 'Catering for my event or party', 'Farmers market', 'Late-night stand', 'Delivery'])
    .showOtherOption(true);
  form.addScaleItem().setTitle('How likely would you be to refer us to a friend for a catering event?')
    .setBounds(0, 10).setLabels('Not likely', 'Extremely likely').setRequired(true);

  form.addPageBreakItem().setTitle('Survey giveaway (optional)');
  form.addTextItem().setTitle('Enter your email to enter our survey giveaway for a full bottle of our favorite buttermilk syrup, made by Flap Jack Drizzle')
    .setHelpText('Check out the syrup: flapjackdrizzle.net')
    .setRequired(false)
    .setValidation(FormApp.createTextValidation().setHelpText('Enter a valid email address').requireTextIsEmail().build());

  form.setConfirmationMessage("Thanks! You just helped two pancake guys a ton. If you entered the giveaway, we'll email the winner. Follow @pancak3boys for pop-up dates.");
  Logger.log('EDIT: ' + form.getEditUrl());
  Logger.log('SHARE: ' + form.getPublishedUrl());
}
