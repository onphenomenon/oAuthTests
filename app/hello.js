hello.on('auth.login', function(r){
  // Get Profile
  hello.api(r.network+':/me', function(p){
    document.getElementById('login').innerHTML = "<img src='"+ p.thumbnail + "' width=24/>Connected to "+ r.network+" as " + p.name;
  });
});
hello.init({
  'linkedin' : '75nqarm3m6113c',
},{
  scope : ['friends','email'],
  redirect_uri:'http://127.0.0.1:3000/redirect-linkedin',
  oauth_proxy: ""
});
