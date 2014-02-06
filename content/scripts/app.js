$(document).ready(function () {
            'use strict';

            var app = {}; // create namespace for our app

            // Models
            app.Celebs = Backbone.Model.extend({});
            app.isMobile = false;
            // Collections
            app.CelebsList = Backbone.Collection.extend({
                model: app.Celebs
            });

            // instance of the Collection
            app.CelebsList = new app.CelebsList();
            app.CelebsList.add(data);

            // Views
            app.CelebsView = Backbone.View.extend({

                render: function () {
                    var _self = this;
                    this.$el.html(ich.celebsMenu({
                        Celebs: this.collection.toJSON()
                    }));
                    return this; // enable chained calls
                },
                initialize: function () {
                    this.collection = app.CelebsList;
                    this.$el = $(".mainMenu");
                    return this.render();
                },
                events: {
                    'click .menuLink': 'loadDetails'
                },

                loadDetails: function (e) {
                    var celebToShow = e.currentTarget.attributes.linkId.value;
                    var li = $($(e.currentTarget).parent());
                    li.siblings().removeClass("active");
                    li.addClass("active");
                    var filter = function (model) {
                        return model.attributes.id === celebToShow;
                    };
                    var getModel = function (model) {
                        return {
                            id: model.get('date'),
                            firstName: model.get('firstName'),
                            lastName: model.get('lastName'),
                            bio: model.get('bio'),
                            picture: model.get('picture')
                        };
                    }
                    var selectedModel = this.collection.filter(filter).map(getModel);
                    var html = ich.celebDetails({ CelebDetails: selectedModel });
                    $('.mobileView').empty();
                    $(".celebDetails").empty();
                    if (app.isMobile) {
                        $("#details" + celebToShow).html(html);
                    }
                    else {
                        $(".celebDetails").html(html);
                    }
                }
            });
            app.celebsView = new app.CelebsView();
            $(window).bind('resize load', function () {
                if ($(this).width() < 767) {
                    app.isMobile = true;
                }
                else {
                    app.isMobile = false;
                }
                $('.active').children()[0].click();
            });
            $(".menuLink")[0].click();
        });