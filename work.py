

import json

from similarity import colorToVect, cosine_sim, magnitude, vectToColor

# maybe needs enhancements later
colors = open("./colors.json", "r")
colors = colors.read()
colors= json.loads(colors)


def genColorStop(hexColor, hexColorStopId, colorWantedStopId):

# for key in colors.keys():
#     key_color = colors[key][str(stopId)]
#     # print(f"{key_color} & {color} are similar by score of: {cosine_sim(colorToVect(color), colorToVect(key_color))}")

    mags = {}
    for key in colors.keys():
        
        mags[key] = {}
        key_color = colors[key][str(hexColorStopId)]
        wanted_color = colors[key][str(colorWantedStopId)]

        # r distance
        mags[key][0] = -colorToVect(key_color)[0] + colorToVect(wanted_color)[0]
        # g distance
        mags[key][1] = -colorToVect(key_color)[1] + colorToVect(wanted_color)[1]
        # b distance
        mags[key][2] = -colorToVect(key_color)[2] + colorToVect(wanted_color)[2]

    med_distances = [0,0,0]
    n = 0

    for key in mags.keys():
        key_color = colors[key][str(hexColorStopId)]
        sim = cosine_sim(colorToVect(hexColor), colorToVect(key_color))
        dists = []
        med_distances[0] += mags[key][0] * sim
        med_distances[1] += mags[key][1] * sim
        med_distances[2] += mags[key][2] * sim
        n += 1

    dist = [
        med_distances[0]/n , med_distances[1]/n , med_distances[2]/n 
    ]


    new_res_vect = colorToVect(hexColor)
    new_res_vect[0] = max(0, min(255, int(new_res_vect[0] + dist[0])))
    new_res_vect[1] = max(0, min(255, int(new_res_vect[1] + dist[1])))
    new_res_vect[2] = max(0, min(255, int(new_res_vect[2] + dist[2])))
    return vectToColor(new_res_vect)

