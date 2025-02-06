

from generate import generateGrid
from work import genColorStop

# ! todo validate it has 6 chars
hexColorStopId = 500
hexColor = "#6366f1"
colorName = "myColor"
shadeids  = [50,100,200,300,400,500,600,700,800,900,950]
shades = {}

for el in shadeids:
    if el != hexColorStopId:
        shades[str(el)] = genColorStop(hexColor, hexColorStopId, el)
    else:
        shades[str(hexColorStopId)] = hexColor


print(shades)
generateGrid(colorName, shades)