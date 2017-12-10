/*
typedef note {
	data: {
		note_name: string
	   	apit: number,
	   	dur: number,
	   	pit: number
	},
	time: number
	part: string
    position: {
    	x: number,
        y: number
    }
    id: string
}
*/
var notes_glob = [];
var curr_note_id = 0;
var scale_factor = 2.0;
var x_offset = 0;
var view_dimensions = {
	height: 1500,
	width: 1500
};
var score_position_info = {
	measure_xcoords: [],
	current_measure: 0
}
var curr_selected_note = {id: -1};
var curr_selected_part = 'None';
var parts = [];
var bflat_notename_conversions = {
	'A': 'G',
	'B': 'A',
	'C': 'B',
	'D': 'C',
	'E': 'D',
	'F': 'E',
	'G': 'F'
};
var eflat_notename_conversions = {
	'A': 'C',
	'B': 'D',
	'C': 'E',
	'D': 'F',
	'E': 'G',
	'F': 'A',
	'G': 'B'
};
var matchingNotesClasses = [];
var parts_positions = []; // part_name, x_center, y

function noteMatchesWithPart(note, part_name) {
	for (var i = 0; i < notes_glob.length; i++) {
		if (notes_glob[i].part === part_name && matchPart(notes_glob[i], note)) {
			return true;
		}
	}
	return false;
}

function getMatchingX(note, d) {
	return Math.max(
	    +document.getElementById(note.id).attributes.x.value,
	    +document.getElementById(d.id).attributes.x.value);
}

function getMatchingXEnd(note, d) {
	return Math.min(
		+document.getElementById(note.id).attributes.x.value + note.highlight_width,
		+document.getElementById(d.id).attributes.x.value +  d.highlight_width);
}

function matchPart(part_name) {
	console.log('matchPart called with part_name ' + part_name + ' and curr_selected_part ' + curr_selected_part);
	if (curr_selected_part === 'None' && part_name !== 'None') {
		d3.selectAll('text').attr('fill', 'gray');
		d3.selectAll('.stroke').attr('stroke', 'gray');
		d3.selectAll('.fill').attr('fill', 'gray');
	}
	if (curr_selected_part !== 'None' && part_name === 'None') {
		d3.selectAll('text').attr('fill', 'gray');
		d3.selectAll('.stroke').attr('stroke', 'gray');
		d3.selectAll('.fill').attr('fill', 'gray');
	}


	if (part_name === 'None' || part_name !== curr_selected_part) {
		d3.selectAll('.partrect')
			.style('fill', 'white')
			.style('fill-opacity', 0);
		matchingNotesClasses.forEach(className => d3.selectAll('.' + className).remove());
		matchingNotesClasses = [];
	}

	curr_selected_part = part_name;
	if (part_name === 'None') return;

	// Create rects for matching notes.
	notes_glob.forEach(note => {
		if (note.part === part_name) {
			const matchingNotesData = d3.selectAll('.noterect')
	    		.filter(d => matchNotes(d, note))
	    		.data(); // Array of notes that overlap with note.
    		const selection = d3.select('.music').selectAll('.matchingpartrect' + note.id)
				.data(matchingNotesData)
				.enter().append('rect')
				.attr('class', 'matchingpartrect' + note.id)
				.attr('x', d => getMatchingX(note, d))
				.attr('y', d => +document.getElementById(d.id).attributes.y.value - 7) // keep the matching note's y-coord
	    		.attr('width', d => Math.abs(getMatchingXEnd(note, d) - getMatchingX(note, d)))
	    		.attr('height', 15)
	    		.style('fill', 'blue')
	    		.style('fill-opacity', 0.5)
	    		.style('pointer-events', 'none');
	    	matchingNotesClasses.push('matchingpartrect' + note.id);
		}
	});
}

function getConcertPitchNoteName(note) {
	const note_name = note.data.note_name.toUpperCase();
	if (!note.part) return 'none';
	if (note.part.indexOf('Bb') !== -1) return bflat_notename_conversions[note_name];
	if (note.part.indexOf('Eb') !== -1) return eflat_notename_conversions[note_name];
	return note_name;
}

