### JIRA Test Automation
* **Requirements:**
    * Install the required libraries listed in requirements.txt.
    * Create a configuration file named config.ini with the following structure:
[User_details]
username = <your_username>
password = <your_password>
timezone = 5.30  # Optional, timezone offset (default is 0.0)

[JIRA_Project]
project_keys = ["AADT","PID"]  # List of project keys
project_baseurl = https://jira.devops.jlr-apps.com
proxies = {
    "http": "http://10.224.132.196:83",
    "https": "http://10.224.132.196:83",
    "ftp": "http://10.224.132.196:83"  # Optional proxy settings
}

***Note:*** You can alternatively use a personal access token for JIRA authentication by setting username and password to empty strings and providing the token in the script arguments.

### Running the example:
* **Modify example_use_case.py with your data:**
    * tasks: A list of dictionaries containing summary, description, acceptance_crit, i_want, and so_that fields for each test case.
    * assignees: A list of assignee CDSIDs to assign the test cases to.
* **Run the script:** python example_use_case.py
