

# from data import generateGrid
# from work import genColorStop

# # ! todo validate it has 6 chars
# hexColorStopId =600
# hexColor = "#657a00"
# colorName = "myColor"
# shadeids  = [50,100,200,300,400,500,600,700,800,900,950]
# shades = {}

# for el in shadeids:
#     if el != hexColorStopId:
#         shades[str(el)] = genColorStop(hexColor, hexColorStopId, el)
#     else:
#         shades[str(hexColorStopId)] = hexColor


# print(shades)
# generateGrid(colorName, shades)



from data import generateGrid
from work import genColorStop

shadeids  = [50,100,200,300,400,500,600,700,800,900,950]


def is_valid_hex_color(hex_color):
    return hex_color.startswith('#') and len(hex_color) == 7 and all(c in '0123456789ABCDEFabcdef' for c in hex_color[1:])

def is_valid_hex_color_stop_id(stop_id):
    return stop_id in shadeids

colorName = input("Enter the color name: ")

hexColor = input("Enter the hex color (e.g., #657a00): ")
while not is_valid_hex_color(hexColor):
    print("Invalid hex color format. Please ensure the color starts with '#' and has exactly 6 characters after it.")
    hexColor = input("Enter the hex color (e.g., #657a00): ")

try:
    hexColorStopId = int(input("Enter the hexColorStopId (e.g., 600): "))
    while not is_valid_hex_color_stop_id(hexColorStopId):
        print("Invalid hexColorStopId. It should be a multiple of 50 between 50 and 950.")
        hexColorStopId = int(input("Enter the hexColorStopId (e.g., 600): "))
except ValueError:
    print("Invalid input for hexColorStopId. Using default value of 600.")
    hexColorStopId = 600  # fallback to default if input is not valid


shades = {}

for el in shadeids:
    if el != hexColorStopId:
        shades[str(el)] = genColorStop(hexColor, hexColorStopId, el)
    else:
        shades[str(hexColorStopId)] = hexColor

generateGrid(colorName, shades)

print("Color shades generated succesffully! visit shades.html file to see the results")
