def joystickMovingPoint():
    global x_pos, y_pos
    x_pos = Math.round(Math.map(pins.analog_read_pin(AnalogPin.P2), 0, 1023, 4, 0))
    y_pos = Math.round(Math.map(pins.analog_read_pin(AnalogPin.P1), 0, 1023, 4, 0))
    led.plot(x_pos, y_pos)
    basic.pause(100)
    led.unplot(x_pos, y_pos)
def pullButtonsShowIcons():
    if pins.digital_read_pin(DigitalPin.P13) == 0:
        basic.show_leds("""
            . . . . .
            . # . . .
            # # . . .
            . # . . .
            . . . . .
            """)
        basic.pause(BTN_PAUSE)
        basic.clear_screen()
    elif pins.digital_read_pin(DigitalPin.P14) == 0:
        basic.show_leds("""
            . . # . .
            . # # # .
            . . . . .
            . . . . .
            . . . . .
            """)
        basic.pause(BTN_PAUSE)
        basic.clear_screen()
    elif pins.digital_read_pin(DigitalPin.P15) == 0:
        basic.show_leds("""
            . . . . .
            . . . # .
            . . . # #
            . . . # .
            . . . . .
            """)
        basic.pause(BTN_PAUSE)
        basic.clear_screen()
    elif pins.digital_read_pin(DigitalPin.P16) == 0:
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            . # # # .
            . . # . .
            """)
        basic.pause(BTN_PAUSE)
        basic.clear_screen()
BTN_PAUSE = 0
y_pos = 0
x_pos = 0
basic.show_icon(IconNames.SMALL_DIAMOND)
basic.pause(2000)
basic.clear_screen()
x_pos = 2
y_pos = 2
pins.set_pull(DigitalPin.P13, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P14, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P15, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P16, PinPullMode.PULL_UP)
BTN_PAUSE = 200

def on_forever():
    joystickMovingPoint()
    pullButtonsShowIcons()
basic.forever(on_forever)
