$('.order-form').on('submit', function () {
    var $this = $(this),
        button_form = $this.find('button.button-element');
    button_form.attr('disabled', 'disabled');
    $this.find('input').removeClass('-error');
    $this.find('select').removeClass('-error');
    // send form
    $.post("./scripts/email.php", $.param($this.serializeArray()),
        function (data) {
            // any action
            button_form.attr('disabled', false);
        }, 'json');
    return false;
});