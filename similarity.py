import math


def magnitude(vect):
    return math.sqrt(sum(v**2 for v in vect) )

def dot_prod(vect1,vect2):
    # ! wht does zip do???
    return sum(v1*v2 for v1,v2 in zip(vect1,vect2))


def cosine_sim(vect1,vect2):
    mag1 = magnitude(vect1)
    mag2 = magnitude(vect2)
    if  mag1 == 0 or  mag2 == 0:
        return 0
    
    return dot_prod(vect1,vect2)/(mag1*mag2)

def hexToDecimal(string):
    res = 0
    i = 0
    for char in (string[::-1]).lower():
        if char == "a":
            char = 10
        elif char == "b":
            char = 11
        elif char == "c":
            char = 12
        elif char == "d":
            char = 13
        elif char == "e":
            char = 14
        elif char == "f":
            char = 15
        else:
            char = int(char)
        res += char * (16**i)
        i += 1
    return res

def colorToVect(color):
    r = hexToDecimal(color[1:3])
    g = hexToDecimal(color[3:5])
    b = hexToDecimal(color[5:7])
    return [r,g,b]

