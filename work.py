

import json

from similarity import colorToVect, cosine_sim


colors = open("./colors.json", "r")
colors = colors.read()
colors= json.loads(colors)


stopId = 500
color = "#10dda6"
for key in colors.keys():
    key_color = colors[key][str(stopId)]
    print(f"{key_color} & {color} are similar by score of: {cosine_sim(colorToVect(color), colorToVect(key_color))}")