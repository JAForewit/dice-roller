"use strict";

function dice_initialize() {

    var container = $t.id('dice-box');
    container.style.width = window.innerWidth + 'px';
    container.style.height = window.innerHeight + 'px';

    $t.dice.use_true_random = false;
    $t.dice.scale = 100;
    //$t.dice.use_shadows = false;
    //$t.dice.dice_color = '#808080';
    //$t.dice.label_color = '#202020';
    //$t.dice.ambient_light_color = 0xff0000;
    //$t.dice.spot_light_color = 0xefdfd5;

    var box = new $t.dice.dice_box(container, { w: window.innerWidth, h: window.innerHeight });
    //box.animate_selector = false;

    $t.bind(window, 'resize', function () {
        container.style.width = window.innerWidth + 'px';
        container.style.height = window.innerHeight + 'px';
        box.reinit(container, { w: window.innerWidth, h: window.innerHeight });
    });

    function before_roll(vectors, notation, callback) {
        // do here rpc call or whatever to get your own result of throw.
        // then callback with array of your result, example:
        // callback([2, 2, 2, 2]); // for 4d6 where all dice values are 2.
        container.style.width = window.innerWidth + 'px';
        container.style.height = window.innerHeight + 'px';
        box.reinit(container, { w: window.innerWidth, h: window.innerHeight });
        callback(notation.result);
    }

    function after_roll(notation, result) {
        var res = result.join(' ');
        if (notation.constant) {
            if (notation.constant > 0) res += ' +' + notation.constant;
            else res += ' -' + Math.abs(notation.constant);
        }
        if (result.length > 1) res += ' = ' +
            (result.reduce(function (s, a) { return s + a; }) + notation.constant);
        console.log(res);
    }

    //throw options
    $t.bind($t.id('d4'), ['pointerup'], function (ev) {
        ev.stopPropagation();
        box.rolling = false;
        box.start_throw(function () {
            return $t.dice.parse_notation('d4');
        }, before_roll, after_roll);
    });

    $t.bind($t.id('d6'), ['pointerup'], function (ev) {
        ev.stopPropagation();
        box.rolling = false;
        box.start_throw(function () {
            return $t.dice.parse_notation('d6');
        }, before_roll, after_roll);
    });

    $t.bind($t.id('d8'), ['pointerup'], function (ev) {
        ev.stopPropagation();
        box.rolling = false;
        box.start_throw(function () {
            return $t.dice.parse_notation('d8');
        }, before_roll, after_roll);
    });

    $t.bind($t.id('d10'), ['pointerup'], function (ev) {
        ev.stopPropagation();
        box.rolling = false;
        box.start_throw(function () {
            return $t.dice.parse_notation('d10');
        }, before_roll, after_roll);
    });

    $t.bind($t.id('d12'), ['pointerup'], function (ev) {
        ev.stopPropagation();
        box.rolling = false;
        box.start_throw(function () {
            return $t.dice.parse_notation('d12');
        }, before_roll, after_roll);
    });

    $t.bind($t.id('d20'), ['pointerup'], function (ev) {
        ev.stopPropagation();
        box.rolling = false;
        box.start_throw(function () {
            return $t.dice.parse_notation('d20');
        }, before_roll, after_roll);
    });

    $t.bind($t.id('dice-input'), ['keyup'], function (ev) {
        if (ev.keyCode == 13) {
            ev.stopPropagation(); box.rolling = false;
            box.rolling = false;
            box.start_throw(function () {
                return $t.dice.parse_notation($t.id('dice-input').value);
            }, before_roll, after_roll);
        }
    });

    $t.bind($t.id('dice-roll-button'), ['pointerup'], function (ev) {
        ev.stopPropagation();
        box.rolling = false;
        box.start_throw(function () {
            return $t.dice.parse_notation($t.id('dice-input').value || $t.id('dice-input').placeholder);
        }, before_roll, after_roll);
    });

    $t.bind(document.body, ['touchmove'], function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
    }, {passive: false});

    //box.draw_selector();
    //box.bind_mouse(container, notation_getter, before_roll, after_roll);
}

function start() {
    //********* Huebee ************/
    // initials on multiple elements with loop
    var elems = document.querySelectorAll('.color-input');
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var hueb = new Huebee(elem, {
            // options
            saturations: 1,
            hues: 9,
            hue0: 210,
            customColors: [ '#C25', '#E62', '#EA0', '#19F', '#333' ]
        });
    }

    //*********** General ************/
}