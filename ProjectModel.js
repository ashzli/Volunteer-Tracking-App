function ProjectModel() {
	// Constructor code here
    this.name;
    this.id
    this.description;
    this.date = new Date();
    this.time = "";
    this.leadVolunteerId;
    
}

// Write class methods like this
ProjectModel.prototype.methodSample = function() {

};

Metis.define(ProjectModel, "Project", "id", "name", "description", "date", "time", "leadVolunteerId");
Metis.defineSortColumn(ProjectModel, "date", "desc");
Metis.createGettersAndSetters(ProjectModel);