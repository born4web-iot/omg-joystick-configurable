def joystickMovingPoint():
    global x_pos, y_pos
    x_pos = Math.round(Math.map(pins.analog_read_pin(AnalogPin.P2), 0, 1023, 4, 0))
    y_pos = Math.round(Math.map(pins.analog_read_pin(AnalogPin.P1), 0, 1023, 4, 0))
    led.plot(x_pos, y_pos)
    basic.pause(100)
    led.unplot(x_pos, y_pos)
def initialCOnfig():
    global x_pos, y_pos, BTN_PAUSE, RADIO_GROUP, CONFIG_PARAM
    x_pos = 2
    y_pos = 2
    pins.set_pull(DigitalPin.P13, PinPullMode.PULL_UP)
    pins.set_pull(DigitalPin.P14, PinPullMode.PULL_UP)
    pins.set_pull(DigitalPin.P15, PinPullMode.PULL_UP)
    pins.set_pull(DigitalPin.P16, PinPullMode.PULL_UP)
    BTN_PAUSE = 200
    RADIO_GROUP = 5
    radio.set_group(RADIO_GROUP)
    CONFIG_PARAM = 0

def on_button_pressed_a():
    global RADIO_GROUP
    if CONFIG_PARAM == 1:
        RADIO_GROUP += -1
        if RADIO_GROUP < 0:
            RADIO_GROUP = 0
        showRadioGroup()
input.on_button_pressed(Button.A, on_button_pressed_a)

def showRadioGroup():
    basic.clear_screen()
    basic.show_number(RADIO_GROUP)

def on_button_pressed_b():
    global RADIO_GROUP
    if CONFIG_PARAM == 1:
        RADIO_GROUP += 1
        if RADIO_GROUP > 255:
            RADIO_GROUP = 255
        showRadioGroup()
input.on_button_pressed(Button.B, on_button_pressed_b)

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
        radio.send_string("LEFT")
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
        radio.send_string("UP")
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
        radio.send_string("RIGHT")
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
        radio.send_string("DOWN")

def on_logo_pressed():
    global CONFIG_PARAM
    CONFIG_PARAM += 1
    if CONFIG_PARAM > 1:
        CONFIG_PARAM = 0
        basic.clear_screen()
    if CONFIG_PARAM == 1:
        basic.show_string("G")
        basic.pause(1000)
        showRadioGroup()
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

CONFIG_PARAM = 0
RADIO_GROUP = 0
BTN_PAUSE = 0
y_pos = 0
x_pos = 0
basic.show_icon(IconNames.SMALL_DIAMOND)
basic.pause(2000)
basic.clear_screen()
initialCOnfig()

def on_forever():
    joystickMovingPoint()
    pullButtonsShowIcons()
    basic.pause(100)
    radio.send_value("x_pos", x_pos)
    radio.send_value("y_pos", y_pos)
basic.forever(on_forever)
