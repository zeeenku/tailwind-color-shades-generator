import json


colors = open("./colors.json", "r")
colors = colors.read()
colors= json.loads(colors)


for color in colors.keys():
    print(color)