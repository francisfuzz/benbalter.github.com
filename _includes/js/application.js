// Generated by CoffeeScript 1.4.0
(function() {
  var router,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Application = {
    Models: {},
    Collections: {},
    Views: {},
    router: {},
    url: '{{ site.url }}',
    name: '{{ site.name }}',
    disqus: {
      name: '{{ site.disqus.shortname }}',
      api_key: '{{ site.disqus.api_key }}',
      count: '{{ site.disqus.count }}'
    },
    twitter: {
      count: '{{ site.twitter.count }}',
      username: '{{ site.twitter.username }}'
    }
  };

  Application.Models.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.url = function() {
      return Application.url + "/" + this.id + '.json';
    };

    Post.prototype.defaults = {
      author: "Benjamin J. Balter",
      title: "",
      url: "",
      content: "",
      tags: [],
      category: "",
      date: ""
    };

    return Post;

  })(Backbone.Model);

  Application.Models.Page = (function(_super) {

    __extends(Page, _super);

    function Page() {
      return Page.__super__.constructor.apply(this, arguments);
    }

    Page.prototype.url = function() {
      return Application.url + "/" + this.id + '.json';
    };

    return Page;

  })(Backbone.Model);

  Application.Models.Thread = (function(_super) {

    __extends(Thread, _super);

    function Thread() {
      return Thread.__super__.constructor.apply(this, arguments);
    }

    Thread.prototype.url = function() {
      var url;
      url = 'https://disqus.com/api/3.0/threads/details.json?';
      url += 'thread=' + this.id;
      url += '&api_key=' + Application.disqus.api_key;
      url += '&callback=?';
      return url;
    };

    Thread.prototype.parse = function(data) {
      return data.response;
    };

    return Thread;

  })(Backbone.Model);

  Application.Models.Comment = (function(_super) {

    __extends(Comment, _super);

    function Comment() {
      return Comment.__super__.constructor.apply(this, arguments);
    }

    Comment.prototype.initialize = function() {
      var _this = this;
      this.set('thread', new Application.Models.Thread({
        id: this.get('thread')
      }));
      return this.get('thread').fetch({
        success: function() {
          return _this.collection.trigger('change');
        }
      });
    };

    return Comment;

  })(Backbone.Model);

  Application.Models.Tweet = (function(_super) {

    __extends(Tweet, _super);

    function Tweet() {
      return Tweet.__super__.constructor.apply(this, arguments);
    }

    return Tweet;

  })(Backbone.Model);

  Application.Collections.Comments = (function(_super) {

    __extends(Comments, _super);

    function Comments() {
      return Comments.__super__.constructor.apply(this, arguments);
    }

    Comments.prototype.model = Application.Models.Comment;

    Comments.prototype.url = function() {
      var url;
      url = 'https://disqus.com/api/3.0/posts/list.json?';
      url += 'forum=' + Application.disqus.name;
      url += '&limit=' + Application.disqus.count;
      url += '&api_key=' + Application.disqus.api_key;
      url += '&callback=?';
      return url;
    };

    Comments.prototype.parse = function(data) {
      return data.response;
    };

    return Comments;

  })(Backbone.Collection);

  Application.Collections.Tweets = (function(_super) {

    __extends(Tweets, _super);

    function Tweets() {
      return Tweets.__super__.constructor.apply(this, arguments);
    }

    Tweets.prototype.model = Application.Models.Tweet;

    Tweets.prototype.url = function() {
      var url;
      url = "https://api.twitter.com/1/statuses/user_timeline.json?include_rts=true";
      url += "&screen_name=" + Application.twitter.username;
      url += "&count=" + Application.twitter.count;
      url += "&callback=?";
      return url;
    };

    return Tweets;

  })(Backbone.Collection);

  Application.Collections.Posts = (function(_super) {

    __extends(Posts, _super);

    function Posts() {
      return Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.model = Application.Models.Post;

    Posts.prototype.url = function() {
      return Application.url + "/" + 'posts.json';
    };

    Posts.prototype.comparator = "date";

    return Posts;

  })(Backbone.Collection);

  Application.Collections.Pages = (function(_super) {

    __extends(Pages, _super);

    function Pages() {
      return Pages.__super__.constructor.apply(this, arguments);
    }

    Pages.prototype.model = Application.Models.Page;

    Pages.prototype.url = function() {
      return Application.url + "/" + 'pages.json';
    };

    return Pages;

  })(Backbone.Collection);

  Application.Views.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      this.render = __bind(this.render, this);
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.el = "#main";

    Post.prototype.tagName = "article";

    Post.prototype["class"] = "post";

    Post.prototype.template = $('#post_template').html();

    Post.prototype.render = function() {
      var compiled;
      compiled = _.template(this.template);
      this.$el.append(compiled(this.model.toJSON()));
      if (this.model.get('comments')) {
        return this.loadDisqus();
      }
    };

    Post.prototype.loadDisqus = function() {
      var dsq;
      window.disqus_shortname = Application.disqus.name;
      window.disqus_identifier = this.model.get('id');
      window.disqus_url = Application.url + '/' + this.model.get('id');
      window.disqus_title = this.model.get('title') + " » " + Application.name;
      if (typeof DISQUS !== "undefined" && DISQUS !== null) {
        return DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = disqus_identifier;
            this.page.url = disqus_url;
            return this.page.title = disqus_title;
          }
        });
      } else {
        dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        return (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      }
    };

    return Post;

  })(Backbone.View);

  Application.Views.PostExcerpt = (function(_super) {

    __extends(PostExcerpt, _super);

    function PostExcerpt() {
      this.render = __bind(this.render, this);
      return PostExcerpt.__super__.constructor.apply(this, arguments);
    }

    PostExcerpt.prototype.el = ".posts";

    PostExcerpt.prototype.tagName = "article";

    PostExcerpt.prototype["class"] = "post";

    PostExcerpt.prototype.template = $('#post_excerpt_template').html();

    PostExcerpt.prototype.initialize = function() {
      return this.model.on('change', this.render);
    };

    PostExcerpt.prototype.render = function() {
      var compiled, model;
      compiled = _.template(this.template);
      model = this.getExcerpted();
      return this.$el.append(compiled(model.toJSON()));
    };

    PostExcerpt.prototype.getExcerpted = function() {
      var model;
      model = this.model.clone();
      model.set('content', this.model.get('content').split("<!-- more -->")[0]);
      return model;
    };

    return PostExcerpt;

  })(Backbone.View);

  Application.Views.Page = (function(_super) {

    __extends(Page, _super);

    function Page() {
      this.render = __bind(this.render, this);
      return Page.__super__.constructor.apply(this, arguments);
    }

    Page.prototype.el = "#main";

    Page.prototype.tagName = "article";

    Page.prototype["class"] = "page";

    Page.prototype.template = $('#page_template').html();

    Page.prototype.render = function() {
      var compiled;
      compiled = _.template(this.template);
      this.$el.html(compiled(this.model.toJSON()));
      if (typeof DISQUS !== "undefined" && DISQUS !== null) {
        return DISQUS.reset();
      }
    };

    return Page;

  })(Backbone.View);

  Application.Views.Single = (function(_super) {

    __extends(Single, _super);

    function Single() {
      this.render = __bind(this.render, this);
      return Single.__super__.constructor.apply(this, arguments);
    }

    Single.prototype.el = "#content";

    Single.prototype.template = $("#single_layout").html();

    Single.prototype.initialize = function() {
      return this.model.on('change', this.render);
    };

    Single.prototype.render = function() {
      var compiled, post;
      compiled = _.template(this.template);
      this.$el.html(compiled(this.model.toJSON()));
      if (this.model.get('layout') === "post") {
        post = new Application.Views.Post({
          model: this.model
        });
      } else if (this.model.get('layout') === "page") {
        post = new Application.Views.Page({
          model: this.model
        });
      }
      document.title = this.model.get('title') + " » " + Application.name;
      return post.render();
    };

    return Single;

  })(Backbone.View);

  Application.Views.Index = (function(_super) {

    __extends(Index, _super);

    function Index() {
      return Index.__super__.constructor.apply(this, arguments);
    }

    Index.prototype.el = "#content";

    Index.prototype.template = $("#index_layout").html();

    Index.prototype.render = function() {
      var comments, tweets, view;
      this.$el.html(this.template);
      this.collection.slice(0, 10).forEach(function(post) {
        var view;
        post.fetch();
        return view = new Application.Views.PostExcerpt({
          model: post
        });
      });
      comments = new Application.Collections.Comments;
      view = new Application.Views.CommentView({
        collection: comments
      });
      comments.fetch();
      tweets = new Application.Collections.Tweets;
      view = new Application.Views.TweetView({
        collection: tweets
      });
      return tweets.fetch();
    };

    return Index;

  })(Backbone.View);

  Application.Views.CommentView = (function(_super) {

    __extends(CommentView, _super);

    function CommentView() {
      this.render = __bind(this.render, this);

      this.initialize = __bind(this.initialize, this);
      return CommentView.__super__.constructor.apply(this, arguments);
    }

    CommentView.prototype.el = "#recentcomments";

    CommentView.prototype.template = $("#recent_comments_template").html();

    CommentView.prototype.initialize = function() {
      return this.collection.on('change', this.render);
    };

    CommentView.prototype.render = function() {
      var compiled;
      compiled = _.template(this.template);
      return this.$el.html(compiled({
        comments: this.collection.toJSON()
      }));
    };

    return CommentView;

  })(Backbone.View);

  Application.Views.TweetView = (function(_super) {

    __extends(TweetView, _super);

    function TweetView() {
      this.render = __bind(this.render, this);

      this.initialize = __bind(this.initialize, this);
      return TweetView.__super__.constructor.apply(this, arguments);
    }

    TweetView.prototype.el = "#tweets";

    TweetView.prototype.template = $("#recent_tweets_template").html();

    TweetView.prototype.initialize = function() {
      return this.collection.on('all', this.render);
    };

    TweetView.prototype.render = function() {
      var compiled;
      compiled = _.template(this.template);
      return this.$el.html(compiled({
        tweets: this.collection.toJSON()
      }));
    };

    return TweetView;

  })(Backbone.View);

  router = (function(_super) {

    __extends(router, _super);

    function router() {
      return router.__super__.constructor.apply(this, arguments);
    }

    router.prototype.routes = {
      ":year/:month/:day/:slug/": "post",
      ":slug/": "page",
      "": "index"
    };

    router.prototype.post = function(year, month, day, slug) {
      var post, view;
      post = new Application.Models.Post({
        id: year + "/" + month + "/" + day + "/" + slug
      });
      Application.posts.add(post);
      view = new Application.Views.Single({
        model: post
      });
      return post.fetch({
        error: this.redirect
      });
    };

    router.prototype.page = function(id) {
      var page, view;
      page = new Application.Models.Page({
        id: id
      });
      Application.pages.add(page);
      view = new Application.Views.Single({
        model: page
      });
      return page.fetch({
        error: this.redirect
      });
    };

    router.prototype.index = function() {
      var view;
      view = new Application.Views.Index({
        collection: Application.posts
      });
      return Application.posts.fetch({
        success: function() {
          return view.render();
        }
      });
    };

    router.prototype.redirect = function() {
      return document.location = Application.url + Backbone.history.fragment;
    };

    return router;

  })(Backbone.Router);

  Application.posts = new Application.Collections.Posts;

  Application.pages = new Application.Collections.Pages;

  Application.router = new router();

  Backbone.history.start({
    pushState: true,
    silent: true
  });

  jQuery(document).ready(function() {
    $('a[href^="{{ site.url }}/"]').live('click', function(e) {
      e.preventDefault();
      return Application.router.navigate($(this).attr('href').replace('{{ site.url }}/', ''), true);
    });
    false;
    window.resume_resize = function() {
      return $('.resume .bar').height($('.content').height() - 25);
    };
    $(window).resize(resume_resize);
    return resume_resize();
  });

}).call(this);
