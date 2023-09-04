function joystickMovingPoint () {
    x_pos = Math.round(Math.map(pins.analogReadPin(AnalogPin.P2), 0, 1023, X_MAX, 0))
    y_pos = Math.round(Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, Y_MAX, 0))
    led.plot(x_pos, y_pos)
    basic.pause(100)
    led.unplot(x_pos, y_pos)
}
function initialCOnfig () {
    RADIO_GROUP = 5
    CONFIG_PARAM = 0
    X_MAX = 4
    Y_MAX = 4
    BTN_PAUSE = 200
    pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
    x_pos = 2
    y_pos = 2
    radio.setGroup(RADIO_GROUP)
}
input.onButtonPressed(Button.A, function () {
    if (CONFIG_PARAM == 1) {
        RADIO_GROUP += -1
        if (RADIO_GROUP < 0) {
            RADIO_GROUP = 0
        }
        showRadioGroup()
    }
    if (CONFIG_PARAM == 2) {
        X_MAX += -1
        if (X_MAX < 0) {
            RADIO_GROUP = 0
        }
        showMaxX()
    }
    if (CONFIG_PARAM == 3) {
        Y_MAX += -1
        if (X_MAX < 0) {
            Y_MAX = 0
        }
        showMaxY()
    }
})
function showRadioGroup () {
    basic.clearScreen()
    basic.showNumber(RADIO_GROUP)
}
function showMaxX () {
    basic.clearScreen()
    basic.showNumber(X_MAX)
}
input.onButtonPressed(Button.B, function () {
    if (CONFIG_PARAM == 1) {
        RADIO_GROUP += 1
        if (RADIO_GROUP > 255) {
            RADIO_GROUP = 255
        }
        showRadioGroup()
    }
    if (CONFIG_PARAM == 2) {
        X_MAX += 1
        if (X_MAX > 255) {
            X_MAX = 255
        }
        showMaxX()
    }
    if (CONFIG_PARAM == 3) {
        Y_MAX += 1
        if (Y_MAX > 255) {
            Y_MAX = 255
        }
        showMaxY()
    }
})
function pullButtonsShowIcons () {
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        basic.showLeds(`
            . . . . .
            . # . . .
            # # . . .
            . # . . .
            . . . . .
            `)
        basic.pause(BTN_PAUSE)
        basic.clearScreen()
        radio.sendString("LEFT")
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        basic.showLeds(`
            . . # . .
            . # # # .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(BTN_PAUSE)
        basic.clearScreen()
        radio.sendString("UP")
    } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        basic.showLeds(`
            . . . . .
            . . . # .
            . . . # #
            . . . # .
            . . . . .
            `)
        basic.pause(BTN_PAUSE)
        basic.clearScreen()
        radio.sendString("RIGHT")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . # # # .
            . . # . .
            `)
        basic.pause(BTN_PAUSE)
        basic.clearScreen()
        radio.sendString("DOWN")
    }
}
function showMaxY () {
    basic.clearScreen()
    basic.showNumber(Y_MAX)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    CONFIG_PARAM += 1
    if (CONFIG_PARAM > 3) {
        CONFIG_PARAM = 0
        basic.clearScreen()
    }
    if (CONFIG_PARAM == 1) {
        basic.showString("G")
        basic.pause(500)
        showRadioGroup()
    }
    if (CONFIG_PARAM == 2) {
        basic.showString("X")
        basic.pause(500)
        showMaxX()
    }
    if (CONFIG_PARAM == 3) {
        basic.showString("Y")
        basic.pause(500)
        showMaxY()
    }
})
let BTN_PAUSE = 0
let CONFIG_PARAM = 0
let RADIO_GROUP = 0
let Y_MAX = 0
let y_pos = 0
let X_MAX = 0
let x_pos = 0
basic.showIcon(IconNames.SmallDiamond)
basic.pause(2000)
basic.clearScreen()
initialCOnfig()
basic.forever(function () {
    joystickMovingPoint()
    pullButtonsShowIcons()
    basic.pause(100)
    radio.sendValue("x_pos", x_pos)
    radio.sendValue("y_pos", y_pos)
})
