var x = require('casper').selectXPath;

casper.test.begin('Check links, add todo and clear todo', 4, function suite(test) {
  casper.start('http://localhost:1337');

  casper.then(function() {
    this.click('a[href^="#/profile"]');
    test.assertUrlMatch('#/profile', 'Link to #/profile working');
  })

  casper.then(function() {
    this.click('a[href^="#/todo"]');
    test.assertUrlMatch('#/todo', 'Link to #/todo working');
  })

  casper.waitForSelector('form#add-todo', function() {
    this.fill('form#add-todo', {
      'new-todo': 'CasperJS'
    }, false);
    this.clickLabel('Add', 'button');
  })

  casper.waitForText('CasperJS', function() {
    test.assertTextExists('CasperJS', 'Successfully added new todo');
  })

  casper.waitForSelector(x('//*[contains(span, "CasperJS")]'), function() {
    this.click(x('//*[contains(span, "CasperJS")]'));
  })

  casper.waitForSelector(x('//*[contains(span, "Items completed: 1")]'), function() {
    this.clickLabel('Clear Completed', 'button');
  })

  casper.waitForSelector(x('//*[contains(span, "Items completed: 0")]'), function() {
    test.assertDoesntExist(x('//*[contains(span, "Items completed: 1")]'), 'Successfully cleared new todo');
  })

  casper.run(function() {
    test.done();
  })
})
