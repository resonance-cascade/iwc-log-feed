
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'IndieWebCamp IRC Atom Feed' });
};

exports.atom = function(req, res){
  res.render('atom');
};