Router.configure({
  layoutTemplate:'layout',
  progressSpinner : false
});

Router.route('/', function(){
  this.render('Home');
  },{
    name:'home'
});

Router.route('/add', function(){
  this.render('addContent');
  },{
    name:'add',
    waitOn: function(){
        return Meteor.subscribe('colls');
  }
});

Router.route('/profile', function(){
  this.render('profile');
  },{
  name:'profile',
  waitOn: function(){
    return Meteor.subscribe('profile');
  },
  data:function(){
    var user = Meteor.user();
    user.email = user.emails[0].address;
    return user;
  }
});


Router.route('/about', function(){
  this.render('about');
  },{
  name:'about'
});


var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      FlashMessages.sendError("Login or Create account");
      this.redirect('/');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {
  except:['home', 'about']
});
