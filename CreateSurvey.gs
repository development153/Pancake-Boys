function createPancakeSurvey() {
  var base = 'https://raw.githubusercontent.com/development153/Pancake-Boys/survey-assets/';
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

  form.addCheckboxItem().setTitle('Which of these have you actually tasted?')
    .setChoiceValues(names.concat(["None yet, I'm going off the photos"])).setRequired(true);

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
  form.addParagraphTextItem().setTitle('If you could change or add one thing to make these a must-buy, what would it be?');
  form.addCheckboxItem().setTitle('Which of these would make you more likely to buy?')
    .setChoiceValues(['Bigger portion', 'More toppings or drizzle options', 'Lower price', 'A drink combo (cocoa, milk, coffee)', 'Dairy-free or gluten-free option', 'A savory option', 'Rotating seasonal flavors'])
    .showOtherOption(true);
  form.addCheckboxItem().setTitle('Where would you most want to get Pancake Boys?')
    .setChoiceValues(['Pop-up on or near campus', 'Catering for my event or party', 'Farmers market', 'Late-night stand', 'Delivery'])
    .showOtherOption(true);
  form.addScaleItem().setTitle('How likely are you to hire us to cater an event (party, wedding, club, ward activity)?')
    .setBounds(0, 10).setLabels('Not likely', 'Definitely');

  form.addPageBreakItem().setTitle('About you (optional)');
  form.addMultipleChoiceItem().setTitle('How did you hear about Pancake Boys?')
    .setChoiceValues(['Instagram', 'TikTok', 'A friend', 'An event we served', 'Our website']).showOtherOption(true);
  form.addMultipleChoiceItem().setTitle('Age range')
    .setChoiceValues(['Under 18', '18-24', '25-34', '35-44', '45+']);
  form.addTextItem().setTitle('Want to hear about pop-ups and deals? Drop your email.')
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());

  form.setConfirmationMessage("Thanks! You just helped two pancake guys a ton. Follow us for pop-up dates.");
  Logger.log('EDIT: ' + form.getEditUrl());
  Logger.log('SHARE: ' + form.getPublishedUrl());
}
