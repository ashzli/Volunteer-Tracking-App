Volunteer-Tracking-App
======================

Volunteer Tracking App for QuickSchools

Requirements for the Volunteer Tracking app:
Users who have access to the Volunteer Tracking module can do the following.

Volunteers
- Can define a list of volunteers and some basic information, like phone number, address, etc.
- The list of volunteers should be searchable by name. (Use SearchWidget)
- Can “archive” a volunteer - which shouldn’t mean deleting the record permanently from the database. It just shouldn’t      show up in the main list. (Even though it’s archived in the backend, you can just the word Delete for the user - they      don’t need to know it’s archived). Use DeleteOption for this, which appears in the dialog box when editing the record.     Don’t put the delete link in the main volunteer table. (This is consistent with how most of QS works).

Projects
- Can define new volunteer projects, like “Fundraising Gala” or “Community Service Day”.
- Can add additional information on projects, like description, date, time.
- The list of projects should be searchable by project name. (Use SearchWidget)
- The list should be sorted by project creation date, most recent first.
- The hardest part:
  - Each project should have a single lead volunteer.
  - The lead volunteer’s name should appear in the project listing under it’s own column.
  - If someone changes the name of the volunteer in the Volunteers menu, and goes back to the Projects menu, the name of       the volunteer should reflect the latest changes.
  - Tip: only store the volunteerId under the Project data. Then, during table rendering, render the table first, figure       out which projects were rendered, then load the volunteers, then insert the volunteer names (which appear slightly         delayed). MarkerWidget and DataTableWidget.setPostRender might be useful here.
