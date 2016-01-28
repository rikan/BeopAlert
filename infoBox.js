var infoBox = infoBox || {};

(function ($) {
    var infoBoxBase = {
        $el: null,
        options: {},
        _init: function () {
            var me = this;
            this.$el = this._createBox();
        },
        _createBox: function () {
            var $box = $('<div class="infoBox"></div>');
            if (this.options.hasHeader) {
                var $header = $('<div class="infoBox-header"></div>');
                if (this.options.title) {
                    $header.append('<div class="infoBox-title">' + this.options.title + '</div>');
                }
                if (this.options.hasClose) {
                    $header.append('<div class="infoBox-close"></div>');
                }
                $box.append($header);
            }

            $box.append('<div class="infoBox-body"></div>');

            if (this.options.hasFooter) {
                var $footer = $('<div class="infoBox-footer"></div>');
                if (this.options.footerBtns) {
                    for (var i = 0, j = this.options.footerBtns.length; i < j; i++) {
                        $footer.append(this._createBtn(this.options.btns[i]));
                    }
                }
                $box.append($footer);
            }

            if (this.options.modal) {
                $box.addClass('modal');
            }
            return $box;
        },

        _show: function () {
            this.$el.show();
        },
        _close: function () {
            this.$el.hide();
        },
        _destroy: function () {
            this.$el.remove();
        },

        _createBtn: function () {

        }
    };


    infoBox.alert = function (type, options) {

    }


})(jQuery);