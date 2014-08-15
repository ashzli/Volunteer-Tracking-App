function VolunteerTracking() {
	ClassUtil.inherit(VolunteerTracking, this, Widget);
	this._super("VolunteerTracking");

	// Manipulate HTML located in variable "this.widget" as needed here, before display.
    current = this.widget.find('.titlepart');
    new PageHeaderWidget('Volunteer Tracking');
    new LineBreakWidget();
    
    current = this.widget.find('section.volunteerGroup');
    new ProjectView(); // Volunteer view
    

	// This attaches the HTML to the current insert location
	this.attach();
}

// Write class methods like this
VolunteerTracking.prototype.methodSample = function() {

};
