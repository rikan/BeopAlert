var infoBox = infoBox || {};

(function ($) {
    var infoBoxBase = {
        $el: null,
        options: {},
        _init: function () {
            this.$el = this._createBox();
            if (this.options.movable) {
                this._makeMovable();
            }

        },
        _createBox: function () {
            var me = this;
            var $box = $('<div class="infoBox"></div>');

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

            if (me.options.msg) {
                $body.append('<div class="infoBox-msg">' + me.options.msg + '</div>');
            }
            $box.append($body);
            if (me.options.hasFooter) {
                var $footer = $('<div class="infoBox-footer"></div>');
                if (me.options.buttons) {
                    for (var i = 0, j = me.options.buttons.length; i < j; i++) {
                        $footer.append(me._createBtn(me.options.buttons[i]));
                    }
                }
                $box.append($footer);
            }

            if (me.options.modal) {
                $box.addClass('modal');
            }
            $box.appendTo(document.body);
            return $box;
        },
        _processInput: function (options) {
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

        _createBtn: function () {

        }
    };

    function infoBoxAlert(type, options) {
        this.type = type;

        this.options = this._processInput(options);

        this._init();
        this._show();
    }

    infoBoxAlert.prototype = $.extend({}, infoBoxBase, {
        constructor: infoBoxAlert,
        _processInput: function (options) {
            var mergedOptions = infoBoxBase._processInput.call(this, options);

            options = $.extend({}, mergedOptions, infoBox.alert.base, infoBox.alert.options[this.type]);

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
        buttons: {
            ok: {
                text: 'ok',
                class: ''
            }
        },
        modal: true,
        hasHeader: true,
        hasClose: true,
        hasFooter: true,
        movable: true
    };

    infoBox.alert.options = {
        success: {
            icon: ''
        },
        warning: {
            icon: ''
        },
        danger: {
            icon: ''
        },
        info: {
            icon: ''
        }
    }


})(jQuery);