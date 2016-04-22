var page = require('webpage').create();
var url = 'http://localhost:1337';

page.viewportSize = { width: 1920, height: 1080 };

page.onConsoleMessage = function(message) {
  console.log(message);
}

page.open(url, function start(status) {
  page.includeJs(
    'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js',
    function() {
      page.evaluate(function() {
        setTimeout(function() {
          $('a')[0].click();
        }, 2000);
        setTimeout(function() {
          $('a')[1].click();
        }, 4500);
        setTimeout(function() {
          angular.element(document.body).scope().$apply(
            function() {
              vm.task = 'PhantomJS Task';
              vm.date = vm.today;
            }
          );
          $("button:contains('Add')").click()
        }, 6500);
        setTimeout(function() {
          $("button:contains('PhantomJS Task')").click();
        }, 8000);
        setTimeout(function() {
          $("button:contains('Clear Completed')").click()
        }, 9500);
      })
    }
  )
})

setTimeout(function() {
  page.render('../testing/phantom/01.landing.jpg', { format: 'jpg', quality: '100' });
}, 1500);

setTimeout(function() {
  page.render('../testing/phantom/02.profile.jpg', { format: 'jpg', quality: '100' });
}, 4000);

setTimeout(function() {
  page.render('../testing/phantom/03.todo.jpg', { format: 'jpg', quality: '100' });
}, 6000);

setTimeout(function() {
  page.render('../testing/phantom/04.added.jpg', { format: 'jpg', quality: '100' });
}, 7500);

setTimeout(function() {
  page.render('../testing/phantom/05.completed.jpg', { format: 'jpg', quality: '100' });
}, 9000);

setTimeout(function() {
  page.render('../testing/phantom/06.cleared.jpg', { format: 'jpg', quality: '100' });
  phantom.exit();
}, 10500);
