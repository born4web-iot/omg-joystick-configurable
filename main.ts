function joystickMovingPoint() {
    
    x_pos = Math.round(Math.map(pins.analogReadPin(AnalogPin.P2), 0, 1023, 4, 0))
    y_pos = Math.round(Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, 4, 0))
    led.plot(x_pos, y_pos)
    basic.pause(100)
    led.unplot(x_pos, y_pos)
}

function initialCOnfig() {
    
    x_pos = 2
    y_pos = 2
    pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
    BTN_PAUSE = 200
    RADIO_GROUP = 5
    radio.setGroup(RADIO_GROUP)
    CONFIG_PARAM = 0
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (CONFIG_PARAM == 1) {
        RADIO_GROUP += -1
        if (RADIO_GROUP < 0) {
            RADIO_GROUP = 0
        }
        
        showRadioGroup()
    }
    
})
function showRadioGroup() {
    basic.clearScreen()
    basic.showNumber(RADIO_GROUP)
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (CONFIG_PARAM == 1) {
        RADIO_GROUP += 1
        if (RADIO_GROUP > 255) {
            RADIO_GROUP = 255
        }
        
        showRadioGroup()
    }
    
})
function pullButtonsShowIcons() {
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

input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_pressed() {
    
    CONFIG_PARAM += 1
    if (CONFIG_PARAM > 1) {
        CONFIG_PARAM = 0
        basic.clearScreen()
    }
    
    if (CONFIG_PARAM == 1) {
        basic.showString("G")
        basic.pause(1000)
        showRadioGroup()
    }
    
})
let CONFIG_PARAM = 0
let RADIO_GROUP = 0
let BTN_PAUSE = 0
let y_pos = 0
let x_pos = 0
basic.showIcon(IconNames.SmallDiamond)
basic.pause(2000)
basic.clearScreen()
initialCOnfig()
basic.forever(function on_forever() {
    joystickMovingPoint()
    pullButtonsShowIcons()
    basic.pause(100)
    radio.sendValue("x_pos", x_pos)
    radio.sendValue("y_pos", y_pos)
})
