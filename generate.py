

def generateGrid(name, shades):
    data = ""

    for key in shades:
        data += f"""
        <div class="color-card">
            <div class="color-card-color" style="background-color: {shades[key]};"></div>
            <div class="color-id">{key}</div>
            <div class="color-name">{shades[key]}</div>
        </div>
        """

    
    data = getFullHtml(name, data)

    with open("./shades.html", 'w') as filetowrite:
        filetowrite.write(data)

def getFullHtml(name, body):

    styles = """
        body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    }

   .grid-container {
  display: grid;
  grid-template-columns: repeat(11, 1fr); /* Creates 11 equal-width columns */
  max-width: 1000px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}


    .color-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;
    }

    .color-card-color {
    width:100%;
    aspect-ratio: 3/2;
    border-radius: 8px;
    }

    .color-card:hover {
    transform: scale(1.05);
    }


    .color-id {
    font-weight: bold;
    color: #333;
    font-size: 14px;
    }

    .color-name {
    font-size: 12px;
    color: #777;
    margin: 5px 0px;
    }

    .shade-name {
    font-size: 12px;
    color: #888;
    }
    """


    return f"""
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Color Stops and Shades</title>
<style>
    {styles}
</style>
</head>
<body>
<h1>{name}</h1>
<div class="grid-container">
{body}
</div>
"""