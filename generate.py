

def generateGrid(name, shades):
    data = ""

    for key in shades:
        data += f"""
        <div class="color-card" style="background-color: {shades[key]};">
            <div class="color-box" style="background-color: #ff6347;"></div>
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
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
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    text-align: center;
    }

    .color-card:hover {
    transform: scale(1.05);
    }

    .color-box {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
    }

    .color-id {
    font-weight: bold;
    color: #333;
    font-size: 14px;
    }

    .color-name {
    font-size: 12px;
    color: #777;
    margin-bottom: 5px;
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