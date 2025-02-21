import colorsys

def hex_to_hsl(hex_value):
    # Remove the '#' if present
    hex_value = hex_value.lstrip('#')

    # Convert hex to RGB
    r = int(hex_value[0:2], 16) / 255.0
    g = int(hex_value[2:4], 16) / 255.0
    b = int(hex_value[4:6], 16) / 255.0

    # Convert RGB to HSL
    h, s, l = colorsys.rgb_to_hls(r, g, b)

    # Return HSL as a tuple
    return (h * 360, s * 100, l * 100)


