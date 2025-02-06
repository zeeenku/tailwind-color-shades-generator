

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
    # max_sim = max(cosine_sim(colorToVect(hexColor), colors[key][str(hexColorStopId)]) for key in mags.keys())

    # for key in mags.keys():
    #     key_color = colors[key][str(hexColorStopId)]
    #     sim = cosine_sim(colorToVect(hexColor), colorToVect(key_color))
    #     # give more importance to similar color
    #     if max_sim == max_sim:
    #         med_distances[0] += mags[key][0] * sim * 10
    #         med_distances[1] += mags[key][1] * sim * 10
    #         med_distances[2] += mags[key][2] * sim * 10
    #         n += 10
    #     else:
    #         med_distances[0] += mags[key][0] * sim
    #         med_distances[1] += mags[key][1] * sim
    #         med_distances[2] += mags[key][2] * sim
    #         n += 1

    max_sim = max(
    cosine_sim(colorToVect(hexColor), colorToVect(colors[key][str(hexColorStopId)])) 
    for key in mags.keys()
    )

    # Initialize values to accumulate the weighted color distance
    med_distances = [0, 0, 0]  # [r, g, b]
    n = 0

    # Iterate over each color and apply the weighted distance based on similarity
    for key in mags.keys():
        key_color = colors[key][str(hexColorStopId)]
        
        # Calculate similarity once and store it
        color_distance_weight = cosine_sim(colorToVect(hexColor), colorToVect(key_color))
        
        # If the color is the most similar (max similarity), give it more importance
        if color_distance_weight == max_sim:
            weight = 25
        else:
            weight = 1
        
        # Update the color distance values with weight adjustment
        med_distances[0] += mags[key][0] * color_distance_weight * weight
        med_distances[1] += mags[key][1] * color_distance_weight * weight
        med_distances[2] += mags[key][2] * color_distance_weight * weight
        
        # Accumulate the total weight
        n += weight

    # Handle division by zero if there are no entries or if no weights were added
    if n != 0:
        dist = [distance / n for distance in med_distances]
    else:
        # If no valid calculations, set to default values
        dist = [0, 0, 0]


    dist = [
        med_distances[0]/n , med_distances[1]/n , med_distances[2]/n 
    ]


    new_res_vect = colorToVect(hexColor)
    new_res_vect[0] = max(0, min(255, int(new_res_vect[0] + dist[0])))
    new_res_vect[1] = max(0, min(255, int(new_res_vect[1] + dist[1])))
    new_res_vect[2] = max(0, min(255, int(new_res_vect[2] + dist[2])))
    print(new_res_vect)
    return vectToColor(new_res_vect)

