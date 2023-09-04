function joystickMovingPoint () {
    x_pos = Math.round(Math.map(pins.analogReadPin(AnalogPin.P2), 0, 1023, 4, 0))
    y_pos = Math.round(Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, 4, 0))
    led.plot(x_pos, y_pos)
    basic.pause(100)
    led.unplot(x_pos, y_pos)
}
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
    }
}
let BTN_PAUSE = 0
let y_pos = 0
let x_pos = 0
basic.showIcon(IconNames.SmallDiamond)
basic.pause(2000)
basic.clearScreen()
x_pos = 2
y_pos = 2
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
BTN_PAUSE = 200
basic.forever(function () {
    joystickMovingPoint()
    pullButtonsShowIcons()
})
