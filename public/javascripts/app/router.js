app.Router = Backbone.Router.extend({
  routes: {
    "activity": "stream",
    "stream": "stream",

    "participate": "stream",
    "explore": "stream",

    "aspects:query": "stream",
    "commented": "stream",
    "liked": "stream",
    "mentions": "stream",
    "people/:id": "stream",
      "u/:name": "stream",
    "followed_tags": "stream",
    "tags/:name": "stream",

    "posts/:id": "singlePost",
    "p/:id": "singlePost"
  },

  stream : function() {
    app.stream = new app.models.Stream()
    app.page = new app.views.Stream({model : app.stream}).render();
    app.publisher = app.publisher || new app.views.Publisher({collection : app.stream.posts});

    var streamFacesView = new app.views.StreamFaces({collection : app.stream.posts}).render();

    $("#main_stream").html(app.page.el);
    $('#selected_aspect_contacts .content').html(streamFacesView.el);
  },

  singlePost : function(id) {
    new app.models.Post({id : id}).fetch({success : function(resp){
      var postAttrs = resp.get("post");

      var page = new app.pages.PostViewer({
        model : new app.models.Post(postAttrs),
        postTemplateName : resp.get("templateName")
      }).render();

      $("#container").html(page.el);
    }})
  }
});

