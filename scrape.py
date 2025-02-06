import json
from bs4 import BeautifulSoup


html = open("./colors.html", "r")

html = html.read()
soup = BeautifulSoup(html, "html.parser")

colorContainers = soup.find_all("div", {"class" : "text-slate-500 text-xs font-mono lowercase dark:text-slate-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs"})
colorNames = soup.find_all("div", {"class" : "text-sm font-semibold text-slate-900 dark:text-slate-200 2xl:col-end-1 2xl:pt-2.5"})
colors = {}

def incColorId( id : int):
    if id == 50 :
        return 100
    
    if id == 900 :
        return 950

    id += 100
    return id

# each color (22 colors total) has 11 sub colors ordered from 50,100,200...,800,900,950
# number of colors treated
i = 0

for color in colorNames:
    color = color.string
    colors[color] = {}

    # the shade id of the sub color
    j = 50

    # the counter for treated sub colors of a color
    k=0

    while k < 11:
        colors[color][str(j)] = colorContainers[i*11+k].string
        j = incColorId(j)
        k += 1

    i += 1

jsonFile = open("./colors.json", "a")
jsonFile.write(json.dumps(colors))
jsonFile.close()

