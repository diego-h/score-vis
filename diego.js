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
var scale_factor = '0.9';
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
	if (part_name === 'None' || part_name !== curr_selected_part) {
		d3.selectAll('.partrect')
			.style('fill', 'white')
			.style('fill-opacity', 0);
		matchingNotesClasses.forEach(className => d3.selectAll('.' + className).remove());
		matchingNotesClasses = [];
		if (part_name === 'None') return;
	}

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
	    		.style('fill', 'orange')
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

function moveScore(index_delta) {
	if (score_position_info.current_measure + index_delta < 0 ||
		score_position_info.current_measure + index_delta >= score_position_info.measure_xcoords.length) {
		return;
	}
	score_position_info.current_measure += index_delta;
	x_offset = -score_position_info.measure_xcoords[score_position_info.current_measure];
	d3.select('.music')
	  .attr('transform', 'scale(' + scale_factor + ')translate(' + x_offset.toFixed(2) + ', 0)');
	d3.select('#score-clip')
	  .attr('transform', 'translate(' + -x_offset + ', 0)');
}

function initializeRectangleActions() {
	matchingNotesClasses = [];

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
		if (difference > 0) return difference - 3;

		const idOfNextNextNote = 'johnny' + (+parseInt(d.id.substring(6)) + 2);
		const nextNextNote = document.getElementById(idOfNextNextNote);
		if (!nextNextNote) return 15;
		const nextDifference = +nextNextNote.attributes.x.value - +document.getElementById(d.id).attributes.x.value;
		if (nextDifference > 0) return nextDifference - 3;
		return 15;
	};
	const clearAllHighlights = () => {
		d3.selectAll('.noterect').style('fill', 'white')
	                             .style('fill-opacity', 0)
	                             .style('stroke-width', 0);
	};
	// Add part rectangles (highlighted upon part selection).
	// d3.select('.music').selectAll('.partrect')
	// 	.data(notes_glob)
	// 	.enter().append('rect')
	// 	.attr('class', 'partrect')
	// 	.attr('x', d => +document.getElementById(d.id).attributes.x.value)
	// 	.attr('y', d => +document.getElementById(d.id).attributes.y.value - 7)
	// 	.attr('height', 15)
	// 	.attr('width', d => {
	// 		const highlight_width = calculateNoteHighlightWidth(d);
	// 		d.highlight_width = highlight_width; // cache the highlight width in notes_glob.
	// 		return highlight_width;
	// 	})
	// 	.style('fill', 'white')
	// 	.style('fill-opacity', 0)
	// Add note rectangles (highlighted upon hover).
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
	    .on('mouseover', function(d_curr) {
	    	if (curr_selected_note.id !== -1) return;
	    	d3.selectAll('.noterect')
	    		.filter(d => matchNotes(d, d_curr))
	    		.style('fill', 'yellow')
	    		.style('fill-opacity', 0.5)
	    		.style('z-index', -1);
	    	console.log(d_curr.data);
	    })
	    .on('mouseleave', function() {
	    	if (curr_selected_note.id === -1) {
	    		clearAllHighlights();
	    	}
	    })
	    .on('click', function(d_curr) {
	    	if (curr_selected_note.id === -1) {
	    		d3.select(this).style('stroke-width', 3).style('stroke', 'black');
	    		curr_selected_note = d_curr;
	    		return;
	    	}
	    	d3.select(this).style('stroke-width', 0);
	    	if (curr_selected_note.id === d_curr.id) {
	    		curr_selected_note = {id: -1};
	    		clearAllHighlights();
	    	}
	    });
};