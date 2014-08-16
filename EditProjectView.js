function EditProjectView(addOrEdit, projectData) {
    // Constructor code here
    ClassUtil.mixin(EditProjectView, this, Refreshable);
    ClassUtil.mixin(EditProjectView, this, Dialogable);
    
    this.dialog = new FullPageDialog();
    this.addOrEdit = addOrEdit;
    this.project = projectData;
    this.recordHeader;
//-------------------Header of the Dialog-----------------------------
    if(addOrEdit == "add") {
        recordHeader = new RecordHeaderWidget("Add New Project");
    } else {
        recordHeader = new RecordHeaderWidget("Edit Project");
    }
    recordHeader.activateRightBorderSection();
 //---------------------------------------------------------------------------
    this.addButtonPanel();
    this.dialog.resetInsertPosition();
//------------------------the content of the dialog------------------------------------------------
    var leftWidth = 120;
    var panel = new QueryPanelWidget(leftWidth);
    this.queryFields = new QueryFields(panel, this.project);

    panel.addLabel('Name');
    this.queryFields.put('name', new InputFieldWidget(null,$T('Project name')), ['notEmpty']);
    
    
    var volunteerList = [];
    var metisLoader = new MetisLoader("Volunteer");
    metisLoader.setFilters([new EqFilter("isArchived", false)]);
    Metis.load(metisLoader, this, function() {
        volunteerList = metisLoader.getList();
        
        panel.addLabel("Lead volunteer");
        this.queryFields.put("leadVolunteerId",new DropDownWidget(volunteerList, "id", "name"), ['notEmpty']);
        
        panel.addSecondLabel ('Event Date');
        this.queryFields.put('date', new DateWidget (), ["notEmpty", "validDate"]);
        
/*        
        panel.addLabel ('Event Date');
        this.queryFields.put('date', new DateWidget (), ["notEmpty", "validDate"]);
        
        var time = ( projectData.getTime() || new TimeClass(TimeUtil.getShortFormattedTime(new Date())) );
        panel.addSecondLabel ('Start Time');
        this.queryFields.put('time', new TimeWidget (temp), ["notEmpty"]);
*/        
        panel.addLabel('Description');
        this.queryFields.put('description', new TextAreaWidget().setGrowable(null, 4));
    
        panel.finish();
    });
    
    
    
}

// Write class methods like this
EditProjectView.prototype.addButtonPanel = function(){
    var panel = new HorizontalPanelWidget("right", false);
    
    new EmphasizedButtonWidget("Save", this, "clickedSave");

    if(this.addOrEdit == "edit") {
        new EmphasizedButtonWidget("Delete", this, "clickedDelete");    
    }    
    new DemotedButtonWidget("Close", this.dialog, "close");
    panel.finish();
};

EditProjectView.prototype.clickedSave = function() {
    if(!this.queryFields.verify()) return false;
    
    if(this.project == null) {
        this.project = new ProjectModel();
    }
    
    this.project.setName(this.queryFields.getValue("name"));
    this.project.setLeadVolunteerId(this.queryFields.getValue("leadVolunteerId"));
    debugger;
    this.project.setDate(this.queryFields.getValue("date"));
    //this.project.setTime(this.queryFields.getValue("time").getTimeString ());
    this.project.setDescription(this.queryFields.getValue('description'));
    
    //debugger;
    
    Metis.save(this.project, this, function() {
        this.closeDialogBox();
        this.refreshAction.call();
    });
    
    return false;
};

EditProjectView.prototype.clickedDelete = function() {
    
    Metis.remove(this.project, this, function() {
        this.closeDialogBox();
        this.refreshAction.call();
    });       
    return false;
};