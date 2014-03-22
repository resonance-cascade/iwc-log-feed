
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'IndieWebCamp IRC Atom Feed' });
};


/*
 * GET Atom Feed
 */

exports.atom = function(req, res){
  res.contentType('application/atom+xml');
  res.render('atom');
};


/*
 * GET HTML test
 */

exports.htmltest =function(req,res) {
  res.render('htmltest',  { title: 'HTML output test' });
};