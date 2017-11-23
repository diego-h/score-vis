/*
typedef note {
	data: {
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

// TODO: clear notes_glob on each file load.
function initializeRectangleActions() {
	d3.select('.music').selectAll('.noterect')
		.data(notes_glob)
		.enter().append('rect')
		.attr('class', 'noterect')
		.attr('x', d => +document.getElementById(d.id).attributes.x.value)
		.attr('y', d => +document.getElementById(d.id).attributes.y.value)
		.attr('height', 15)
		.attr('width', 15)
		.style('fill', 'blue')
		.style('fill-opacity', 0.1)
	    .on('mouseover', function() {
	    	d3.select(this).style('fill', 'yellow');
	    })
	    .on('mouseleave', function() {
	    	d3.selectAll('.noterect').style('fill', 'blue');
	    });
};