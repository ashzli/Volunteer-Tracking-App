function ProjectView() {
	// Constructor code here
    
    new PageHeaderWidget("Projects");
    
    var searchWidget = new SearchWidget();
    new QuickAddButtonWidget("Add New Project", this, "clickedAddProject");
    new LineBreakWidget();
    
    
    var projectTable = new DataTableWidget(this, "projectTable");
    searchWidget.setTable(projectTable);
    
    projectTable.addHeader("Project", "name", true, true, 200);
    projectTable.addColumn(function(projectData) {
        return projectData.getName();
    });
    
    var leaderList = [];
    var volunteerList = [];
    var metisLoader = new MetisLoader("Volunteer");
    Metis.load(metisLoader, this, function() {
        volunteerList = metisLoader.getList();
        //do something
        for(var i in volunteerList){
            leaderList[volunteerList[i].getId()] = volunteerList[i].getName();
        }
        
        projectTable.addHeader("Leader", "leadVolunteerId", 200);
        projectTable.addColumn(function(projectData) {
            return leaderList[projectData.getLeadVolunteerId()];
        });
        
        projectTable.addHeader("Date", "date", true, true, 150);
        projectTable.addColumn(function(projectData) {
            return projectData.getDate().toDateString(); //  +" "+ projectData.getTime();
            
        });
        projectTable.addHeader("Description", "description", 400);
        projectTable.addColumn(function(projectData) {
            return projectData.getDescription();
        });
    
        
        
        
        projectTable.renderMetisData(Metis, "Project");
        //this.projectTable = projectTable;
        
    });
    this.projectTable = projectTable;
    projectTable.setClickHandler(this, function(projectData) {
        var dialog = new EditProjectView("edit", projectData);
        dialog.setRefreshHandler(this, function() {
            this.projectTable.renderMetisData(Metis, "Project");
        });
    });
}

// Write class methods like this
ProjectView.prototype.methodSample = function() {

};

ProjectView.prototype.clickedAddProject = function () {
    console.log('clicked add new volunteer...');
    var dialog = new EditProjectView("add");
    dialog.setRefreshHandler(this, function () {
        this.projectTable.refreshTable();
    });
};

