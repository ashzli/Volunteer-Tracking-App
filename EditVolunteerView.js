function EditVolunteerView(addOrEdit, volunteerData) {
	// Constructor code here
    
    ClassUtil.mixin(EditVolunteerView, this, Refreshable);
    ClassUtil.mixin(EditVolunteerView, this, Dialogable);
    
    
    this.addOrEdit = addOrEdit;
    this.volunteer = volunteerData;

    if(addOrEdit == "add") {
        this.dialog = new Dialog("Add volunteer");
        this.dialog.setOkCancel(this, "clickedSave", "Add");
    } else {
        this.dialog = new Dialog("Edit volunteer");
        this.dialog.setOkCancel(this, "clickedSave", "Update");
    }
//------------------------the content of the dialog------------------------------------------------
    var leftWidth = 120;
    var panel = new QueryPanelWidget(leftWidth);
    this.queryFields = new QueryFields(panel, this.volunteer);

    panel.addLabel('Name');
    this.queryFields.put('name', new InputFieldWidget(null,$T('Your full name')), ['notEmpty']);

    panel.addLabel('Phone Number');
    this.queryFields.put('phone', new InputFieldWidget(null,$T('Your primary phone')), ["numberOnly"]);
    
    panel.addLabel('Address');
    this.queryFields.put('address', new TextAreaWidget(null,$T('Enter your address here'), 3));

    panel.finish();

//--------------this part is DeleteOption------------------------------------------------
    if(typeof this.volunteer != "undifined") {
        new DeleteOption('Delete', 'Click to archive', this, function () {
            this.volunteer.setIsArchived(true);
            Metis.save(this.volunteer, this, function () {
                console.log('Changing archived state...');
                this.closeDialogBox();
                this.refreshAction.call();
            });
            
        });
    }

    this.dialog.reposition();
//--------------------------------------------------------------------------------------------------    
    
}

// Write class methods like this
EditVolunteerView.prototype.methodSample = function() {

};

EditVolunteerView.prototype.clickedSave = function () {
    if(!this.queryFields.verify()) return false;
    if(this.volunteer == null) {
        this.volunteer = new VolunteerModel();
    }

    this.volunteer.setName(this.queryFields.getValue('name'));
    this.volunteer.setPhone(this.queryFields.getValue('phone'));
    this.volunteer.setAddress(this.queryFields.getValue('address'));
    this.volunteer.setIsArchived(false);
    
    
    Metis.save(this.volunteer, this, function () {
        console.log("Saving ...");
        this.closeDialogBox();
        this.refreshAction.call();
    });
    
    return false;
};