# score-vis

ScoreVis
============

A visualization aid for reading music scores. Developed as a final project in Stanford's CS448B (Data Visualization) course, fall 2017.

The current implementation uses Willem Vree's [abcweb](https://wim.vree.org/js/) to render MusicXML scores to svg. The vast majority of the  code I wrote is in the file diego.js.

To use:
- Visit abcweb.html in the browser (Chrome recommended)
- Load a MusicXML file. The provided sample files are recommended.

Interactions:

Single-note matching--
- Hover over a note to highlight matching notes.
- Click a note to make the highlights stick instead of disappear. The note will then be surrounded by a box. Then you can use the "Next Note" and "Previous Note" buttons to explore the notes in that staff. To go back to non-sticky highlights, click the note with the box around it.

Single-staff matching--
- Select an instrument from the dropdown to match by.