function matchNotes(a, b) {
	// Test for note-name matching.
	if (getConcertPitchNoteName(a) !== getConcertPitchNoteName(b)) return false;

	// Test for simultaneity.
	const a_start = a.time;
	const b_start = b.time;
	const a_end = a_start + a.data.dur;
	const b_end = b_start + b.data.dur;
	if (a_end <= b_start || b_end <= a_start) return false;

	return true;
}

function hideWijzer() {
	// Make the wijzer invisible (a feature we don't want right now)
	setTimeout(() => d3.select('#shade').attr('fill-opacity', 0), 2000);
}

function moveOrScaleScore(index_delta, scale_factor_delta) {
	if (score_position_info.current_measure + index_delta < 0 ||
		score_position_info.current_measure + index_delta >= score_position_info.measure_xcoords.length) {
		return;
	}
	score_position_info.current_measure += index_delta;
	scale_factor += scale_factor_delta;
	x_offset = -score_position_info.measure_xcoords[score_position_info.current_measure];
	d3.select('.music')
	  .attr('transform', 'scale(' + scale_factor + ')translate(' + (x_offset).toFixed(2) + ', 0)');
	d3.select('#score-clip')
	  .attr('transform', 'translate(' + (-x_offset) + ', 0)');

	// TODO: this doesn't do what you want it to do. make it do what you want
	d3.select('#notation').attr('height', document.getElementsByTagName('svg')[0].getBBox().height);
}

function clearAllHighlights() {
	// TODO: clear all highlights except the selected ones.
	d3.selectAll('.noterect').style('fill', 'white')
                             .style('fill-opacity', 0)
                             .style('stroke-width', 0);
    d3.selectAll('.partnamerect').style('fill', 'white')
                             .style('fill-opacity', 0)
                             .style('stroke-width', 0);
}

function highlightNoteRectsAndPartNameRects(note_datum) {
	const selected_note_rects = d3.selectAll('.noterect')
		.filter(d => matchNotes(d, note_datum))
		.style('fill', 'yellow')
		.style('fill-opacity', 0.5);
	const shouldPartNameRectBeHighlighted = (selected_note_rects, part_position_datum) =>
		selected_note_rects.find(note_rect => note_rect.part === part_position_datum.part_name);
	d3.selectAll('.partnamerect')
		.filter(d => shouldPartNameRectBeHighlighted(selected_note_rects.data(), d))
		.style('fill', 'yellow')
		.style('fill-opacity', 0.5)
	console.log(note_datum);
}

function advanceSelectedNote(index_delta) {
	if (curr_selected_note.id === -1) return;

	const index = notes_glob.indexOf(curr_selected_note);
	if (index + index_delta >= notes_glob.length ||
		index + index_delta < 0) return;

	clearAllHighlights();
	curr_selected_note = notes_glob[index + index_delta];
	highlightNoteRectsAndPartNameRects(curr_selected_note);
	const new_selected_noterect = d3.selectAll('.noterect')
		.filter(d => d.id === curr_selected_note.id)
		.style('stroke-width', 3).style('stroke', 'black');
	
	const selected_note_xcoord = new_selected_noterect.attr('x');
}

