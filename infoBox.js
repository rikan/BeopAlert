var infoBox = infoBox || {};

(function ($) {
    var infoBoxBase = {
        $el: null,
        options: {},
        _init: function () {
            this._createBox();
            if (this.options.movable) {
                this._makeMovable();
            }

        },
        _createBox: function () {
            var me = this;
            var $box = $('<div class="infoBox"></div>');
            this.$el = $box;

            if (me.options.hasHeader) {
                var $header = $('<div class="infoBox-header"></div>');

                if (me.options.movable) {
                    $header.addClass('movable');
                }
                if (me.options.title) {
                    $header.append('<div class="infoBox-title">' + me.options.title + '</div>');
                }

                if (me.options.hasClose) {
                    var $close = $('<div class="infoBox-close"></div>');
                    $header.append($close);
                    $close.click(function () {
                        me._destroy();
                    })
                }
                $box.append($header);
            }

            var $body = $('<div class="infoBox-body"></div>');

            if (me.options.icon) {
                $body.append('<div class="infoBox-icon"><img src="./image/' + me.options.icon + '"></div>');
            }

            if (me.options.msg) {
                $body.append('<div class="infoBox-msg">' + me.options.msg + '</div>');
            }
            $box.append($body);
            if (me.options.buttons) {
                var $footer = $('<div class="infoBox-footer"></div>');
                $box.append($footer);
                for (var btnKey in me.options.buttons) {
                    $footer.append(me._createBtn(me.options.buttons[btnKey]));
                }
            }

            if (me.options.modal) {
                $box.addClass('modal');
            }
            $box.appendTo(document.body);
            return $box;
        },
        _processInput: function (options) {
            if (options.buttons) {
                for (var btnKey in options.buttons) {
                    if (options.callback && options.callback[btnKey]) {
                        options.buttons[btnKey].callback = options.callback[btnKey];
                    }
                }
            }
            return options;
        },
        _show: function () {
            this.$el.show();
        },
        _hide: function () {
            this.$el.hide();
        },
        _destroy: function () {
            this.$el.remove();
        },

        _makeMovable: function () {
            var me = this;
            me.$el.mousedown(function () {
                me.$el.mousemove(function (e) {

                    var thisX = event.pageX - $(this).width() / 2,
                        thisY = event.pageY - $(this).height() / 2;

                    me.$el.offset({
                        left: thisX,
                        top: thisY
                    });
                })
            }).mouseup(function () {
                me.$el.off('mousemove');
            })
        },

        _createBtn: function (option) {
            var me = this;
            var $button = $('<button class="alert-button"></button>');
            $button.text(option.text);
            $button.click(function () {
                me._destroy();
                option.callback();
            });
            $button.addClass(option.css);
            this.$el.find('.infoBox-footer').append($button);
        }
    };

    function infoBoxAlert(type, options) {
        if (arguments.length >= 2) {
            if (infoBox.alert.options[type]) {
                this.type = type;
            } else {
                this.type = infoBox.alert.base.type;
            }
        } else {
            this.type = infoBox.alert.base.type;
        }


        this.options = this._processInput(options);

        this._init();
        this._show();
    }

    infoBoxAlert.prototype = $.extend({}, infoBoxBase, {
        constructor: infoBoxAlert,
        _processInput: function (options) {
            var mergedOptions = infoBoxBase._processInput.call(this, options);

            options = $.extend({}, infoBox.alert.base, infoBox.alert.options[this.type], mergedOptions);

            return options;
        },
        _init: function () {
            infoBoxBase._init.call(this);
        }
    });

    infoBox.alert = function (type, options) {
        return new infoBoxAlert(type, options);
    };

    infoBox.alert.base = {
        type: 'info',
        buttons: {
            ok: {
                text: 'ok',
                class: 'alert-button',
                callback: function () {

                }
            }
        },
        modal: true,
        hasHeader: true,
        hasClose: true,
        movable: true
    };

    infoBox.alert.options = {
        success: {
            icon: 'alert-success.png'
        },
        warning: {
            icon: 'alert-warning.png'
        },
        danger: {
            icon: 'alert-danger.png'
        },
        info: {
            icon: 'alert-info.png'
        }
    }


})(jQuery);