Tailwind like Color Shades Generator
=================================

This project allows you to generate color shades based on a starting color, similar to how Tailwind CSS generates color scales. It's designed for any color you want, and you can specify a range of shades (from 50 to 950, just like in Tailwind).

Project Overview
----------------

*   **Main Functionality:** Generate consistent and visually appealing color shades from any base color.
*   **Use Case:** Easily create color schemes for design, web development, and projects like the **chess clock** color scheme.
*   **Input:** A base color and the desired shade ID (ranging from 50 to 950).
*   **Output:** A visually organized grid of generated shades in an HTML file.

Project Structure
-----------------

The project is organized into several Python files, each handling specific parts of the process:

*   **`data.py`:** Contains the initial color data you need to work with. This includes any base colors and their corresponding shades.
*   **`generate.py`:** Responsible for generating the HTML grid of shades based on the calculated color shades.
*   **`similarity.py`:** Contains utility functions for color comparison, such as cosine similarity between colors.
*   **`work.py`:** The main file that pulls everything together, generating the compatible color shades and passing them to the grid generator.

How to Use
----------

To test the function and generate your own color shades, follow these steps:

1.  **Choose your color:** Pick the color you want to generate shades for. Use the HEX code format (e.g., `#10dda6`).
2.  **Select the shade ID:** Tailwind colors are divided into shades ranging from **50** to **950**. Pick your desired shade ID.
3.  **Run the main function:**
    *   Open the `main.py` file.
    *   Set your base color and shade ID.
    *   The script will generate the appropriate shades and pass them to the grid generation function.
4.  **View results:**
    *   The shades are displayed in a grid on the `shades.html` file.
    *   Open `shades.html` in your browser to see the results.


Files Explained
---------------

*   **`data.py`:** Contains initial data or base color configurations that you need at the start.
*   **`generate.py`:** Responsible for generating the HTML grid that visually displays the generated shades.
*   **`similarity.py`:** Utility functions for comparing colors and computing similarities.
*   **`work.py`:** The main file that brings everything together, handling the main logic for generating compatible colors and running the necessary functions.

Future Plans
------------

*   More detailed documentation will be added once the direction of the project is clearer (whether it will be turned into a web app, npm package, etc.).
*   Potential to turn this into a **web app** for easy access and interactive use.
*   Could be developed into an **npm package** for integration into various front-end projects.

How You Can Contribute
----------------------

*   If you find this project useful or interesting, feel free to contribute!
*   Fork the repo, make improvements, or suggest new features.
*   If you enjoyed the project, please give it a star ⭐ on GitHub!

Stay tuned for updates!