function initializeRectangleActions() {
	matchingNotesClasses = [];

	// Disable score file selection (to select another file,
	// user should reload the page to avoid bugs. Sorry not sorry.)
	document.getElementById('abclbl').innerHTML = 'Refresh to load a different file.'
	const file_input = document.getElementById('fknp');
	file_input.parentNode.removeChild(file_input);

	// Make rects to highlight part names.
	d3.select('.music').selectAll('.partnamerect')
		.data(parts_positions)
		.enter().append('rect')
		.attr('class', 'partnamerect')
		.attr('x', d => d.x_center - 60)
		.attr('y', d => d.y - 13)
		.attr('height', 20)
		.attr('width', 120)
		.style('fill', 'white')
		.style('fill-opacity', 0)
		.lower();

	// Sort the array of notes by id.
	notes_glob.sort((a,b) => +parseInt(a.id.substring(6)) - +parseInt(b.id.substring(6)));

	// Populate the array of parts and use it to populate dropdown.
	parts = ['None'];
	notes_glob.forEach(note => {
		if (note.part && !parts.find(p => p === note.part)) {
			parts.push(note.part);
		}
	});
	const sel = document.getElementById('partselection');
	for (let i = 0; i < parts.length; i++) {
	    var opt = document.createElement('option');
	    opt.innerHTML = parts[i];
	    opt.value = parts[i];
	    sel.appendChild(opt);
	}

	// Dedup the array of measure xcoords.
	score_position_info.measure_xcoords = score_position_info.measure_xcoords.filter(function(elem, index, self) {
    	return index === self.indexOf(elem);
	});
	score_position_info.measure_xcoords.push(0); // For the beginning!
	score_position_info.measure_xcoords.sort((a, b) => a - b);
	score_position_info.current_measure = 0;
	moveOrScaleScore(0, 0);

	// Correct svg configurations.
	x_offset = 0;
	d3.select('svg').attr('viewBox', '0 0 ' + view_dimensions.width + ' ' + view_dimensions.height).attr('width', view_dimensions.width + 'px');
	d3.select('.music').attr('transform', 'scale(' + scale_factor + ')translate(' + x_offset + ', 0)');

	// Add clip path.
	d3.select('svg')
	  .append('clipPath')
	  .attr('id', 'score-clip')
	  .append('rect')
	  .attr('height', view_dimensions.height)
	  .attr('width', view_dimensions.width)
	  .attr('transform', 'translate(0, 0)');
	d3.select('svg')
	  .select('.music')
	  .attr('clip-path', 'url(#score-clip)');

	const calculateNoteHighlightWidth = (d) => {
		// return 15;

		const idOfNextNote = 'johnny' + (+parseInt(d.id.substring(6)) + 1);
		const nextNote = document.getElementById(idOfNextNote);
		if (!nextNote) return 15;
		const difference = +nextNote.attributes.x.value - +document.getElementById(d.id).attributes.x.value;
		if (difference > 200) return 15;
		if (difference > 0) return difference - 3;

		const idOfNextNextNote = 'johnny' + (+parseInt(d.id.substring(6)) + 2);
		const nextNextNote = document.getElementById(idOfNextNextNote);
		if (!nextNextNote) return 15;
		const nextDifference = +nextNextNote.attributes.x.value - +document.getElementById(d.id).attributes.x.value;
		if (nextDifference > 200) return 15;
		if (nextDifference > 0) return nextDifference - 3;
		return 15;
	};
	d3.select('.music').selectAll('.noterect')
		.data(notes_glob)
		.enter().append('rect')
		.attr('class', 'noterect')
		.attr('x', d => +document.getElementById(d.id).attributes.x.value)
		.attr('y', d => +document.getElementById(d.id).attributes.y.value - 7)
		.attr('height', 15)
		.attr('width', d => {
			const highlight_width = calculateNoteHighlightWidth(d);
			d.highlight_width = highlight_width; // cache the highlight width in notes_glob.
			return highlight_width;
		})
		.style('fill', 'white')
		.style('fill-opacity', 0)
		// .lower() // this puts the highlights behind the notes, but apparently pointer events stop at note heads :(
	    .on('mouseover', function(d_curr) {
	    	if (curr_selected_note.id !== -1) return;
	    	highlightNoteRectsAndPartNameRects(d_curr);
	    })
	    .on('mouseleave', function() {
	    	if (curr_selected_note.id === -1) {
	    		clearAllHighlights();
	    	}
	    })
	    .on('click', function(d_curr) {
	    	// If no note is currently selected, select the clicked note.
	    	if (curr_selected_note.id === -1) {
	    		d3.select(this).style('stroke-width', 3).style('stroke', 'black');
	    		curr_selected_note = d_curr;
	    		return;
	    	}
	    	d3.select(this).style('stroke-width', 0);
	    	// If the user clicked an already-selected note, unselect it.
	    	if (curr_selected_note.id === d_curr.id) {
	    		curr_selected_note = {id: -1};
	    	}
	    });
};