module.exports = function(api) {
	api.add({
		/* Let's get this party started */
		'::-webkit-scrollbar': {
		    wid: '8px'
		},
		/* Track */
		'::-webkit-scrollbar-track': {
		    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
		    '-w-border-radius': '2px'
		},
		/* Handle */
		'::-webkit-scrollbar-thumb': {
		    '-w-border-radius': '2px',
		    bg: 'rgba(150,150,150,0.8)',
		    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)'
		},
		'::-webkit-scrollbar-thumb:window-inactive': {
			bg: 'rgba(150,150,150,0.4)'
		}
	});
}