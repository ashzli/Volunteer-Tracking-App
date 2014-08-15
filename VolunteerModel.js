function VolunteerModel() {
    // Constructor code here
    this.id;
    this.name
    this.phone;
    this.adress;
    this.isArchived = false;
}

// Write class methods like this
VolunteerModel.prototype.methodSample = function() {

};
Metis.define(VolunteerModel, "Volunteer", "id", "name", "phone", "address","isArchived");
Metis.defineSortColumn(VolunteerModel, "name", "asc");
Metis.createGettersAndSetters(VolunteerModel);
