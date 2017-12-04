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

function matchNotes(a, b) {
	// Test for note-name matching.
	if (a.data.note_name.toLowerCase() !== b.data.note_name.toLowerCase()) return false;

	// Test for simultaneity.
	const a_start = a.time;
	const b_start = b.time;
	const a_end = a_start + a.data.dur;
	const b_end = b_start + b.data.dur;
	if (a_end <= b_start || b_end <= a_start) return false;

	return true;
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
		return difference > 0 ? difference : 15;
	};
	// Add note rectangles.
	d3.select('.music').selectAll('.noterect')
		.data(notes_glob)
		.enter().append('rect')
		.attr('class', 'noterect')
		.attr('x', d => +document.getElementById(d.id).attributes.x.value)
		.attr('y', d => +document.getElementById(d.id).attributes.y.value)
		.attr('height', 15)
		.attr('width', d => calculateNoteHighlightWidth(d))
		.style('fill', 'blue')
		.style('fill-opacity', 0.1)
	    .on('mouseover', function(d_curr) {
	    	d3.selectAll('.noterect')
	    		.filter(d => matchNotes(d, d_curr))
	    		.style('fill', 'orange');
	    	console.log(d_curr.data);
	    })
	    .on('mouseleave', function() {
	    	d3.selectAll('.noterect').style('fill', 'blue');
	    });
};