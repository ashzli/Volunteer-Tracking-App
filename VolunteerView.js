function VolunteerView() {
    // Constructor code here
    
    new PageHeaderWidget("Volunteers"); 
    
    var searchWidget = new SearchWidget();
    new QuickAddButtonWidget("Add New Volunteer", this, "clickedAddVolunteer");
    new LineBreakWidget();
    
    this.selectedList=[];
    
    var VolunteerTable = new DataTableWidget(this, "VolunteerTable", "name", 1); 
    searchWidget.setTable(VolunteerTable);
    
    VolunteerTable.addSelectorColumn("id", [{title: "Achive", actionMethod: "markAsArchived"}], null);   
   
    VolunteerTable.addHeader('Name', 'name', true, true, 200); // volunteers are searchable by name
    VolunteerTable.addColumn(function(volunteerData){
        return volunteerData.getName();
    });
    
    VolunteerTable.addHeader('Phone Number', 'phone', 150);
    VolunteerTable.addColumn(function(volunteerData){
        return volunteerData.getPhone();
    });
    
    VolunteerTable.addHeader('Address', 'address');
    VolunteerTable.addColumn(function(volunteerData){
        return volunteerData.getAddress();
    });
    
    VolunteerTable.renderMetisData(Metis, 'Volunteer', new EqFilter('isArchived', false)); // Archived voluneers won't be displayed
    
    this.volunteerTable = VolunteerTable;
    
    VolunteerTable.setClickHandler(this, function (volunteerData) {
        console.log("Loading ...");

        var dialog = new EditVolunteerView("edit", volunteerData);
        dialog.setRefreshHandler(this, function () {
            //this.volunteerTable.renderMetisData(Metis, 'Volunteer', new EqFilter('isArchived', false));
            this.volunteerTable.refreshTable();
        });
    });
    
    
}

// Write class methods like this

VolunteerView.prototype.clickedAddVolunteer = function () {
    console.log('clicked add new volunteer...');
    var dialog = new EditVolunteerView("add");
    dialog.setRefreshHandler(this, function () {
        this.volunteerTable.refreshTable();
    });
};


VolunteerView.prototype.markAsArchived = function (selections) {
    //this.selectedList;// = selections;
    debugger;
    for(var id in selections) {
        //console.log("Deleting ID " + id);
        // The selections object contains a lookup of the ID column to the data object used to render the table row.
        this.selectedList.push(selections[id]);
        selections[id].setIsArchived(true);
    }
    Metis.save(this.selectedList, this, function () {
        
        for(var id in this.selectedList) {
            console.log("Deleting ID " + this.selectedList[id]);
            // The selections object contains a lookup of the ID column to the data object used to render the table row.
            
        }
        debugger;
        console.log('changed archived state; refreshing table...');
        this.volunteerTable.clearSelections();
        debugger;
        this.volunteerTable.refreshTable();
  });
     
};
